var addExpense = function (name, amount, category) {
    var totalBudget = budgetsStore.getAllBudget().budget;

    expensesStore.addExpense({name: name, category: category, sum: amount});
    totalBudget = parseInt(totalBudget) - amount;
    budgetsStore.updateBudget(totalBudget);
};


