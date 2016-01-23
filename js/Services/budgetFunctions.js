var addBudget = function(id, name, category, amount, type, date) {
    if (type == "income" ) {
        transactionsStore.addTransaction({id: id, name: name, category: category, sum: amount, type: type, date: date});
        var totalNewBudget = budgetsStore.getTotalBudget() + parseInt(amount);
        budgetsStore.setTotalBudget(totalNewBudget);
    }else {
        transactionsStore.addTransaction({id: id, name: name, category: category, sum: amount, type: type, date: date});
        totalNewBudget = budgetsStore.getTotalBudget() - parseInt(amount);
        budgetsStore.setTotalBudget(totalNewBudget);

    }
}
