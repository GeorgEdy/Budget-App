var getFormData = function () {
    return {
        name: $('#income-form option:selected').text(),
        sum: $('#income-form input[type="number"]').val()
    };
};
var onSubmit = function () {
    transactionsStore.addTransaction(getFormData()).then(function () {
        drawTable(transactionsStore);
    });
};

var drawTable = function (transactionsStore) {
    transactionsStore.getAllTransactions().then(function (data) {
        $('#income-history tbody tr').remove();
        $.each(data.transactions, function () {
            var tr = tmpl("item_tmpl", this);
            $('#income-history tbody').append(tr);
        });
    })
};

var registerTransaction = function () {
    event.preventDefault();
    var parentNode = $(this).parent().attr("id");
    var transactionFormData = getTransactionData(parentNode);

    if (transactionFormData) {
        if (parentNode === "income-form") {
            sendTransaction({
                name: transactionFormData.name,
                categoryId: transactionFormData.categoryId,
                sum: transactionFormData.sum,
                type: "income",
                date: transactionFormData.date
            }, transactionFormData.recurring);
        } else {
            sendTransaction({
                name: transactionFormData.name,
                categoryId: transactionFormData.categoryId,
                sum: transactionFormData.sum,
                type: "expense",
                date: transactionFormData.date
            }, transactionFormData.recurring);
        }
    }
};

var sendTransaction = function (item, recurring) {
    if (recurring == true) {
        recurringStore.addRecurring(item);
    } else {
        addTransaction(item.name, item.categoryId, item.sum, item.type, item.date);
    }
};

var getTransactionData = function (idForm) {
    var name = $('#' + idForm + ' [title = nume]').val();
    var sum = $('#' + idForm + ' [type = number]').val();
    var cat = $('#' + idForm + ' [title = category]').val();
    var recurring = $('#' + idForm + ' [type = checkbox]').is(":checked");
    var date = moment().format('DD MM YYYY');

    resetErrors(idForm);

    if (validateTransactionData(idForm, name, sum, cat)) {
        var categoryId = "";

        categoriesStore.getAllCategories().then(function (data) {
            $.each(data, function (index, value) {
                if (value.name.toLowerCase() == cat) {
                    categoryId = value.id;
                }
            });
        });
        return {name: name, categoryId: categoryId, sum: sum, recurring: recurring, date: date};
    } else {
        return false;
    }
};

var resetErrors = function (idForm) {
    $('#' + idForm + ' .nameError').addClass("hiddenn");
    $('#' + idForm + ' .sumError').addClass("hiddenn");
    $('#' + idForm + ' .categoryError').addClass("hiddenn");
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

var checkLength = function (name) {
    return name.length ? true : false;
};

$(function () {
    $('#categories').click(function () {
        $('.show-categories').attr('id', 'active');
    });
    $('#transactions').click(function () {
        $('.show-categories').attr('id', '');
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

    $('#income-form').submit(onSubmit);
    $('#categories-form').submit(onSubmit);
    $(".datepicker").datepicker();

    //add income/expense

    $('#income-form [type = submit]').click(registerTransaction);
    $('#expense-form [type = submit]').click(registerTransaction);

});

var getCategoryForm = function () {
    return {
        name: $('#categories-form input[type="text"]').val(),
        type: $('#categories-form option:selected').val()
    };
};

var onSubmit = function () {
    if(checkCategoryNameLength){
        categoriesStore.addCategory(getCategoryForm()).then(function () {
            drawCategoriesTable(categoriesStore);
        })
    };

    return false;
};

var checkCategoryNameLength = function (name) {
    return name.length ? true : false;
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
            ;
        });
    })
};