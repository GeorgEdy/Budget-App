var editTransaction = function (name, amount, category, type, date, id) {
    var totalBudget = budgetsStore.getTotalBudget();
    var transactionSum = transactionsStore.getTransaction(id).sum;

    totalBudget = parseInt(totalBudget - transactionSum + amount);
    budgetsStore.setTotalBudget(totalBudget);
    transactionsStore.updateTransaction(id,{name: name, category: category, sum: amount, type: type, date: date});
};

var deleteTransaction = function (id) {
    var totalBudget = budgetsStore.getTotalBudget();
    var transactionSum = transactionsStore.getTransaction(id).sum;

    totalBudget = parseInt(totalBudget + transactionSum);
    budgetsStore.setTotalBudget(totalBudget);
    transactionsStore.deleteTransaction(id);
};