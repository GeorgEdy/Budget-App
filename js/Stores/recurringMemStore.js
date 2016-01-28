var recurringMemStore = (function () {
    var lastId = 2;
    var data = [
        {
            id: 0,
            name: "Salariu",
            categoryId: "3",
            sum: "50",
            type: "income",
            date: "15 01 2016",
            day: "15"
        },
        {
            id: 1,
            name: "Electricity",
            categoryId: "4",
            sum: "100",
            type: "expense",
            date: "23 01 2016",
            day: "15"
        }
    ];

    return {
        getAllRecurrings: function () {
            return new Promise(function (resolve, reject) {
                resolve(data);
            });
        },
        getRecurringById: function (id) {
            return new Promise(function (resolve, reject) {
                var obj = "";
                $.each(data, function (index) {
                    if (index == id) {
                        obj = data[id];
                    }
                });
                resolve(obj);
            });
        },
        addRecurring: function (item) {
            return new Promise(function (resolve, reject) {
                item.id = lastId++;
                data.push(item);
                resolve(data);
            });
        },
        updateRecurring: function (id, updateData) {
            return new Promise(function (resolve, reject) {
                $.each(data, function (index) {
                    if (this.id == id) {
                        data[id] = updateData;
                        data[index].id = id;
                    }
                });
                resolve(data);
            });
        },
        deleteExpense: function (id) {
            return new Promise(function (resolve, reject) {
                $.each(data, function (index) {
                    if (this.id == id) {
                        data.splice(index, 1);
                    }
                });
                resolve(data);
            });
        }
    };
})();