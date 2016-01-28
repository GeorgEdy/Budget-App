var budgetsAjaxStore = (function () {
    var entriesUrl = "http://greieri.meteor.com/api/budget";
    var errorHandler = function(reject) {
        return function (xhr) {
            if(xhr.status == 409) {
                reject(xhr.responseJSON.error);
            } else {
                reject('An unknown error occurred');
            }
        };
    };
    return {
        getTotalBudget: function() {
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
        setTotalBudget: function(newSum) {
            return new Promise(function (resolve, reject) {
                var patchSettings = {
                    type: 'PATCH',
                    data: JSON.stringify(newSum),
                    headers: {'Content-Type': 'application/json'}
                };
                var ajaxResult = $.ajax(entriesUrl, patchSettings);
                ajaxResult.done(function(d) {
                    resolve(d);
                });
                ajaxResult.fail(errorHandler(reject));
            });
        }
    };
})();

























