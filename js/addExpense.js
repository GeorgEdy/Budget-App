var addExpense = function (name, amount, category, e) {
    e.preventDefault();

    var totalBudget = budgetStore.getAllBudget().budget;

    spendingStore.addExpense({name: name, category: category, sum: amount});
    totalBudget = parseInt(totalBudget) - amount;
    budgetStore.updateBudget(totalBudget);
};


