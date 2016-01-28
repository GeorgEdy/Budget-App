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
        },
        getAllRecurrings: function () {
            return recurringMemStore.getAllRecurrings();
        },
        addRecurring: function (item) {
            recurringMemStore.addRecurring(item);
        },
        updateRecurring: function (id, item) {
            recurringMemStore.updateRecurring(id, item);
        },
        getAllCategories: function () {
            return categoryMemStore.getAllCategories();
        },
        addCategory: function (item) {
            return categoryMemStore.addCategory(item);
        },
        updateCategory: function (id, item) {
            return categoryMemStore.updateCategory(id, item);
        },
        deleteCategory: function (id) {
            return categoryMemStore.deleteCategory(id);
        }
    }
})();