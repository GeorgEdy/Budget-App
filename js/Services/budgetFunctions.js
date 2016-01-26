var addBudget = function(name, category, amount, type, date) {
    if (type == "income" ) {
        transactionsStore.addTransaction({name: name, categoryId: category, sum: amount, type: type, date: date});
        var totalNewBudget = budgetsStore.getTotalBudget() + parseInt(amount);
        budgetsStore.setTotalBudget(totalNewBudget);
    }else {
        transactionsStore.addTransaction({name: name, categoryId: category, sum: amount, type: type, date: date});
        totalNewBudget = budgetsStore.getTotalBudget() - parseInt(amount);
        budgetsStore.setTotalBudget(totalNewBudget);
    }
}
