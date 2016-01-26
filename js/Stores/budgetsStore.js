var budgetsStore = (function () {
    var data = {
        totalBudget: 150
    };

    return {
        getTotalBudget: function() {
            return new Promise(function (resolve, reject) {
                resolve(data);
            });
        },
        setTotalBudget: function(newSum) {
            return new Promise(function (resolve, reject) {
                data.totalBudget = newSum;
                resolve(data);
            });
        }
    };
})();












