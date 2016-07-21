
/* NAVBAR EFFECT -------------------------------------------------------------------- */

	function getScrollTop() {
		browserSupportsBoxModel = '';
		return window.pageYOffset || (browserSupportsBoxModel && document.documentElement.scrollTop) || document.body.scrollTop;
	}
	$(window).scroll(function() {
		positionTop = parseInt(getScrollTop(), 10);
		if(positionTop<=200){
			$('nav', document.body).removeClass('nav-fixed');
			$('.top-button', document.body).removeClass('show');
		}else{
			$('nav', document.body).addClass('nav-fixed');
			$('.top-button', document.body).addClass('show');
		}
		positionTop<=406 ? $('#breadcrumbs').removeClass('breadcrumbs-fixed') : $('#breadcrumbs').addClass('breadcrumbs-fixed') ;
	});


/* MENU INIZIALIZE ------------------------------------------------------------------- */
	$('.menu-nav', document.body).menuResponsive();


/* CAROUSEL FEEDBACK ----------------------------------------------------------------- */
	$('#carousel-feedback', document.body).carousel({
		interval: 100000
	});


/* SPINNER  -------------------------------------------------------------------------- */
	$(function() {
		$("#adults", document.body).spinner({
			min: 1,
			max: 20
		});
		$("#children", document.body).spinner({
			min: 0,
			max: 20
		});
	});


/* SLIDER  --------------------------------------------------------------------------- */
	$(document).ready(function(){

		var mainslider;
		var sliding = false;

		var options = {
			slides: '.slide',                 /* The name of a slide in the slidesContainer */
			swipe: false,                     /* Add possibility to Swipe > note that you have to include touchSwipe for this */
			transition: "slide",              /* Accepts "slide" and "fade" for a slide or fade transition */
			slideTracker: true,               /* Add a UL with list items to track the current slide */
			slideTrackerID: 'slideposition',  /* The name of the UL that tracks the slides */
			slideOnInterval: false,           /* Slide on interval */
			interval: 9000,                   /* Interval to slide on if slideOnInterval is enabled */
			animateDuration: 1000,            /* Duration of an animation */
			pauseOnHover: false,              /* Pause when user hovers the slide container */
			magneticSwipe: true,              /* This will attach the slides to the mouse's position when swiping/dragging */
			neverEnding: true,                /* Enable this to create a 'neverending' effect. */
			animationEasing: 'easeInOutCubic' /* Accepts: linear ease in out in-out snap easeOutCubic easeInOutCubic easeInCirc easeOutCirc easeInOutCirc easeInExpo easeOutExpo */
			                                  /* easeInOutExpo easeInQuad easeOutQuad easeInOutQuad easeInQuart easeOutQuart easeInOutQuart easeInQuint easeOutQuint easeInOutQuint */
											  /* easeInSine easeOutSine easeInOutSine easeInBack easeOutBack easeInOutBack */
		};

		$(".slider", document.body).simpleSlider(options);
		mainslider = $(".slider").data("simpleslider");

		function setSlidePosition() {
			transition: "slide";
			animateDuration: 500;
			slideTracker = $("#" + options.slideTrackerID);
			slidePositionWidth = parseInt(slideTracker.css( 'width' ), 10);
			documentWidth = parseInt($(document).width(), 10);
			slidePosition = (documentWidth/2)-(slidePositionWidth/2);
			slideTracker.css({ 'left': slidePosition+'px', 'top': parseInt(($(options.slides).height())-70, 10)+'px' });
		}

		setSlidePosition();
		$(window).resize(function(){
			setSlidePosition();
			return false;
		});

		$(".slide#img1", document.body).backstretch("images/front_img.jpg");
		$(".slide#img2", document.body).backstretch("images/front_img2.jpg");
		$(".slide#img3", document.body).backstretch("images/front_img3.jpg");
		$(".slide#img4", document.body).backstretch("images/front_img4.jpg");

		$('.slide .backstretch img', document.body).on('dragstart', function(event) { event.preventDefault(); });

		$(".slidecontent", document.body).each(function(){
			$(this).css('margin-top', -$(this).height()/2);
		});

	});


/* SCROLL TOP  ----------------------------------------------------------------------- */
	$('#menu-nav', document.body).scrollTopAll({
		speed: 1400,
		easing: 'easeInOutQuart'
	});


/* ANIMATE EFFECT  ------------------------------------------------------------------- */
	new WOW().init();


/* GRID A LICIOUS  ------------------------------------------------------------------- */
	$("#article-list", document.body).gridalicious({
		gutter: 1,
		width: 333
	});


/* BUTTON SCROLL TOP  ---------------------------------------------------------------- */
	$(".top-button", document.body).on('click', function(){
		$('html, body').animate({ 
				scrollTop: 0
		}, 1400, 'easeInOutQuart');
		return false;
	});


/* DTPICKER  ------------------------------------------------------------------------- */
	$(function(){

		$('.dtpicker', document.body).appendDtpicker({
			"dateOnly": true,
			"dateFormat": "MM/DD/YYYY",
			"autodateOnStart": true,
			"closeOnSelected": true,
			"todayButton": false,
			"futureOnly": true
		});

		function getdate(dateStart, dayStart) {

			date    = new Date(dateStart);
			newdate = new Date(date);

			dayStart=='-' ? newdate.setDate(newdate.getDate() - 1) 
						  : newdate.setDate(newdate.getDate() + 1) ;

			newdate.getDate() <= 9 ? dd = '0'+newdate.getDate() : dd = newdate.getDate() ; 
			newdate.getMonth()+1 <= 9 ? mm = '0'+(newdate.getMonth()+1) : mm = newdate.getMonth()+1 ; 
			y = newdate.getFullYear();

			someFormattedDate = mm + '/' + dd + '/' + y;
			return someFormattedDate;
		}

		$fromField = $('input#from', document.body);
		$fromTo = $('input#to', document.body);
		$send = $('#send-reservation', document.body);

		$fromField.on('change', function(){

			// data from
			dataFromFormatted = this.value;
			dataFrom = dataFromFormatted.split('/');
			var from = new Date(dataFrom[2], dataFrom[0]-1, dataFrom[1], 0,0,0,0);

			// data to
			dataTo = $fromTo.val();
			dataTo = dataTo.split('/');
			var to = new Date(dataTo[2], dataTo[0]-1, dataTo[1], 0,0,0,0);

			if(to <= from){
				$fromTo.handleDtpicker('setDate', getdate(dataFromFormatted, '+'));
			}

		});

		$fromTo.on('change', function(){

			// data from
			dataFromFormatted = $fromField.val();
			dataFrom = dataFromFormatted.split('/');
			var from = new Date(dataFrom[2], dataFrom[0]-1, dataFrom[1], 0,0,0,0);

			// data to
			dataTo = this.value;
			dataTo = dataTo.split('/');
			var to = new Date(dataTo[2], dataTo[0]-1, dataTo[1], 0,0,0,0);

			if(from >= to){
				$fromTo.handleDtpicker('setDate', getdate(dataFromFormatted, '+'));
			}

		});

		//Set today Date
		today = new Date();
		today.getDate() <= 9 ? todayDate = '0'+today.getDate() 
							 : todayDate = today.getDate() ;
		today.getMonth()+1 <= 9 ? todayMonth = '0'+(today.getMonth()+1) 
							  : todayMonth = today.getMonth()+1 ;
		todayYear  = today.getFullYear();

		$fromField.val(todayMonth+'/'+todayDate+'/'+todayYear);
		$fromTo.val(getdate(today,'+'));

	});