var addBudget = function(amount) {
    var totalBudgetAmount = budgetsStore.getAllBudgets().budget;
    totalBudgetAmount = parseInt(totalBudgetAmount) + parseInt(amount);
    budgetsStore.updateBudget(totalBudgetAmount);

}