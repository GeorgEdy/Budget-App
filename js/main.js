var registerTransaction = function () {
    event.preventDefault();
    var parentNode = $(this).parent().attr("id");
    var transactionFormData = getTransactionData(parentNode);
    var balance = parseInt(budgetsStore.getTotalBudget());

    if(transactionFormData) {
        if(parentNode === "income-form") {
            sendTransaction({name: transactionFormData.name, categoryId: transactionFormData.categoryId, sum: transactionFormData.sum, type: "income", date: transactionFormData.date}, transactionFormData.recurring);
        } else {
            sendTransaction({name: transactionFormData.name, categoryId: transactionFormData.categoryId, sum: transactionFormData.sum, type: "expense", date: transactionFormData.date}, transactionFormData.recurring);
        }
    }
};

var sendTransaction = function (item, recurring) {
    if (recurring == true) {
        recurringStore.addRecurring(item);
    } else {
        addBudget(item.name, item.categoryId, item.sum, item.type, item.date);
    }
};

var getTransactionData = function (idForm) {
    var name = $('#'+ idForm +' [title = nume]').val();
    var sum = $('#'+ idForm +' [type = number]').val();
    var cat = $('#'+ idForm +' [title = category]').val();
    var recurring = $('#'+ idForm +' [type = checkbox]').is(":checked");
    var date = moment().format('DD MM YYYY');

    resetErrors(idForm);

    if (validateTransactionData(idForm, name, sum, cat)) {
        var categories = categoriesStore.getAllCategories();
        var categoryId = "";
        $.each(categories, function (index, value) {
            if(value.name === cat) {
                categoryId = value.id;
            }
        });
        return {name: name, categoryId: categoryId, sum: sum, recurring: recurring, date: date};
    }else {
        return false;
    }
};

var resetErrors = function (idForm) {
    $('#'+ idForm +' .nameError').addClass("hiddenn");
    $('#'+ idForm +' .sumError').addClass("hiddenn");
    $('#'+ idForm +' .categoryError').addClass("hiddenn");
};

var validateTransactionData = function (idForm, name, sum, cat) {
    if(!checkLength(name)) {
        $('#'+ idForm +' .nameError').html("Introduceti un nume").removeClass("hiddenn");
        return false;
    }else if (!checkLength(sum)) {
        $('#'+ idForm +' .sumError').html("Introduceti o suma").removeClass("hiddenn");
        return false;
    }else if (cat == null) {
        $('#'+ idForm +' .categoryError').html("Selectati o categorie").removeClass("hiddenn");
        return false;
    }
    return true;
};

var checkLength = function (name) {
    return name.length ? true : false;
};

$(function (){
    $('#categories').click(function(){
        $('.show-categories').attr('id','active');
    });
    $('#transactions').click(function(){
        $('.show-categories').attr('id','');
    });
    $('#add-income').click(function(){
        $('#income-form').addClass('active');
        $('#expense-form').removeClass('active');
    });
    $('#add-expense').click(function(){
        $('#income-form').removeClass('active');
        $('#expense-form').addClass('active');
    });
    $('.total-income').click(function(){
        $('.income').addClass('active');
        $('.expenses').removeClass('active');
    });
    $('.total-expense').click(function(){
        $('.expenses').addClass('active');
        $('.income').removeClass('active');
    });
<<<<<<< HEAD





=======
    //add income/expense

    $('#income-form [type = submit]').click(registerTransaction);
    $('#expense-form [type = submit]').click(registerTransaction);
>>>>>>> 01a59d14b9c7b783d133e93d13d1b01f2ddd59d1
});