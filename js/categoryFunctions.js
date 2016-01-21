var categoryFunctions = function() {
    return {
        addCategory: function (categoryName, categoryLimit) {
            categoriesStore.addCategory({name:categoryName, limit: categoryLimit});
        },
        deleteCategory: function (categoryId) {
            categoriesStore.deleteCategory(categoryId);
        }
    };
};