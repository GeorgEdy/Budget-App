var recurringStore = (function () {
    var lastId = 2;
    var data = [
        {
            id: 0,
            name: "Salary",
            category: "Salary",
            sum: "50",
            type: "Income",
            date: "15 01 2016",
            startDate:"20 01 2016",
            interval:"monthly"
        },
        {
            id: 1,
            name: "Electricity",
            category: "House spends",
            sum: "100",
            type: "Expenses",
            date: "23 01 2016",
            startDate:"25 01 2016",
            interval:"monthly"
        }
    ];

    return {
        getAllRecurrings: function () {
            return new Promise(function(resolve, reject) {
               resolve(data);
            });
        },
        getRecurringById: function (id) {
            return new Promise(function (resolve, reject) {
                var obj = "";
                $.each(data, function (index) {
                    if(index == id){
                        obj = data[id];
                    }
                });
                resolve(obj);
            });
        },
        addRecurring: function (item) {
            return new Promise(function (resolve, reject){
                item.id = lastId++;
                data.push(item);
                resolve(data);
            });
        },
        updateRecurring: function (id, updateData) {
            return new Promise(function (resolve, reject) {
                $.each(data, function () {
                    if(this.id == id){
                        data[id] = updateData;
                    }
                });
                resolve(data);
            });
        },
        deleteExpense: function (id) {
            return new Promise(function (resolve, reject) {
                $.each(data, function (index) {
                    if(this.id == id){
                        data.splice(index, 1);
                    }
                });
                resolve(data);
            });
        }
    };
})();