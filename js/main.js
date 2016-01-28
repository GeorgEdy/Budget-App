var drawTable = function (type) {
    transactionsStore.getAllTransactions().then(function (data) {
        $('#income-history tbody tr').remove();
        $.each(data, function (index, value) {
            if (value.type == type) {
                var tr = tmpl("item_tmpl", this);
                $('#income-history tbody').append(tr);
            }
        });
        $('#expense-history tbody tr').remove();
        $.each(data, function (index, value) {
            if (value.type == type) {
                var tr = tmpl("item_tmpl", this);
                $('#expense-history tbody').append(tr);
            }
        });
    });
};

var registerTransaction = function () {
    event.preventDefault();
    var parentNode = event.target.id;
    getTransactionData(parentNode, callbackTransactionData);
};

var sendTransaction = function (item, recurring) {
    if ((recurring == true) && (editTransactionId == null)) {
        recurringStore.addRecurring({
            name: item.name,
            categoryId: item.categoryId,
            sum: item.sum,
            type: item.type,
            date: item.date,
            day: item.recurringDate
        });
    } else if ((recurring == true) && (editTransactionId !== null)) {
        recurringStore.updateRecurring(editTransactionId,{
            name: item.name,
            categoryId: item.categoryId,
            sum: item.sum,
            type: item.type,
            date: item.date,
            day: item.recurringDate
        });
    } else if (editTransactionId !== null) {
        editTransaction(editTransactionId, item.name, item.categoryId, item.sum, item.type, item.date);
    } else {
        addTransaction(item.name, item.categoryId, item.sum, item.type, item.date);
    }
    drawTransactionsTable(item.type);
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

var checkLength = function (name) {
    return name.length ? true : false;
};

var validateTransactionData = function (idForm, name, sum, cat) {
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
    var recurringDate = $('#' + idForm + ' .parent').val().split('-');
    var recurringDay = recurringDate != '' ? parseInt(recurringDate[2]) : 1;
    resetErrors(idForm);

    if (validateTransactionData(idForm, name, sum, cat, recurringDay)) {
        var categoryId = "";
        categoriesStore.getAllCategories().then(function (data) {
            $.each(data, function (index, value) {
                if (value.name.toLowerCase() == cat.toLowerCase()) {
                    categoryId = value.id;
                }
            });
            callbackTransactionData({name: name, categoryId: categoryId, sum: sum, recurring: recurring, date: date, recurringDate: recurringDay }, idForm);
            resetTransactionForms(idForm);
        });
    }
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
    $('#' + idForm + ' .parent').val("");
    $('#' + idForm + ' .parent').closest('form').find(".recurring-date").addClass("hiddenn");
    $('#' + idForm + ' .btn-cancel-transaction').addClass("hiddenn");
    editTransactionId = null;
};

var resetTransactionFormsOnCancel = function (event) {
    var idForm = event.target.closest('form').id;
    $('#' + idForm + ' [title = nume]').val("");
    $('#' + idForm + ' [type = number]').val("");
    $('#' + idForm + ' [title = category] option[selected]').prop('selected', true);
    $('#' + idForm + ' [type = checkbox]').attr('checked', false);
    $('#' + idForm + ' .parent').val("");
    $('#' + idForm + ' .parent').closest('form').find(".recurring-date").addClass("hiddenn");
    $('#' + idForm + ' [type = checkbox]').prop('disabled',false);
    $('#' + idForm + ' .btn-cancel-transaction').addClass("hiddenn");
    editTransactionId = null;
};

var editRow = null;
var editTransactionId = null;

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

                drawCategoriesTable(categoriesStore);
                categoryFormReset();
            }
        );
    } else {
        categoriesStore.addCategory(getCategoryForm()).then(function () {
            drawCategoriesTable(categoriesStore);
        });
    }
    populateCategories();
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

var drawTransactionsTable = function (buttonType) {
    categoriesStore.getAllCategories().then(function (data) {
        $(".recurrent-table tbody").html("");
        $(".history-table tbody").html("");
        $(".recurrent-table thead").html("");
        $(".history-table thead").html("");
        $('.history-table').off('click', '.btn-edit-history', editHistoryOnClick);
        $('.recurrent-table').off('click', '.btn-edit-recurrent', editRecurrentOnClick);
        $('.recurrent-table').off('click', '.btn-delete-recurrent', deleteRecurrentOnClick);
        $(".recurrent-table thead").append("<tr data-type='"+buttonType+"-form"+"'><td>Recurrent "+buttonType+"s</td></tr><tr><td>Name</td><td>Category</td><td>Sum</td><td>Recurrency Day</td></tr>");
        $(".history-table thead").append("<tr data-type='"+buttonType+"-form"+"'><td>History of "+buttonType+"s</td></tr><tr><td>Name</td><td>Category</td><td>Sum</td></tr>");
        var categories = data;
        transactionsStore.getAllTransactions().then(function (data) {
            var catHistory = "";
            $.each(data, function (index, value) {
                if (value.type == buttonType) {
                    $.each(categories, function (index, value2) {
                        if (value.categoryId == value2.id) {
                            catHistory = value2.name;
                            return;
                        }
                    });
                    var tr = tmpl("item_tmpl_history", {id: value.id, name: value.name, category: catHistory, sum: value.sum});
                    $(".history-table tbody").append(tr);
                }
            });
        });
        recurringStore.getAllRecurrings().then(function (data) {
            var catRecurrent = "";
            $.each(data, function (index, value) {
                if (value.type == buttonType) {
                    $.each(categories, function (index, value2) {
                        if (value.categoryId == value2.id) {
                            catRecurrent = value2.name;
                            return;
                        }
                    });
                    var tr = tmpl("item_tmpl_recurrent", {id: value.id, name: value.name, category: catRecurrent, sum: value.sum, recurrentDay: value.day});
                    $(".recurrent-table tbody").append(tr);
                }
            })
            attachTransactionsEvents();
        });
    });
};

