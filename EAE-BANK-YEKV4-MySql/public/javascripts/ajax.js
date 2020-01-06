$(function(){   
    //parayatır 
    $('#para').submit( function(event) { //submit(fonk)=on("submit",fonk)
        event.preventDefault();

        var miktar = $('#miktar');

        $.ajax({
            url: '/para/paraYukle',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ miktar: miktar.val() }),
            success: function(response) {
                console.log(response);                
            }
        });
    });
    //paracek
    $('#para1').on('submit', function(event) {
        event.preventDefault();

        var miktar = $('#miktar1');

        $.ajax({
            url: '/para/paraCek',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ miktar: miktar.val() }),
            success: function(response) {
                console.log(response);
            }
        });
    });
    //ürünsat
    $('#sut').on('submit', function(event) {
        event.preventDefault();

        var islem = $('#sut1');

        $.ajax({
            url: '/sat',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ islem: islem.val() }),
            success: function(response) {
                console.log(response);
            }
        });
    });
    $('#yımırta').on('submit', function(event) {
        event.preventDefault();

        var islem = $('#yımırta1');

        $.ajax({
            url: '/sat',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ islem: islem.val() }),
            success: function(response) {
                console.log(response);
            }
        });
    });
    $('#bal').on('submit', function(event) {
        event.preventDefault();

        var islem = $('#bal1');

        $.ajax({
            url: '/sat',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ islem: islem.val() }),
            success: function(response) {
                console.log(response);
            }
        });
    });
        //hayvanal
        $('#inek').on('submit', function(event) {
            event.preventDefault();
    
            var islem = $('#inek1');
    
            $.ajax({
                url: '/satinAl',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ islem: islem.val() }),
                success: function(response) {
                    console.log(response);
                }
            });
        });
        $('#tavık').on('submit', function(event) {
            event.preventDefault();
    
            var islem = $('#tavık1');
    
            $.ajax({
                url: '/satinAl',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ islem: islem.val() }),
                success: function(response) {
                    console.log(response);
                }
            });
        });
        $('#arı').on('submit', function(event) {
            event.preventDefault();
    
            var islem = $('#arı1');
    
            $.ajax({
                url: '/satinAl',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ islem: islem.val() }),
                success: function(response) {
                    console.log(response);
                }
            });
        });
        $('#yem').on('submit', function(event) {
            event.preventDefault();
    
            var islem = $('#yem1');
    
            $.ajax({
                url: '/satinAl',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ islem: islem.val() }),
                success: function(response) {
                    console.log(response);
                }
            });
        });

});