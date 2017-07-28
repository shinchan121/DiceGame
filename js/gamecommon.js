$(document).ready(function () {

    var clipboard = new Clipboard('#openkey');
    
    $("#slider-dice-one").slider({
        range: "min",
        step: 0.5,
        value: 10,
        min: 1,
        max: 2000,
        slide: function (event, ui) {
            betEth = ui.value / 1000;
            $("#amount-one").val(ui.value / 1000);
            Refresh();
        }
    });
    
    $("input#checked-on").prop('disabled', true);
    
    $('#all').click(function () {
        getAllLogs();
        $('.active').removeClass('active');
        $(this).addClass('active');
    });

    $('#your').click(function () {
        getMyLogs();
        $('.active').removeClass('active');
        $(this).addClass('active');
    });



    $("#roll-dice").click(function () {
        startGame();
    });


    $(".toggle-bg").click(function () {
        start();
        getAllLogs();
    });

    $('#your-balance').click(function () {
        betEth = $(this).val();
        Refresh();
    });

    $('input#amount-one').keypress(function (e) {
        if (e.which == 13) {
            //Refresh();
            $(this).blur();
        }
    });

    $('input#amount-one').keypress(function (e) {
        //Refresh();
        if (!(e.which == 8 || e.which == 44 || e.which == 45 || e.which == 46 || (e.which > 47 && e.which < 58))) return false;
    });

    $('input#less-than-wins').keypress(function (e) {
        if (e.which == 13) {
            Refresh();
            $(this).blur();
        }
    });

    $('input#less-than-wins').keypress(function (e) {
        Refresh();
        if (!(e.which == 8 || (e.which > 47 && e.which < 58))) return false;

    });

    $('input#less-than-wins').on('input keyup change', function () {
 
        var value = this.value;
        Refresh();
        if (value < 1 || value > 64224)
            this.value = value.slice(0, -1);

        else {Refresh(); console.log("aa");}

    });

    $('input#amount-one').change( function () {
        var value = this.value;
        //Refresh();
        if (value < 0.001 || value > maxBetEth){
            this.value = value.slice(0, -1);
        } else {
            betEth = +value;
            Refresh();
        }
    });

    /* SLIDER UI */
    $('#less-than-wins').change(function () {
        var value = $("#less-than-wins").val();
        if (value > 64224) {
            value = 64224;
        };
        if (value < 1) {
            value = 1;
        };
        $("#less-than-wins").val(value);
        $("#slider-dice-two").slider("value", value);
        $("#amount-two").val((value / 65536 * 100).toFixed(2) + "%");
        chance = +value;
        Refresh();
    });

    $('#amount-one').change(function () {
        var value = $("#amount-one").val();

        if (value > maxBetEth) {
            value  = maxBetEth;
            betEth = value;
        };

        if (value < 0.001) {
            value  = 0.001;
            betEth = 0.001;
        };
       
        $("#amount-one").val(value);
        $("#slider-dice-one").slider("value", value * 1000);
       
        betEth = +value;
        //Refresh();
    });

    $("#slider-dice-two").slider({
        range: "min",
        value: 32768,
        min:   1,
        max:   64224,
        slide: function (event, ui) {
            chance = ui.value;
            $("#amount-two").val((ui.value / 65536 * 100).toFixed(2) + "%");
            $("#less-than-wins").val(ui.value);
            Refresh();
        }
    });
    
    $("#amount-two").val(($("#slider-dice-two").slider("value") / 65536 * 100).toFixed(2) + "%");
    $("#amount-one").val($("#slider-dice-one").slider("value") / 1000);
    
    Refresh();

});