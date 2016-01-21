var addExpense = function (name, amount, category, recurrent) {
    var totalBudget = budgetsStore.getTotalBudget();

    totalBudget = parseInt(totalBudget - amount);
    budgetsStore.setTotalBudget(totalBudget);
    expensesStore.addExpense({name: name, category: category, sum: amount, recurrent: recurrent});
};

var editExpense = function (name, amount, category, recurrent, id) {
    var totalBudget = budgetsStore.getTotalBudget();
    var expenseSum = expensesStore.getExpense(id).sum;

    totalBudget = parseInt(totalBudget - expenseSum + amount);
    budgetsStore.setTotalBudget(totalBudget);
    expensesStore.updateExpense(id,{name: name, category: category, sum: amount, recurrent: recurrent});
};

var deleteExpense = function (id) {
    var totalBudget = budgetsStore.getTotalBudget();
    var expenseSum = expensesStore.getExpense(id).sum;

    totalBudget = parseInt(totalBudget + expenseSum);
    budgetsStore.setTotalBudget(totalBudget);
    expensesStore.deleteExpense(id);
};