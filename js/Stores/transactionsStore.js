var transactionsStore = (function () {
var transactionsLastId = 3;
    var data =  [
            {
                id: 0,
                name: "Legume & Fructe",
                categoryId: 0,
                sum: "50",
                type: "expense",
                date: "3 01 2016"
            },
            {
                id: 1,
                name: "Salariu",
                categoryId: 3,
                sum: "800",
                type: "income",
                date: "31 11 2015"
            },
            {
                id: 2,
                name: "Intretinere",
                categoryId: 4,
                sum: "600",
                type: "expense",
                date: "3 11 2015"
            }
        ];

    return {
        getAllTransactions: function () {
            return new Promise(function (resolve, reject) {
                resolve(data);
            });
        },
        getTransaction: function (id) {
            return new Promise(function (resolve, reject) {
                var obj = "";
                $.each(data.transactions, function (index) {
                    if (data.transactions[index].id === id) {
                        obj = data.transactions[index];
                    }
                });
                resolve(obj);
            });
        },
        addTransaction: function (item) {
            return new Promise(function (resolve, reject) {
                item.id = data.transactionsLastId++;
                data.transactions.push(item);
                resolve(data);
            });
        },
        updateTransaction: function (id, updateData) {
            return new Promise(function (resolve, reject) {
                $.each(data.transactions, function (index) {
                    if (data.transactions[index].id === id) {
                        data.transactions[index] = updateData;
                    }
                });
                resolve(data);
            });
        },
        deleteTransaction: function (id) {
            return new Promise(function (resolve, reject) {
                $.each(data.transactions, function (index, value) {
                    if (value.id === id) {
                        data.transactions.splice(index, 1);
                        resolve();
                    }
                });
            });
        }
    };
})();