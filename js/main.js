var getFormData = function () {
    return {
        name : $('#income-form option:selected').text(),
        sum: $('#income-form input[type="number"]').val()
    };
};
var onSubmit = function () {
  transactionsStore.addTransaction(getFormData()).then(function () {
      drawTable(transactionsStore);
  });
};

var drawTable = function (transactionsStore) {
    transactionsStore.getAllTransactions().then(function (data) {
        $('#income-history tbody tr').remove();
        $.each(data.transactions, function () {
            var tr = tmpl("item_tmpl", this);
            $('#income-history tbody').append(tr);
        });
    })
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
    $('#income-form').submit(onSubmit);
    $(".datepicker").datepicker();
});