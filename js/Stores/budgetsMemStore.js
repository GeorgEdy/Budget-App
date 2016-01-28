
var budgetsMemStore = (function () {
    var data = {
        totalBudget: 150
    };

    return {
        getTotalBudget: function() {
            return data.totalBudget;
        },
        setTotalBudget: function(newSum) {
            data.totalBudget = newSum;
            return false;
        }
    };
})();