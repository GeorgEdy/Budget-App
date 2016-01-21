var budgetFunctions = function() {
    var addBudget = function(name, amount, recurrent) {
        budgetsStore.addBudget({name: name, sum: amount, recurrent: recurrent});
    }

    var editBudget = function(id, name, amount, recurrent) {
        var itemToEdit = budgetsStore.getBudget(id);
        budgetsStore.updateBudget(itemToEdit.id, {name: name, amount: amount, recurrent: recurrent});
    }

    var deleteBudget = function(id) {
        var itemToDelete = budgetStore.getBudget(id);
        budgetsStore.deleteBudget(itemToDelete.id);
    }
}();
