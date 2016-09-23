$(document).ready(function() {

	$('#modalReg').on('shown.bs.modal', function () {}); //bootstrap modal

	var urlMain = "http://smktesting.herokuapp.com/",
	token, id_product, urlForRev, urlForProd;
    token = 0;
	
	/*registration*/
    $('#regBtn').on('click', function(event) {
    	event.preventDefault();
        var newName = $("#newName").val();
        var newPass = $("#newPass").val();
        var registration = {
        	"username": newName,
	        "password": newPass
	    };
        var jsonStr;
	    jsonStr = JSON.stringify(registration);
		    var request = $.ajax({
            type: "POST",
            contentType: "application/json",
            url: urlMain + "api/register/",
            data: jsonStr,            
            dataType: "json",
            success: function (data) {
            	if (data.success === true) {
	                $("#modalReg").modal("hide");
	                $(".loginValidation").addClass('hidden');
	                $(".successSign").removeClass('hidden');
                } else {
                	$(".validRegistration").removeClass('hidden');
                }                          
            }              
        });
    });
	
	/*log in*/
    $('#logInBtn').on('click', function(event) {
        event.preventDefault();
        var name = $("#logName").val();
        var pass = $("#logPass").val();
        var enter = {
        	"username": name,
        	"password": pass
        };
		jsonStr = JSON.stringify(enter);
        var request = $.ajax ({
            type: "POST",
            contentType: "application/json",
            url: urlMain + "api/login/",
            data: jsonStr,            
            dataType: "json",
            success: function (data) {
            	if(data.success === true) {              
		            token = data.token;      
              		$("#registrationMenu").addClass('hidden');
                    $(".exit").removeClass('hidden');
                    $('.rev_error').addClass('hidden');
            	} else {
					$(".loginValidation").removeClass('hidden');
					$(".successSign").addClass('hidden');
				}              
        	}
   		});
	});

	$('#signUpBtn').click(function() { // hide loginValidation
		$('.loginValidation').addClass('hidden');
	});

	/*send reviews*/
	$('.btnReview').on('click', function(event) {
		if (token != 0) { 
	    $.ajax({
	            type: 'POST',
	            url: urlMain + 'api/reviews/' + id_product,
	            data: {
	                'rate': $(':radio[name=star]:checked').val(),
	                'text': $('#content').val()
	            },
	            headers: {
	                'Authorization': 'Token ' + token
	            },
	            dataType: 'json',
	            success: function () {
	                $('#content').val('');
	            }
	        })    
	  	} else {
	        $('.rev_error').removeClass('hidden');
	    }      
    });

	show_button_products();

	/*show products*/
	function show_button_products() {
	    $.getJSON(urlMain + 'api/products', function(data) {
		    for (var i in data) {            
		    	$("<span></span>")                                                                                                                                  
			        .addClass('product btn')               
			        .attr('id', data[i].id)
			        .appendTo($("#productList"));
			    $("<p></p>")
			        .text(data[i].title)
			        .appendTo($(".product")[i]);
		    	$("<img/>")
			        .attr('src', 'http://smktesting.herokuapp.com/static/' + data[i].img)
			        .addClass('img-responsive')
			        .appendTo($(".product")[i]);
		        $("<p></p>")
			        .text(data[i].text)
			        .appendTo($(".product")[i]);
		    }
		    var idThis;
		    $('.product').click(function() { //add reviews for id
		        idThis = this;
		        $("#reviewList li").detach();
		        $('.rev_error').addClass('hidden');
		        id_product = idThis.id;
		        urlForRev = urlMain + 'api/reviews/' + id_product;
		        $('#titleRew').removeClass('hidden');
		        $('.rateRew').removeClass('hidden');
		        show_reviews(urlForRev);       
		    })
	    });
	};

	/*show reviews*/
	function show_reviews() {
	    $.getJSON(urlForRev, function(data) {
	        for (var i in data) {
	        var date = data[i].created_at;
	        var newDate = moment.utc(date).format('LLL'); //moment.js - format date
	        date = newDate;
	           $("<li></li>")                                                                                                                                  
		            .addClass('productRew')               
		            .attr('id', data[i].id)
		            .appendTo($("#reviewList"));
	        	$("<p></p>")
		            .text('User: ' + data[i].created_by.username + ' at: ' + date)
		            .appendTo($("#reviewList li")[i]);
		        $("<p></p>")
		            .text('Rate: ' + data[i].rate)
		            .appendTo($("#reviewList li")[i]);
	            $("<p></p>")
		            .text('Description: ' + data[i].text)
		            .appendTo($("#reviewList li")[i]);
	        };
	    });
	} 
	
	$(".exit").click(function() { // reload page
	    window.location.reload();
	});
});

$(window).load(function() { // slow loading page
	$(".loader_inner").fadeOut(); 
	$(".loader").delay(400).fadeOut("slow"); 
});