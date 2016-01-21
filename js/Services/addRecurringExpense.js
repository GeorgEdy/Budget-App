var addRecurringExpense = function (name, amount, category) {
    var totalBudget = budgetsStore.getAllBudget().budget;

    expensesStore.addRecurringExpense({name: name, category: category, sum: amount});
    totalBudget = parseInt(totalBudget) - amount;
    budgetsStore.updateBudget(totalBudget);
};


