var repo = (function () {
    return {
        addTransaction: function (name, category, amount, type, date) {
            transactionsMemStore.addTransaction({
                name: name,
                categoryId: category,
                sum: amount,
                type: type,
                date: date
            });
        },
        updateBudget: function (type, amount) {
            var budget = budgetsMemStore.getTotalBudget();
            var totalNewBudget = "";
            if (type == "income") {
                totalNewBudget = parseFloat(budget) + parseInt(amount);
            } else {
                totalNewBudget = parseFloat(budget) - parseInt(amount);
            }
            budgetsMemStore.setTotalBudget(totalNewBudget);
        },
        updateTransaction: function (id, name, category, amount, type, date) {
            transactionsMemStore.updateTransaction(id, {
                name: name,
                categoryId: category,
                sum: amount,
                type: type,
                date: date
            });
        },
        getTransaction: function (id) {
            return transactionsMemStore.getTransaction(id);
        },
        getAllTransactions: function () {
            return transactionsMemStore.getAllTransactions();
        }
    }
})();