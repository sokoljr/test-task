$(document).ready(function() {

	var jsonProductComments1;
	var jsonProductComments2;
	var jsonProductLogin;
	var jsonArrProducts;
	var urlMain = "http://smktesting.herokuapp.com/";
	
	function signUp() { // функция регистрации
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
	            	gsonProductComments3 = JSON.parse(request.responseText);
	            	if (data.success === true) {
		                alert("Successful registration! Now Log In"); 
		                $("#modalReg").modal("hide");
	                } else {
	                	$(".validRegistration").removeClass('hidden');
	                }                          
	            }              
	        });
	    });
	}
	signUp();
	
	function login() { //функция входа
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
	            	jsonProductLogin = JSON.parse(request.responseText);
	            	if(data.success === true) {             
	              		$("#registrationMenu").addClass('hidden');
	                    $('.new-review').removeClass('hidden');
	                    $("#title").html(jsonArrProducts[0].title);
	                    document.getElementById("idImg").src = "http://smktesting.herokuapp.com/static/" + jsonArrProducts[0].img;
	                    $("#description").html(jsonArrProducts[0].text);
	                    $(".itemView").removeClass('hidden');
	                    $(".exit").removeClass('hidden');
	                    createElements1();
	                    reviewForItem();
	            	} else {
						$(".loginValidation").removeClass('hidden');
					}              
	        	}
	   		});
		});
	}
	login();

	function reviewForItem() { // функция отправки коментариев
	    $('.btnReview').click(function() {
	        if ($('.products').text() === 'product1') {
		        $.ajax({
		            type: 'POST',
		            url: 'http://smktesting.herokuapp.com/api/reviews/1',
		            data: {
		                'rate': $(':radio[name=star]:checked').val(),
		                'text': $('#content').val()
		            },
		            headers: {
		                'Authorization': 'Token ' + jsonProductLogin.token
		            },
		            dataType: 'json',
		            success: function () {
		                $('#content').val('');
		            }
		        })
			} else {
				$.ajax({
		            type: 'POST',
		            url: 'http://smktesting.herokuapp.com/api/reviews/2',
		            data: {
		                'rate': $(':radio[name=star]:checked').val(),
		                'text': $('#content').val()
		            },
		            headers: {
		                'Authorization': 'Token ' + jsonProductLogin.token
		            },
		            dataType: 'json',
		            success: function () {
		                $('#content').val('');
		            }
		        });
			}
	    }); 
	}

	function getItem() { //функция получения элементов
		var requestItem = $.ajax({
	        type: "GET",
	        contentType: "application/json",
	        url: urlMain + "api/products/",           
	        dataType: "json",
	        success: function (data) {
	        	jsonArrProducts = JSON.parse(requestItem.responseText);
	        	for (var i = 0; i < jsonArrProducts.length; i++) {
	                $('#productFirst').on('click', function () {
                        $("#commentsReview").html("");
                        $("#title").html(jsonArrProducts[0].title);
                        document.getElementById("idImg").src = "http://smktesting.herokuapp.com/static/" + jsonArrProducts[0].img;
                        $("#description").html(jsonArrProducts[0].text);
                        createElements1();
                        $(".itemView").removeClass('hidden')
                    });
	                $('#productSecond').on('click', function () {
                        $("#commentsReview").html("");
                        $("#title").html(jsonArrProducts[1].title);
                        document.getElementById("idImg").src = "http://smktesting.herokuapp.com/static/" + jsonArrProducts[1].img;
                        $("#description").html(jsonArrProducts[1].text);
                        createElements2();
                        $(".itemView").removeClass('hidden')
                    });
		        }
			}
	    });
	};
	getItem();
	
	function getReviews() { // функция получения коментариев
		var getReviews1 = $.ajax({
			type: "GET",
		    contentType: "application/json",
		    url: urlMain + "api/reviews/1",           
		    dataType: "json",
		    success: function (data) {
		       	jsonProductComments1 = JSON.parse(getReviews1.responseText);
		    }
		});
		var getReviews2 = $.ajax({
			type: "GET",
		    contentType: "application/json",
		    url: urlMain + "api/reviews/2",           
		    dataType: "json",
		    success: function (data) {
		       	jsonProductComments2 = JSON.parse(getReviews2.responseText);
		    }
		});
	}
	getReviews();
	
	function createElements1() { // создание коментариев первого продукта
	    for (var i in jsonProductComments1) {
	    	$("<div></div>")
	    		.addClass("review")
	    		.attr('id', jsonProductComments1[i].id)
	    		.appendTo($(".comments"));
	    	$("<span></span>")
	    		.addClass('reviewRate')
	    		.html("Rate :" + jsonProductComments1[i].rate)
	    		.appendTo($(".review")[i]);
	    	$("<p></p>")
	    		.addClass('reviewComment')
	    		.html("Comment text :" + jsonProductComments1[i].text)
	    		.appendTo($(".review")[i]);
	   }
	}
	
	function createElements2() { // создание коментариев второго продукта
	    for (var i in jsonProductComments2) {
	    	$("<div></div>")
	    		.addClass("review")
	    		.attr('id', jsonProductComments2[i].id)
	    		.appendTo($(".comments"));
	    	$("<span></span>")
	    		.addClass('reviewRate')
	    		.html("Rate :" + jsonProductComments2[i].rate)
	    		.appendTo($(".review")[i]);
	    	$("<p></p>")
	    		.addClass('reviewComment')
	    		.html("Comment text :" + jsonProductComments2[i].text)
	    		.appendTo($(".review")[i]);
	   }
	}
	
	$(".exit").click(function() { //перезагрузка страницы при выходе
	    window.location.reload();
	});
});

$(window).load(function() { //загрузка медленная
	$(".loader_inner").fadeOut(); 
	$(".loader").delay(400).fadeOut("slow"); 
});