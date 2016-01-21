var getExpenseFromStore = function (id) {
    var expenseSum = expensesStore.getExpense(id).sum;
    var budget = budgetsStore.getAllBudget().budget;
    budget = parseInt(budget) + parseInt(expenseSum.sum);
    budgetsStore.updateBudget(budget);
};
