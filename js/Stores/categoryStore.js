var categoriesStore = (function () {
        var lastId = 4;
        var data = [
            {
                id: 0,
                name: 'Food',
                type: 'expense'
            },
            {
                id: 1,
                name: 'Clothing',
                type: 'expense'
            },
            {
                id: 2,
                name: 'Health',
                type: 'expense'
            },
            {
                id: 3,
                name: 'Salary',
                type: 'income'
            },
            {
                id: 4,
                name: 'House&Appliances',
                type: 'expense'
            }
        ];

        return {
            getAllCategories: function () {
                return new Promise(function (resolve, reject) {
                    resolve(data);
                });
            },
            getCategoryById: function (id) {
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
            addCategory: function (item) {
                return new Promise(function (resolve, reject) {
                    item.id = lastId++;
                    data.push(item);
                    resolve(data);
                });
            },
            updateCategory: function (id, editedData) {
                return new Promise(function (resolve, reject) {
                    $.each(data, function(index) {
                        if (this.id == id) {
                            data[index] = editedData;
                            data[index].id = id;
                        }
                    });
                    resolve(data);
                });
            },
            deleteCategory: function (id) {
                return new Promise(function (resolve, reject) {
                    $.each(data, function (index, value) {
                        if (value.id === id) {
                            data.splice(index, 1);
                            resolve();
                        }
                    });
                });
            }
        };
    }
)();