var categoryFormReset = function () {
    $('#categories-form input[type="text"]').val("");
    $('#categories-form option:selected').val();
    editRow = null;
};

var cancelCategoryOnClick = function () {
    categoryFormReset();

    return false;
};

var deleteCategoryOnClick = function () {
    var id = $(this).closest('tr').data('id');
    categoriesStore.deleteCategory(id).then(
        function () {
            drawCategoriesTable(categoriesStore);
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
            $('#categories-form .block').val(data.type);
        }
    );

    return false;
};

var attachCategoryEvents = function () {
    $('.expense-categories').on('click', '.btn-delete-category', deleteCategoryOnClick);
    $('.income-categories').on('click', '.btn-delete-category', deleteCategoryOnClick);
    $('.expense-categories').on('click', '.btn-edit-category', editCategoryOnClick);
    $('.income-categories').on('click', '.btn-edit-category', editCategoryOnClick);
    $('.btn-cancel-category').on('click', cancelCategoryOnClick);
};

var attachTransactionsEvents = function () {
    $('.history-table').on('click', '.btn-edit-history', editHistoryOnClick);
    $('.recurrent-table').on('click', '.btn-edit-recurrent', editRecurrentOnClick);
    $('.recurrent-table').on('click', '.btn-delete-recurrent', deleteRecurrentOnClick);
    $('#expense-form .btn-cancel-transaction').click(resetTransactionFormsOnCancel);
    $('#income-form .btn-cancel-transaction').click(resetTransactionFormsOnCancel);
};

var editHistoryOnClick = function (event) {
    event.preventDefault();
    var form = $(event.target).closest('table').find('tr').data("type");
    var name = $(this).closest("tr").data("name");
    var sum = $(this).closest("tr").data("sum");
    var category = $(this).closest("tr").data("category");
    editTransactionId = $(this).closest("tr").data("id");

    $("#"+form+" .btn-cancel-transaction").removeClass("hiddenn");
    $('#' + form + ' [title = nume]').val(name);
    $('#' + form + ' [type = number]').val(sum);
    $('#' + form + ' [title = category]').val(category);
    $('#' + form + ' [type = checkbox]').prop('checked', false);
    $('#' + form + ' [type = checkbox]').prop('disabled',true);
    $('#' + form + ' .recurring-date').addClass("hiddenn");
};

var editRecurrentOnClick = function (event) {
    event.preventDefault();
    var form = $(event.target).closest('table').find('tr').data("type");
    var name = $(this).closest("tr").data("name");
    var sum = $(this).closest("tr").data("sum");
    var category = $(this).closest("tr").data("category");
    editTransactionId = $(this).closest("tr").data("id");

    $("#"+form+" .btn-cancel-transaction").removeClass("hiddenn");
    $('#' + form + ' [title = nume]').val(name);
    $('#' + form + ' [type = number]').val(sum);
    $('#' + form + ' [title = category]').val(category);
    $('#' + form + ' [type = checkbox]').prop('checked', true);
    $('#' + form + ' [type = checkbox]').prop('disabled',true);
    $('#' + form + ' .recurring-date').removeClass("hiddenn");
};

var deleteRecurrentOnClick = function (event) {
    event.preventDefault();
    var form = $(event.target).closest('table').find('tr').data("type").split("-");
    var id = $(this).closest("tr").data("id");
    recurringStore.deleteExpense(id).then(function () {
        drawTransactionsTable(form[0]);
    });
};

var populateCategories = function () {
    categoriesStore.getAllCategories().then(function (data) {
        var incomes = [];
        var expenses = [];
        $.each(data, function (index, value) {
            if (value.type == "income") {
                incomes.push(value);
            } else {
                expenses.push(value);
            }
        });
        $("#income-form select").html("<option disabled='' selected='selected'>Select Category</option>");
        $.each(incomes, function (index, value) {
            $("#income-form select").append("<option value = '"+value.name+"' >" + value.name + "</option>");
        });
        $("#expense-form select").html("<option disabled='' selected='selected'>Select Category</option>");
        $.each(expenses, function (index, value) {
            $("#expense-form select").append("<option value = '"+value.name+"' >" + value.name + "</option>");
        });
    });
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
    $('#income-form [type = checkbox]').click(function () {
        if ($(this).is(':checked')) {
            $(this).parent().parent().find(".recurring-date").removeClass("hiddenn");
        } else {
            $(this).parent().parent().find(".recurring-date").addClass("hiddenn");
        }
    });
    $('#expense-form [type = checkbox]').click(function () {
        if ($(this).is(':checked')) {
            $(this).parent().parent().find(".recurring-date").removeClass("hiddenn");
        } else {
            $(this).parent().parent().find(".recurring-date").addClass("hiddenn");
        }
    });
    $('#add-income').click(function () {
        drawTransactionsTable("income");
    });
    $('#add-expense').click(function () {
        drawTransactionsTable("expense");
    });
    $('#income-form').submit(registerTransaction);
    $('#expense-form').submit(registerTransaction);
    $('#categories-form').submit(categoryOnSubmit);
    $('#income-history-panel').click(function () {
        drawTable("income");
    });
    $('#expense-history-panel').click(function () {
        drawTable("expense");
    });
    attachCategoryEvents();
    populateCategories();
    drawCategoriesTable(categoriesStore);
});
