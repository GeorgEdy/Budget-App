var drawTable = function (type) {
    transactionsStore.getAllTransactions().then(function (data) {
        $('#income-history tbody tr').remove();
        $.each(data, function (index, value) {
            if (value.type == type) {
                var tr = tmpl("item_tmpl", this);
                var tr = tmpl("item_tmpl", this);
                $('#income-history tbody').append(tr);
            }
        });
        $('#expense-history tbody tr').remove();
        $.each(data, function (index, value) {
            if (value.type == type) {
                var tr = tmpl("item_tmpl", this);
                var tr = tmpl("item_tmpl", this);
                $('#expense-history tbody').append(tr);
            }
        });
    })
};

var registerTransaction = function () {
    event.preventDefault();
    var parentNode = event.target.id;
    getTransactionData(parentNode, callbackTransactionData);
};
var callbackTransactionData = function (item, parentNode) {
    if (item) {
        if (parentNode === "income-form") {
            item.type = "income";
            sendTransaction(item, item.recurring);
        } else {
            item.type = "expense";
            sendTransaction(item, item.recurring);
        }
    }
};

var sendTransaction = function (item, recurring) {
    if (recurring == true) {
        recurringStore.addRecurring({
            name: item.name,
            categoryId: item.categoryId,
            sum: item.sum,
            type: item.type,
            date: item.date,
            recurringDate: item.recurringDate
        });
    } else {
        addTransaction(item.name, item.categoryId, item.sum, item.type, item.date);
    }
};

var validateTransactionData = function (idForm, name, sum, cat, recurringDate) {
    if (!checkLength(name)) {
        $('#' + idForm + ' .nameError').html("Introduceti un nume").removeClass("hiddenn");
        return false;
    } else if (!checkLength(sum)) {
        $('#' + idForm + ' .sumError').html("Introduceti o suma").removeClass("hiddenn");
        return false;
    } else if (cat == null) {
        $('#' + idForm + ' .categoryError').html("Selectati o categorie").removeClass("hiddenn");
        return false;
    }
    return true;
};

var getTransactionData = function (idForm, callbackTransactionData) {
    var name = $('#' + idForm + ' [title = nume]').val();
    var sum = $('#' + idForm + ' [type = number]').val();
    var cat = $('#' + idForm + ' [title = category]').val();
    var recurring = $('#' + idForm + ' [type = checkbox]').is(":checked");
    var date = moment().format('DD MM YYYY');
    var recurringDate = $('#'+ idForm +' .parent').val().split('-');
    var recurringDay = recurringDate != '' ? parseInt(recurringDate[2]) : 1;
    resetErrors(idForm);

    if (validateTransactionData(idForm, name, sum, cat, recurringDay)) {
        var categoryId = "";
        categoriesStore.getAllCategories().then(function (data) {
            $.each(data, function (index, value) {
                if (value.name.toLowerCase() == cat) {
                    categoryId = value.id;
                    return;
                }
            });
            callbackTransactionData({
                name: name,
                categoryId: categoryId,
                sum: sum,
                recurring: recurring,
                date: date,
                recurringDate: recurringDate
            }, idForm);
        });
        callbackTransactionData({name: name, categoryId: categoryId, sum: sum, recurring: recurring, date: date, recurringDate: recurringDay }, idForm);
        resetTransactionForms(idForm);
    };
};
var resetErrors = function (idForm) {
    $('#' + idForm + ' .nameError').addClass("hiddenn");
    $('#' + idForm + ' .sumError').addClass("hiddenn");
    $('#' + idForm + ' .categoryError').addClass("hiddenn");
};


var resetTransactionForms = function (idForm) {
    $('#' + idForm + ' [title = nume]').val("");
    $('#' + idForm + ' [type = number]').val("");
    $('#' + idForm + ' [title = category] option[selected]').prop('selected', true);
    $('#' + idForm + ' [type = checkbox]').attr('checked', false);
    $('#'+ idForm +' .datepicker').val("");
};

