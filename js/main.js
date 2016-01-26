var drawTable = function () {
    transactionsStore.getAllTransactions().then(function (data) {
        $('#income-history tbody tr').remove();
        $.each(data, function () {
            var tr = tmpl("item_tmpl", this);
            $('#income-history tbody').append(tr);
        });
    })
};

var registerTransaction = function () {
    event.preventDefault();
    var parentNode = event.target.id;
    var transactionFormData = getTransactionData(parentNode. csllbsk);

    if(transactionFormData) {
        if(parentNode === "income-form") {
            sendTransaction(transactionFormData, transactionFormData.recurring);
        } else {
            sendTransaction(transactionFormData, transactionFormData.recurring);
        }
    }
};

var sendTransaction = function (item, recurring) {
    if (recurring == true) {
        console.log(item);
        recurringStore.addRecurring({name: item.name, categoryId: item.categoryId, sum: item.sum, type: item.type, date: item.date, recurringDate: item.recurringDate});
    } else {
        addTransaction(item.name, item.categoryId, item.sum, item.type, item.date);
    }
};

var getTransactionData = function (idForm) {
    var name = $('#'+ idForm +' [title = nume]').val();
    var sum = $('#'+ idForm +' [type = number]').val();
    var cat = $('#'+ idForm +' [title = category]').val();
    var recurring = $('#'+ idForm +' [type = checkbox]').is(":checked");
    var date = moment().format('DD MM YYYY');
    var recurringDate = $('#'+ idForm +' .datepicker').html();
    resetErrors(idForm);

    if (validateTransactionData(idForm, name, sum, cat, recurringDate)) {
        var categoryId = "";
        categoriesStore.getAllCategories().then(function (data) {
            $.each(data, function (index, value) {
                if(value.name.toLowerCase() == cat) {
                    categoryId = value.id;
                    return;
                }
            });
        });
        return {name: name, categoryId: categoryId, sum: sum, recurring: recurring, date: date, recurringDate: recurringDate };
    }else {
        return false;
    }
};

var resetErrors = function (idForm) {
    $('#'+ idForm +' .nameError').addClass("hiddenn");
    $('#'+ idForm +' .sumError').addClass("hiddenn");
    $('#'+ idForm +' .categoryError').addClass("hiddenn");
};

var validateTransactionData = function (idForm, name, sum, cat, recurringDate) {
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
    $('#income-form').submit(registerTransaction);
    $('#expense-form').submit(registerTransaction);
    $(".datepicker").datepicker();
});