//var services = (function() {
//    return {
//        addTransaction: function (name, category, amount, type, date) {
//            if (type == "income") {
//                transactionsStore.addTransaction({
//                    name: name,
//                    categoryId: category,
//                    sum: amount,
//                    type: type,
//                    date: date
//                });
//                var totalNewBudget = budgetsStore.getTotalBudget() + parseInt(amount);
//                budgetsStore.setTotalBudget(totalNewBudget);
//            } else {
//                transactionsStore.addTransaction({
//                    name: name,
//                    categoryId: category,
//                    sum: amount,
//                    type: type,
//                    date: date
//                });
//                totalNewBudget = budgetsStore.getTotalBudget() - parseInt(amount);
//                budgetsStore.setTotalBudget(totalNewBudget);
//            }
//        },
//        editTransaction: function (id, name, amount, category, type, date) {
//            var totalBudget = budgetsStore.getTotalBudget();
//            var transactionSum = transactionsStore.getTransaction(id).sum;
//
//            totalBudget = parseInt(totalBudget - transactionSum + amount);
//            budgetsStore.setTotalBudget(totalBudget);
//            transactionsStore.updateTransaction(id, {
//                name: name,
//                category: category,
//                sum: amount,
//                type: type,
//                date: date
//            });
//        },
//        deleteTransaction: function (id) {
//            var totalBudget = budgetsStore.getTotalBudget();
//            var transactionSum = transactionsStore.getTransaction(id).sum;
//
//            totalBudget = parseInt(totalBudget + transactionSum);
//            budgetsStore.setTotalBudget(totalBudget);
//            transactionsStore.deleteTransaction(id);
//        }
//
//    }
//})();

var addTransaction = function(name, category, amount, type, date) {
    if (type == "income" ) {
        transactionsStore.addTransaction({name: name, categoryId: category, sum: amount, type: type, date: date});
        budgetsStore.getTotalBudget().then(function (data) {
            var totalNewBudget = parseFloat(data.totalBudget) + parseInt(amount);
            budgetsStore.setTotalBudget(totalNewBudget);
        });
    }else {
        transactionsStore.addTransaction({name: name, categoryId: category, sum: amount, type: type, date: date});
        budgetsStore.getTotalBudget().then(function (data) {
            var totalNewBudget = parseFloat(data.totalBudget) - parseInt(amount);
            budgetsStore.setTotalBudget(totalNewBudget);
        });
    }
}

var editTransaction = function (id, name, amount, category, type, date) {
    transactionsStore.getTransaction(id).then(function (data) {
        var transactionSum = data.sum ;
        transactionsStore.updateTransaction(id, {name: name, category: category, sum: amount, type: type, date: date});
        budgetsStore.getTotalBudget().then(function (data) {
            var totalBudget = parseInt(data.totalBudget - transactionSum + amount);
            budgetsStore.setTotalBudget(totalBudget);
        });
    });
};

var deleteTransaction = function (id) {
    transactionsStore.getTransaction(id).then(function (data) {
        var transactionSum = data.sum ;
        transactionsStore.deleteTransaction(id);
        budgetsStore.getTotalBudget().then(function (data) {
            var totalBudget = parseInt(data.totalBudget + transactionSum);
            budgetsStore.setTotalBudget(totalBudget);
        });
    });
};