var checkLength = function (name) {
    return name.length ? true : false;
};
/*===================================================================
 * =====================================================================
 * ==================================================================*/



var editRow = null;

var getCategoryForm = function () {
    return {
        name: $('#categories-form input[type="text"]').val(),
        type: $('#categories-form option:selected').val()
    };
};

var categoryOnSubmit = function () {
    if (editRow) {
        categoriesStore.updateCategory(editRow.id, getCategoryForm()).then(
            function () {
                $('#categories-form').removeClass("editing");

                drawTable(categoriesStore);
                categoryFormReset();
            }
        );
    } else {
        categoriesStore.addCategory(getCategoryForm()).then(function () {
            drawCategoriesTable(categoriesStore);
        });
    }

    return false;
};

var drawCategoriesTable = function (categoriesStore) {
    categoriesStore.getAllCategories().then(function (data) {
        $('.expense-categories tbody').empty();
        $('.income-categories tbody').empty();
        $.each(data, function () {
            if (this.type === 'income') {
                var tr = tmpl("item_tmpl_category", this);
                $('.income-categories tbody').append(tr);
            } else {
                var tr = tmpl("item_tmpl_category", this);
                $('.expense-categories tbody').append(tr);
            }
        });
    })
};

var categoryFormReset = function () {
    $('#categories-form input[type="text"]').val("");
    $('#categories-form option:selected').val();
    editRow = null;
};

var categoryCancelOnClick = function () {
    categoryFormReset();

    return false;
};

var deleteCategoryOnClick = function () {
    var id = $(this).closest('tr').data('id');

    categoriesStore.deleteCategory(id).then(
        function () {
            drawTable(categoriesStore);
        }
    );

    return false;
};

var editCategoryOnClick = function () {
    $('#categories-form').addClass("editing");
    var id = $(this).closest('tr').data('id');
    categoriesStore.getCategoryById(id).then(
        function (data) {
            editRow = data;
            $('#categories-form input[type="text"]').val(data.name);
            if ($('#categories-form option:selected').val(data.type)==="expense") {
                $('#categories-form option:selected').val("expense");
            }else{
                $('#categories-form option:selected').val("income");
            };
        }
    )
};

var attachCategoryEvents = function () {
    $('.expense-categories').on('click', '.btn-delete-category', deleteCategoryOnClick);
    $('.income-categories').on('click', '.btn-delete-category', deleteCategoryOnClick);
    $('.expense-categories').on('click', '.btn-edit-category', editCategoryOnClick);
    $('.income-categories').on('click', '.btn-edit-category', editCategoryOnClick);
    $('.expense-categories').on('click', '.btn-cancel-category', categoryCancelOnClick());
    $('.income-categories').on('click', '.btn-cancel-category', categoryCancelOnClick());

};

$(function () {
    $('#categories').click(function () {
        $('.show-categories').attr('id', 'active');
        $('.transactions').removeClass('index');
    });
    $('#home').click(function () {
        $('.show-categories').attr('id', '');
        $('.transactions').removeClass('index');
    });
    $('#add-income').click(function () {
        $('#income-form').addClass('active');
        $('#expense-form').removeClass('active');
    });
    $('#add-expense').click(function () {
        $('#income-form').removeClass('active');
        $('#expense-form').addClass('active');
    });
    $('.total-income').click(function () {
        $('.income').addClass('active');
        $('.expenses').removeClass('active');
    });
    $('.total-expense').click(function () {
        $('.expenses').addClass('active');
        $('.income').removeClass('active');
    });
    $('#transactions').click(function () {
        $('.transactions').addClass('index');
    });

    $('#categories-form').submit(categoryOnSubmit);

    //add income/expense

    $('#income-form').submit(registerTransaction);
    $('#expense-form').submit(registerTransaction);
    $('#categories-form').submit(categoryOnSubmit);

    drawCategoriesTable(categoriesStore);
    $('#income-history-panel').click(function () {
        drawTable("income");
    });
    $('#expense-history-panel').click(function () {
        drawTable("expense");
    });
    attachCategoryEvents();
});