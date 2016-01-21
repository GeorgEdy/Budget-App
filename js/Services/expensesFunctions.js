var addExpense = function (name, amount, category, recurrent) {
    expensesStore.addExpense({name: name, category: category, sum: amount, recurrent: recurrent});
};

var editExpense = function (name, amount, category, recurrent, id) {
    expensesStore.updateExpense(id,{name: name, category: category, sum: amount, recurrent: recurrent});
};

var getExpenseFromStore = function (id) {
    return expensesStore.getExpense(id);
};

var deleteExpense = function (id) {
    expensesStore.deleteExpense(id);
};