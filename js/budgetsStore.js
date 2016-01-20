var budgetsStore = (function () {
    var data = {
        budget: 0,
        extraBudgetLastId: 3,
        extraBudget: [
            {
                id: 1,
                name: "Part-time job",
                sum: "500"
            },
            {
                id: 2,
                name: "Bursa",
                sum: "100"
            }
        ]
    };

    return {
        getAllBudgets: function () {
            return data;
        },
        getExtraBudgets: function (id) {
            var obj = "";
            $.each(data.extraBudget, function (index) {
                if(index == id){
                    obj = data.extraBudget[id];
                }
            });
            return obj;
        },
        addBudget: function (item) {
            data.budget = item;
            return data;
        },
        addExtraBudget: function (item) {
            item.id = data.extraBudgetLastId++;
            data.extraBudget.push(item);
            return data;
        },
        updateBudget: function (updateData) {
            data.budget = updateData;
            return data;
        },
        updateExtraBudget: function (id, updateData) {
            $.each(data.extraBudget, function (index) {
                if(this.id == id){
                    data.extraBudget[index] = updateData;
                }
            });
            return data;
        },
        deleteBudget: function () {
            data.budget = 0;
            return data;
        },
        deleteExtraBudget: function (id) {
            (data.extraBudget).forEach(function(value, key) {
                if (value.id === id) {
                    console.log("FOUND");
                    data.extraBudget.splice(key, 1);
                }
            });
            //$.each(data.extraBudget, function (index, value) {
            //    //console.log("this is it:", data.extraBudget[index]);
            //    console.log("index: "+index+" value: "+value.id);
            //    if(value.id === id){
            //        console.log("this is it:", id)
            //        data.extraBudget.splice(index, 1);
            //    }
            //});
            return data;
        }
    };
})();

























