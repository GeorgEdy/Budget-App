var expensesStore = (function () {

    var data = {
        expensesLastId: 3,
        expenses: [
            {
                id: 0,
                name: "Legume & Fructe",
                category: "Foods",
                sum: "50",
                recurrent: 0,
                date: "3 01 2016"
            },
            {
                id: 1,
                name: "Pantofi",
                category: "Imbracaminte",
                sum: "100",
                recurrent: 0,
                date: "31 11 2015"
            },
            {
                id: 2,
                name: "Intretinere",
                category: "House&Appliances",
                sum: "600",
                recurrent: 1,
                date: "3 11 2015"
            }
        ]
    };

    return {
        getAllExpenses: function () {
            return data;
        },
        getExpense: function (id) {
            var obj = "";
            $.each(data.expenses, function (index) {
                if(index == id){
                    obj = data.expenses[id];
                }
            });
            return obj;
        },
        addExpense: function (item) {
            item.id = data.expensesLastId ++;
            data.expenses.push(item);
            return data;
        },
        updateExpense: function (id, updateData) {
            $.each(data.expenses, function (index) {
                if(this.id == id){
                    data.expenses[id] = updateData;
                }
            });
            return data;
        },
        deleteExpense: function (id) {
            $.each(data.expenses, function (index) {
                if(this.id == id){
                    data.expenses.splice(index, 1);
                }
            });
            return data;
        }
    };
})();