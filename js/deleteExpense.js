var deleteExpense = function (id) {
    var totalBudget = budgetsStore.getAllBudget().budget;
    var expenseSum = expensesStore.getExpense(id).sum;

    expensesStore.deleteExpense(id);
    totalBudget = parseInt(totalBudget) + parseInt(expenseSum);
    budgetsStore.updateBudget(totalBudget);
};


