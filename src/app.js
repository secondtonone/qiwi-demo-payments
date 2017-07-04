$('#buy-payment-bill').click(function() {

    var phoneNumber = $('#phone-number-payment-bill').val();

    var options = {
        url: '/paymentByBill',
        method: 'POST',
        dataType: 'json',
        data: {
            tel: phoneNumber
        }
    };

    $.when($.ajax(options)).then(function(data){
        console.log(data);
        window.location.replace(data.redirect);
    });

});

$('#buy-payment-create').click(function() {

    var options = {
        url: '/paymentCreate',
        method: 'POST',
        dataType: 'json'
    };

    $.when($.ajax(options)).then(function(data){
        console.log(data);
        window.location.replace(data.redirect);
    });

});