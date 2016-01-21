var budgetsStore = (function () {
    var data = {
        totalBudget: 600,
        budgetLastId: 3,
        budgets: [
            {
                id: 1,
                name: "Part-time job",
                sum: "500",
                recurrent : 0
            },
            {
                id: 2,
                name: "Bursa",
                sum: "100",
                recurrent : 0
            }
        ]
    };

    return {
        getTotalBudget: function() {
            return data.totalBudget;
        }
        setTotalBudget: function(newSum) {
            data.totalBudget = newSum;
        }
        getAllBudgets: function () {
            return data;
        },
        getBudget: function(id) {
            var obj = "";
            $.each(data.budgets, function (index, value) {
                if(value.id == id){
                    obj = data.budgets[index];
                }
            });
            return obj;
        },
        addBudget: function (item) {
            item.id = data.budgetLastId++;
            data.totalBudget = data.totalBudget + parseInt(item.sum);
            data.budgets.push(item);
            return data;
        },
        updateBudget: function (id, updateData) {
            $.each(data.budgets, function (index,value) {
                if(value.id == id){
                    data.totalBudget = data.totalBudget - parseInt(data.budgets[index].sum);
                    updateData.id = id;
                    data.budgets[index] = updateData;
                    data.totalBudget = data.totalBudget + parseInt(updateData.sum);
                }
            });
            return data;
        },
        deleteBudget: function (id) {
            $.each(data.budgets, function (index, value) {
                if(value.id === id){
                    data.totalBudget = data.totalBudget - parseInt(data.budgets[index].sum);
                    data.budgets.splice(index, 1);
                    return false;
                }
            });
            return data;
        }
    };
})();












