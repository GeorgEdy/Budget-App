var registerTransaction = function () {
    event.preventDefault();
    var transactionFormData = getTransactionData();
    if(transactionFormData) {
        console.log(transactionFormData);
    }
};

var getTransactionData = function () {
    var name = $('#income-form [title = nume]').val();
    var sum = $('#income-form [type = number]').val();
    var cat = $('#income-form [title = category]').val();
    var recurring = $('#income-form [type = checkbox]').is(":checked");
    var date = moment().format('DD MM YYYY');

    if (validateTransactionData(name, sum, cat)) {
        return {name: name, category: cat, sum: sum, recurring: recurring, date: date};
    }else {
        return false;
    }
};

var validateTransactionData = function (name, sum, cat) {
    if(!checkLength(name)) {
        alert("Introduce-ti un nume");
        return false;
    }else if (!checkLength(sum)) {
        alert("Introduce-ti o suma");
        return false;
    }else if (cat == null) {
        alert("Selectati o categorie");
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
    addBudget(5, "caca-income", "income", "300", "income", "30.11.2015");
    addBudget(6, "caca-expense", "foods", "400", "expense", "30.11.2015");

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

    //add income/expense

    $('#income-form [type = submit]').click(registerTransaction);
    $('#expense-form [type = submit]').click(registerTransaction);
});