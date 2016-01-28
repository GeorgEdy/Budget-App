var drawTable = function (type) {
    var $income_history = $('#income-history');
    var $expense_history = $('#expense-history');

    transactionsMemStore.getAllTransactions().then(function (data) {
        $income_history.find('tbody').html('');
        $.each(data, function (index, value) {
            if (value.type == type) {
                var tr = tmpl("item_tmpl", this);
                $income_history.find('tbody').append(tr);
            }
        });
        $expense_history.find('tbody').html('');
        $.each(data, function (index, value) {
            if (value.type == type) {
                var tr = tmpl("item_tmpl", this);
                $expense_history.find('tbody').append(tr);
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
    var $idForm = $('#' + idForm);
    var name = $idForm.find(' [title = nume]').val();
    var sum = $idForm.find(' [type = number]').val();
    var cat = $idForm.find(' [title = category]').val();
    var recurring = $idForm.find(' [type = checkbox]').is(":checked");
    var date = moment().format('DD MM YYYY');
    var recurringDate = $idForm.find(' .parent').val().split('-');
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
    var $idForm = $('#' + idForm);

    $idForm.find(' .nameError').addClass("hiddenn");
    $idForm.find(' .sumError').addClass("hiddenn");
    $idForm.find(' .categoryError').addClass("hiddenn");
};


var resetTransactionForms = function (idForm) {
    var $idForm = $('#' + idForm);

    $idForm.find(' [title = nume]').val("");
    $idForm.find(' [type = number]').val("");
    $idForm.find(' [title = category] option[selected]').prop('selected', true);
    $idForm.find(' [type = checkbox]').attr('checked', false);
    $idForm.find(' .parent').val("");
    $idForm.find(' .parent').closest('form').find(".recurring-date").addClass("hiddenn");
    $idForm.find(' .btn-cancel-transaction').addClass("hiddenn");
    editTransactionId = null;
};

var resetTransactionFormsOnCancel = function (event) {
    var idForm = event.target.closest('form').id;
    var $idForm = $('#' + idForm);

    $idForm.find(' [title = nume]').val("");
    $idForm.find(' [type = number]').val("");
    $idForm.find(' [title = category] option[selected]').prop('selected', true);
    $idForm.find(' [type = checkbox]').attr('checked', false);
    $idForm.find(' .parent').val("");
    $idForm.find(' .parent').closest('form').find(".recurring-date").addClass("hiddenn");
    $idForm.find(' [type = checkbox]').prop('disabled',false);
    $idForm.find(' .btn-cancel-transaction').addClass("hiddenn");
    editTransactionId = null;
};

var editRow = null;
var editTransactionId = null;

var getCategoryForm = function () {
    var $categories_form = $('#categories-form');

    return {
        name: $categories_form.find('input[type="text"]').val(),
        type: $categories_form.find('option:selected').val()
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
    var $expense_categories = $('.expense-categories');
    var $income_categories = $('.income-categories');

    categoriesStore.getAllCategories().then(function (data) {
        $expense_categories.find('tbody').empty();
        $income_categories.find('tbody').empty();
        $.each(data, function () {
            var tr = '';

            if (this.type === 'income') {
                tr = tmpl("item_tmpl_category", this);
                $income_categories.find('tbody').append(tr);
            } else {
                tr = tmpl("item_tmpl_category", this);
                $expense_categories.find('tbody').append(tr);
            }
        });
    })
};

var drawTransactionsTable = function (buttonType) {
    var $recurrent_table = $(".recurrent-table ");
    var $history_table = $(".history-table ");

    categoriesStore.getAllCategories().then(function (data) {
        var categories = data;

        $recurrent_table.find("tbody").html("");
        $history_table.find("tbody").html("");
        $recurrent_table.find("thead").html("");
        $history_table.find("thead").html("");
        $history_table.off('click', '.btn-edit-history', editHistoryOnClick);
        $recurrent_table.off('click', '.btn-edit-recurrent', editRecurrentOnClick);
        $recurrent_table.off('click', '.btn-delete-recurrent', deleteRecurrentOnClick);
        $recurrent_table.find("thead").append("<tr data-type='"+buttonType+"-form"+"'><td>Recurrent "+buttonType+"s</td></tr><tr><td>Name</td><td>Category</td><td>Sum</td><td>Recurrency Day</td></tr>");
        $history_table.find("thead").append("<tr data-type='"+buttonType+"-form"+"'><td>History of "+buttonType+"s</td></tr><tr><td>Name</td><td>Category</td><td>Sum</td></tr>");
        transactionsMemStore.getAllTransactions().then(function (data) {
            var catHistory = "";

            $.each(data, function (index, value) {
                if (value.type == buttonType) {
                    $.each(categories, function (index, value2) {
                        if (value.categoryId == value2.id) {
                            catHistory = value2.name;
                        }
                    });
                    var tr = tmpl("item_tmpl_history", {id: value.id, name: value.name, category: catHistory, sum: value.sum});
                    $history_table.find("tbody").append(tr);
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
                        }
                    });
                    var tr = tmpl("item_tmpl_recurrent", {id: value.id, name: value.name, category: catRecurrent, sum: value.sum, recurrentDay: value.day});
                    $recurrent_table.find("tbody").append(tr);
                }
            });
            attachTransactionsEvents();
            populateBalance();
            populateTotalsIncomeExpense();
        });
    });
};

var categoryFormReset = function () {
    var $categories_form = $('#categories-form');

    $categories_form.find('input[type="text"]').val("");
    $categories_form.find('option:selected').val();
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
    var $categories_form = $('#categories-form');

    $categories_form.addClass("editing");
    var id = $(this).closest('tr').data('id');
    categoriesStore.getCategoryById(id).then(
        function (data) {
            editRow = data;
            $categories_form.find('input[type="text"]').val(data.name);
            $categories_form.find('.block').val(data.type);
        }
    );
    return false;
};

var attachCategoryEvents = function () {
    var $expense_cat = $('.expense-categories');
    var $income_cat = $('.income-categories');

    $expense_cat.on('click', '.btn-delete-category', deleteCategoryOnClick);
    $income_cat.on('click', '.btn-delete-category', deleteCategoryOnClick);
    $expense_cat.on('click', '.btn-edit-category', editCategoryOnClick);
    $income_cat.on('click', '.btn-edit-category', editCategoryOnClick);
    $('.btn-cancel-category').on('click', cancelCategoryOnClick);
};

var attachTransactionsEvents = function () {
    var $recurrent_table = $(".recurrent-table ");
    var btn_cancel = ".btn-cancel-transaction";

    $('.history-table').on('click', '.btn-edit-history', editHistoryOnClick);
    $recurrent_table.on('click', '.btn-edit-recurrent', editRecurrentOnClick);
    $recurrent_table.on('click', '.btn-delete-recurrent', deleteRecurrentOnClick);
    $('#expense-form').find(btn_cancel).click(resetTransactionFormsOnCancel);
    $('#income-form').find(btn_cancel).click(resetTransactionFormsOnCancel);
};

var editHistoryOnClick = function (event) {
    event.preventDefault();
    var form = $(event.target).closest('table').find('tr').data("type");
    var $form = $("#" + form);
    var $closest_tr = $(this).closest("tr");
    var name = $closest_tr.data("name");
    var sum = $closest_tr.data("sum");
    var category = $closest_tr.data("category");

    editTransactionId = $closest_tr.data("id");
    $form.find(".btn-cancel-transaction").removeClass("hiddenn");
    $form.find('[title = nume]').val(name);
    $form.find('[type = number]').val(sum);
    $form.find('[title = category]').val(category);
    $form.find('[type = checkbox]').prop('checked', false);
    $form.find('[type = checkbox]').prop('disabled',true);
    $form.find('.recurring-date').addClass("hiddenn");
};

var editRecurrentOnClick = function (event) {
    event.preventDefault();
    var form = $(event.target).closest('table').find('tr').data("type");
    var $form = $("#" + form);
    var $closest_tr = $(this).closest("tr");
    var name = $closest_tr.data("name");
    var sum = $closest_tr.data("sum");
    var category = $closest_tr.data("category");

    editTransactionId = $closest_tr.data("id");
    $form.find(".btn-cancel-transaction").removeClass("hiddenn");
    $form.find('[title = nume]').val(name);
    $form.find('[type = number]').val(sum);
    $form.find('[title = category]').val(category);
    $form.find('[type = checkbox]').prop('checked', true);
    $form.find('[type = checkbox]').prop('disabled',true);
    $form.find('.recurring-date').removeClass("hiddenn");
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
        var $income_form = $('#income-form');
        var $expense_form = $('#expense-form');

        $.each(data, function (index, value) {
            if (value.type == "income") {
                incomes.push(value);
            } else {
                expenses.push(value);
            }
        });
        $income_form.find("select").html("<option disabled='' selected='selected'>Select Category</option>");
        $.each(incomes, function (index, value) {
            $income_form.find("select").append("<option value = '"+value.name+"' >" + value.name + "</option>");
        });
        $expense_form.find("select").html("<option disabled='' selected='selected'>Select Category</option>");
        $.each(expenses, function (index, value) {
            $income_form.find("select").append("<option value = '"+value.name+"' >" + value.name + "</option>");
        });
    });
};

var populateBalance = function () {
    budgetsAjaxStore.getTotalBudget().then(function (data) {
        var balance = data.total;

        $(".balance").find('span').html("$" + balance);
    });
};

var populateTotalsIncomeExpense = function () {
    transactionsMemStore.getAllTransactions().then(function (data) {
        var totalIncome = 0;
        var totalExpense = 0;
        var $history_btn = $('.history-buttons');

        $.each(data, function (index, value) {
            if (value.type == "income") {
                totalIncome += parseInt(value.sum);
            } else {
                totalExpense += parseInt(value.sum);
            }
        });
        $history_btn.find('#income-history-panel').html(totalIncome);
        $history_btn.find('#expense-history-panel').html(totalExpense);
    });
};

$(function () {
    var $categories = $('#categories');
    var $home = $('#home');
    var $show_categories = $('.show-categories');
    var $transactions = $('.transactions');
    var $add_income = $('#add-income');
    var $add_expense = $('#add-expense');
    var $income_form = $('#income-form');
    var $expense_form = $('#expense-form');
    var $total_income = $('.total-income');
    var $total_expense = $('.total-expense');
    var $income = $('.income');
    var $expenses = $('.expenses');

    $categories.click(function () {
        $show_categories.attr('id', 'active');
        $transactions.removeClass('index');
    });
    $home.click(function () {
        $show_categories.attr('id', '');
        $transactions.removeClass('index');
    });
    $add_income.click(function () {
        $income_form.addClass('active');
        $expense_form.removeClass('active');
    });
    $add_expense.click(function () {
        $income_form.removeClass('active');
        $expense_form.addClass('active');
    });
    $total_income.click(function () {
        $income.addClass('active');
        $expenses.removeClass('active');
    });
    $total_expense.click(function () {
        $expenses.addClass('active');
        $income.removeClass('active');
    });
    $transactions.click(function () {
        $transactions.addClass('index');
    });
    $income_form.find('[type = checkbox]').click(function () {
        if ($(this).is(':checked')) {
            $(this).parent().parent().find(".recurring-date").removeClass("hiddenn");
        } else {
            $(this).parent().parent().find(".recurring-date").addClass("hiddenn");
        }
    });
    $expense_form.find('[type = checkbox]').click(function () {
        if ($(this).is(':checked')) {
            $(this).parent().parent().find(".recurring-date").removeClass("hiddenn");
        } else {
            $(this).parent().parent().find(".recurring-date").addClass("hiddenn");
        }
    });
    $add_income.click(function () {
        drawTransactionsTable("income");
    });
    $add_expense.click(function () {
        drawTransactionsTable("expense");
    });
    $income_form.submit(registerTransaction);
    $expense_form.submit(registerTransaction);
    $('#categories-form').submit(categoryOnSubmit);
    $total_income.click(function () {
        drawTable("income");
    });
    $total_expense.click(function () {
        drawTable("expense");
    });
    attachCategoryEvents();
    populateCategories();
    drawCategoriesTable(categoriesStore);
    populateBalance();
    populateTotalsIncomeExpense();
});
