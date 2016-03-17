var budgetsMemStore = (function () {
    var data = {
        total: 150
    };

    return {
        getTotalBudget: function() {
            return new Promise(function (resolve, reject) {
                resolve(data);
            });
        },
        setTotalBudget: function(newSum) {
            return new Promise(function (resolve, reject) {
                data.total = newSum;
                resolve(data);
            });
        }
    };
})();