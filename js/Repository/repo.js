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
/*            transactionsAjaxStore.addTransaction({
                name: name,
                categoryId: category,
                sum: amount,
                type: type,
                date: date
            });*/
        },
        setBudget: function (type, amount) {
            budgetsMemStore.getTotalBudget().then(function (data) {
                var totalNewBudget = "";
                if (type == "income") {
                    totalNewBudget = parseFloat(data.total) + parseFloat(amount);
                } else {
                    totalNewBudget = parseFloat(data.total) - parseFloat(amount);
                }
                budgetsMemStore.setTotalBudget(totalNewBudget);
                //     budgetsAjaxStore.setTotalBudget(totalNewBudget);
            });
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
        deleteRecurring: function (id) {
            return recurringMemStore.deleteExpense(id);
        },
        getAllCategories: function () {
            return categoryMemStore.getAllCategories();
        },
        getCategoryById: function (id) {
            return categoryMemStore.getCategoryById(id);
        },
        addCategory: function (item) {
            return categoryMemStore.addCategory(item);
        },
        updateCategory: function (id, item) {
            return categoryMemStore.updateCategory(id, item);
        },
        deleteCategory: function (id) {
            return categoryMemStore.deleteCategory(id);
        },
        getBalance: function () {
            var budget = budgetsMemStore.getTotalBudget();
/*            if (budget == 0) {
                budgetsAjaxStore.getTotalBudget().then(function (data) {
                    budget = data.totalBudget;
                    console.log(budget);
                    repo.setBudget("income", budget);
                    return budget;
                });
            } else {*/
                return budget;
            }
 //       }
    }
})();