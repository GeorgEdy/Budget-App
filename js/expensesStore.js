var expensesStore = (function () {

    var data = {
        expensesLastId: 2,
        recuringExpensesLastId: 2,
        expenses: [
            {
                id: 0,
                name: "Legume & Fructe",
                category: "Foods",
                sum: "50"
            },
            {
                id: 1,
                name: "Pantofi",
                category: "Imbracaminte",
                sum: "100"
            }
        ],
        recuringExpenses: [
            {
                id: 0,
                name: "Intretinere",
                sum: "500"
            },
            {
                id: 1,
                name: "Taxa Scolarizare",
                sum: "100"
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
        addRecuringExpense: function (item) {
            item.id = data.recuringExpensesLastId ++;
            data.recuringExpenses.push(item);
            return data;
        },
        updateExpense: function (id, updateData) {
            $.each(data.expenses, function (index) {
                if(this.id == id){
                    data.expenses[index] = updateData;
                }
            });
            return data;
        },
        updateRecuringExpense: function (id, updateData) {
            $.each(data.recuringExpenses, function (index) {
                if(this.id == id){
                    data.recuringExpenses[index] = updateData;
                }
            });
            return data;
        },
        deleteExpense: function (id) {
            $.each(data.expenses, function (index) {
                if(index == id){
                    data.expenses.splice(index, 1);
                }
            });
            return data;
        },
        deleteRecuringExpense: function (id) {
            $.each(data.recuringExpenses, function (index) {
                if(index == id){
                    data.recuringExpenses.splice(index, 1);
                }
            });
            return data;
        }
    };
})();