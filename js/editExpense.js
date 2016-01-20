var getExpenseFromStore = function (name, amount, category, id) {
    var totalBudget = budgetsStore.getAllBudget().budget;

    expensesStore.updateExpense(id,{name: name, category: category, sum: amount});
    totalBudget = parseInt(totalBudget) - amount;
    budgetsStore.updateBudget(totalBudget);
};
