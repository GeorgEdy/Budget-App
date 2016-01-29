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
            transactionsAjaxStore.addTransaction({
                name: name,
                categoryId: category,
                sum: amount,
                type: type,
                date: date
            });
        },
        setBudget: function (type, amount) {
            var budget = budgetsMemStore.getTotalBudget();
            var totalNewBudget = "";
            if (type == "income") {
                totalNewBudget = parseFloat(budget) + parseInt(amount);
            } else {
                totalNewBudget = parseFloat(budget) - parseInt(amount);
            }
            budgetsMemStore.setTotalBudget(totalNewBudget);
            budgetsAjaxStore.setTotalBudget(totalNewBudget);
        },
        updateTransaction: function (id, name, category, amount, type, date) {
            transactionsMemStore.updateTransaction(id, {
                name: name,
                categoryId: category,
                sum: amount,
                type: type,
                date: date
            });
            transactionsAjaxStore.updateTransaction(id, {
                name: name,
                categoryId: category,
                sum: amount,
                type: type,
                date: date
            });
        },
        getTransaction: function (id) {
            var transaction = transactionsMemStore.getTransaction(id)
            if (transaction) {
                return transaction;
            } else {
                transactionsAjaxStore.getTransaction(id).then(function (data) {
                    return data;
                });
            }
        },
        getAllTransactions: function () {
            var transactions = transactionsMemStore.getAllTransactions();
            if (transactions) {
                return transactions;
            } else {
                transactionsAjaxStore.getAllTransactions().then(function (data) {
                    $.each(data, function (index, value) {
                        transactionsMemStore.addTransaction(value);
                    });
                    return data;
                });
            }
        },
        getAllRecurrings: function () {
            var recurrings = recurringMemStore.getAllRecurrings();
            if (recurrings) {
                return recurrings;
            } else {
                recurringAjaxStore.getAllRecurrings().then(function (data) {
                    $.each(data, function (index, value) {
                        recurringMemStore.addRecurring(value);
                    });
                    return data;
                });
            }
        },
        addRecurring: function (item) {
            recurringMemStore.addRecurring(item);
            recurringAjaxStore.addRecurring(item);
        },
        updateRecurring: function (id, item) {
            recurringMemStore.updateRecurring(id, item);
            recurringAjaxStore.updateRecurring(id, item);
        },
        deleteRecurring: function (id) {
            recurringAjaxStore.deleteExpense(id).then(function () {
                return recurringMemStore.deleteExpense(id);
            });
        },
        getAllCategories: function () {
            var categories = categoryMemStore.getAllCategories();
            if (categories) {
                return categories;
            } else {
                categoryAjaxStore.getAllCategories().then(function (data) {
                    $.each(data, function (index, value) {
                        categoryMemStore.addCategory(value);
                    });
                    return data;
                });
            }
        },
        getCategoryById: function (id) {
            var category = categoryMemStore.getCategoryById(id)
            if (category) {
                return category;
            } else {
                categoryAjaxStore.getCategoryById(id).then(function (data) {
                    return data;
                });
            }
        },
        addCategory: function (item) {
            categoryAjaxStore.addCategory(item).then(function () {
                return categoryMemStore.addCategory(item);
            });
        },
        updateCategory: function (id, item) {
            categoryAjaxStore.updateCategory(id, item).then(function () {
                return categoryMemStore.updateCategory(id, item);
            });
        },
        deleteCategory: function (id) {
            categoryAjaxStore.deleteCategory(id).then(function () {
                return categoryMemStore.deleteCategory(id);
            });
        },
        getBalance: function () {
            var budget = budgetsMemStore.getTotalBudget();
            if (budget == 0) {
                budgetsAjaxStore.getTotalBudget().then(function (data) {
                    budget = data.totalBudget;
                    console.log(budget);
                    repo.setBudget("income", budget);
                    return budget;
                });
            } else {
                return budget;
            }
        }
    }
})();