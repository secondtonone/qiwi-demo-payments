$(".nav a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});

$('#buy-payment-bill').click(function() {

    var phoneNumber = '+7'+$('#phone-number-payment-bill').val();

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


$('#buy-payment-mobile').click(function() {

    var phoneNumber = '+7'+$('#phone-number-payment-mobile').val();

    var options = {
        url: '/paymentForMobile',
        method: 'POST',
        dataType: 'json',
        data: {
            tel: phoneNumber
        }
    };

    $.when($.ajax(options)).then(function(data){
        console.log(data);
    });

});
