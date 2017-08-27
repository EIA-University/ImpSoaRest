(function($){
    $(function(){

        // Prepare form for submit
        $("#fSado").submit(function (event) {

            /* stop form from submitting normally */
            event.preventDefault();

            /* get the action attribute from the <form action=""> element */
            var $form = $(this),
                url = $form.attr('action'),
                $saldo = $("#saldo");

            /* Send the data using post with element id name and name2*/
            swal({
                title: "Confirmar saldo",
                text: "se enviara el saldo: " + $saldo.val(),
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function(){
                var posting = $.post(url, {saldo: $saldo.val()});
                /* Alerts the results */
                posting.done(function (data) {
                    swal({
                        title: "Saldo Guardado",
                        text: data,
                        type: "success"
                    }, function () {
                        $('html, body').animate({
                            scrollTop: $("#selectorJuego").offset().top
                        }, 2000);

                        // cambio el place holder del texto
                        $("label[for = saldo]").text("Cambiar saldo, actual: " +  $saldo.val());
                        $saldo.val("");
                        Materialize.updateTextFields();
                    });
                });
            });
        });

        $('.collapsible').collapsible();
        $('.button-collapse').sideNav();
        $('.parallax').parallax();

    }); // end of document ready
})(jQuery); // end of jQuery name space