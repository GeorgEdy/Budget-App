var addExpense = function (name, amount, category, recurrent) {
    var totalBudget = budgetsStore.getAllBudgets().budget;

    expensesStore.addExpense({name: name, category: category, sum: amount, recurrent: recurrent});
    totalBudget = parseInt(totalBudget) - amount;
    budgetsStore.updateBudget(totalBudget);
};

var editExpense = function (name, amount, category, recurrent, id) {
    var totalBudget = budgetsStore.getAllBudgets().budget;

    expensesStore.updateExpense(id,{name: name, category: category, sum: amount, recurrent:recurrent});
    totalBudget = parseInt(totalBudget) - amount;
    budgetsStore.updateBudget(totalBudget);
};

var getExpenseFromStore = function (id) {
    var expenseSum = expensesStore.getExpense(id).sum;
    var budget = budgetsStore.getAllBudgets().budget;
    budget = parseInt(budget) + parseInt(expenseSum.sum);
    budgetsStore.updateBudget(budget);
};

var deleteExpense = function (id) {
    var totalBudget = budgetsStore.getAllBudgets().budget;
    var expenseSum = expensesStore.getExpense(id).sum;

    expensesStore.deleteExpense(id);
    totalBudget = parseInt(totalBudget) + parseInt(expenseSum);
    budgetsStore.updateBudget(totalBudget);
};