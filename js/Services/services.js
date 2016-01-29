var getBalance = function () {
    return new Promise(function (resolve, reject) {
        budgetsAjaxStore.getTotalBudget().then(function (data) {
            resolve(data);
        });
    });
};
var getAllTransactions = function () {
    return new Promise(function (resolve, reject) {
        transactionsAjaxStore.getAllTransactions().then(function (data) {
            resolve(data);
        });
    });
};
var addTransaction = function (name, category, amount, type, date) {
    transactionsAjaxStore.addTransaction(name, category, amount, type, date);
    repo.setBudget(type, amount);
};

var editTransaction = function (id, name, category, amount, type, date) {
    transactionsAjaxStore.getTransaction(id).then(function(data){
        var newSum = parseInt(amount) - parseInt(data.sum);
        transactionsAjaxStore.updateTransaction(id, name, category, amount, type, date);
        repo.setBudget(type, newSum);
    });
};

var deleteRecurring = function (id) {
    return recurringAjaxStore.deleteExpense(id);
};

var getAllRecurrings = function () {
    return recurringAjaxStore.getAllRecurrings();
};

var addRecurring = function (item) {
    recurringAjaxStore.addRecurring(item);
};

var updateRecurring = function (id, item) {
    recurringAjaxStore.updateRecurring(id, item);
};

var getAllCategories = function () {
    return categoryAjaxStore.getAllCategories();
};

var getCategoryById = function (id) {
    return categoryAjaxStore.getCategoryById(id);
};

var addCategory = function (item) {
    return categoryAjaxStore.addCategory(item);
};

var updateCategory = function (id, item) {
    return categoryAjaxStore.updateCategory(id, item);
};

var deleteCategory = function (id) {
    return categoryAjaxStore.deleteCategory(id);
};