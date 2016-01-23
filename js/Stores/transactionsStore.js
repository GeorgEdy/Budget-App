var transactionsStore = (function () {

    var data = {
        transactionsLastId: 3,
        transactions: [
            {
                id: 0,
                name: "Legume & Fructe",
                category: "Foods",
                sum: "50",
                type: "expense",
                date: "3 01 2016"
            },
            {
                id: 1,
                name: "Salariu",
                category: "Income",
                sum: "800",
                type: "income",
                date: "31 11 2015"
            },
            {
                id: 2,
                name: "Intretinere",
                category: "House&Appliances",
                sum: "600",
                type: "expense",
                date: "3 11 2015"
            }
        ]
    };

    return {
        getAllTransactions: function () {
            return data;
        },
        getTransaction: function (id) {
            var obj = "";
            $.each(data.transactions, function (index) {
                if(data.transactions[index].id === id){
                    obj = data.transactions[index];
                }
            });
            return obj;
        },
        addTransactions: function (item) {
            item.id = data.transactionsLastId ++;
            data.transactions.push(item);
            return data;
        },
        updateTransaction: function (id, updateData) {
            $.each(data.transactions, function (index) {
                if(data.transactions[index].id === id){
                    data.transactions[index] = updateData;
                }
            });
            return data;
        },
        deleteTransaction: function (id) {
            $.each(data.transactions, function (index, value) {
                console.log(value);
                if(value.id === id){
                    data.transactions.splice(index, 1);
                    return false;
                }
            });
            return data;
        }
    };
})();