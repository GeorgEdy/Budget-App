var categoriesStore = (function () {
        var lastId = 3;
        var data = [
            {
                id: 0,
                name: 'Food'
            },
            {
                id: 1,
                name: 'Clothing'
            },
            {
                id: 2,
                name: 'Health'
            }
        ];

        return {
            getAllCategories: function () {
                return new Promise = (function (resolve, reject) {
                    resolve(data);
                });
            },
            getCategoryById: function (id) {
                return new Promise = (function (resolve, reject) {
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
                return new Promise = (function (resolve, reject) {
                    item.id = lastId++;
                    data.push(item);
                    resolve(data);
                });
            },
            updateCategory: function (id, editedData) {
                return new Promise = (function (resolve, reject) {
                    $.each(data, function(index) {
                        if (this.id == id) {
                            data[index] = editedData;
                        }
                    });
                    resolve(data);
                });
            },
            deleteCategory: function (id) {
                return new Promise = (function (resolve, reject) {
                    data.splice(id, 1);
                    resolve();
                });
            }
        };
    }
)();