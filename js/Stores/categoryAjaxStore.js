var categoryAjaxStore = (function () {
    var entriesUrl = "http://greieri.meteor.com/api/categories";
    var errorHandler = function(reject) {
        return function (xhr) {
            if(xhr.status == 409) {
                reject(xhr.responseJSON.error);
            } else {
                reject('An unknown error occurred');
            }
        };
    }

    return {
        getAllCategories: function () {
            return new Promise(function (resolve, reject) {
                var getSettings = {
                    type: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                var ajaxResult = $.ajax(entriesUrl, getSettings);
                ajaxResult.done(function(d) {
                    resolve(d);
                });
                ajaxResult.fail(errorHandler(reject));
            });
        },
        getCategoryById: function (id) {
            return new Promise(function (resolve, reject) {
                var getSettings = {
                    type: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                var ajaxResult = $.ajax(entriesUrl+"/"+id, getSettings);
                ajaxResult.done(function(d) {
                    resolve(d);
                });
                ajaxResult.fail(errorHandler(reject));

            });

        },
        addCategory: function (item) {
            return new Promise(function (resolve, reject) {
                var putSettings = {
                    type: 'PUT',
                    data: JSON.stringify(item),
                    headers: {'Content-Type': 'application/json'}
                };
                var ajaxResult = $.ajax(entriesUrl, putSettings);
                ajaxResult.done(function(d) {
                    resolve(d);
                });
                ajaxResult.fail(errorHandler(reject));
            });
        },
        updateCategory: function (id, editedData) {
            return new Promise(function (resolve, reject) {
                var patchSettings = {
                    type: 'PATCH',
                    data: JSON.stringify(updateData),
                    headers: {'Content-Type': 'application/json' }
                };
                var ajaxResult = $.ajax(entriesUrl+"/"+id, patchSettings);
                ajaxResult.done(function(d) {
                    resolve(d);
                });
                ajaxResult.fail(errorHandler(reject));
            });
        },
        deleteCategory: function (id) {
            return new Promise(function (resolve, reject) {
                var deleteSettings = {
                    type: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                };
                var ajaxResult = $.ajax(entriesUrl+"/"+id, deleteSettings);
                ajaxResult.done(function(d) {
                    resolve(d);
                });
                ajaxResult.fail(errorHandler(reject));
            });
        }
    };
})();