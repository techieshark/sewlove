/*---------------------------------------------------------------------------------
/*
/* Main JS
/*
-----------------------------------------------------------------------------------*/  

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	});


  	/*----------------------------------------------------*/
  	/* Flexslider
  	/*----------------------------------------------------*/
  	$(window).load(function() {

	  	$('#hero-slider').flexslider({
	   	namespace: "flex-",
	      controlsContainer: ".hero-container",
	      animation: 'fade',
	      controlNav: true,
	      directionNav: false,
	      smoothHeight: true,
	      slideshowSpeed: 7000,
	      animationSpeed: 600,
	      randomize: false,
	      before: function(slider){
			   $(slider).find(".animated").each(function(){
			   	$(this).removeAttr("class");
			  	});
			},
			start: function(slider){
			   $(slider).find(".flex-active-slide")
			           	.find("h1").addClass("animated fadeInDown show")
			           	.next().addClass("animated fadeInUp show");
			           		
			   $(window).trigger('resize');
			},
			after: function(slider){
			 	$(slider).find(".flex-active-slide")
			           	.find("h1").addClass("animated fadeInDown show")
			           	.next().addClass("animated fadeInUp show");
			}
	   });

	   $('#testimonial-slider').flexslider({
	   	namespace: "flex-",
	      controlsContainer: "",
	      animation: 'slide',
	      controlNav: true,
	      directionNav: false,
	      smoothHeight: true,
	      slideshowSpeed: 10000,
	      animationSpeed: 600,
	      randomize: false,
	   });

   });


   /*----------------------------------------------------*/
	/* Adjust Primary Navigation Background Opacity
	------------------------------------------------------*/
   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var header = $('#main-header');

	   if ((y > h + 30 ) && ($(window).outerWidth() > 768 ) ) {
	      header.addClass('opaque');	      
	   }
      else {
         if (y < h + 30) {
            header.removeClass('opaque');
         }
         else {
            header.addClass('opaque');
         }
      }

	});


   /*----------------------------------------------------*/
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------*/
	var sections = $("section"),
	navigation_links = $("#nav-wrap a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'

	});


   /*----------------------------------------------------*/
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#hero-slider h1').fitText(1, { minFontSize: '30px', maxFontSize: '64px' });

  	}, 100);


  	/*-----------------------------------------------------*/
  	/* Mobile Menu
   ------------------------------------------------------ */  
   var menu_icon = $("<span class='menu-icon'>Menu</span>");
  	var toggle_button = $("<a>", {                         
                        id: "toggle-btn", 
                        html : "",
                        title: "Menu",
                        href : "#" } 
                        );
  	var nav_wrap = $('nav#nav-wrap');
  	var nav = $("ul#nav");  
   
   /* if JS is enabled, remove the two a.mobile-btns 
  	and dynamically prepend a.toggle-btn to #nav-wrap */
  	nav_wrap.find('a.mobile-btn').remove(); 
  	toggle_button.append(menu_icon); 
   nav_wrap.prepend(toggle_button); 

  	toggle_button.on("click", function(e) {
   	e.preventDefault();
    	nav.slideToggle("fast");     
  	});

  	if (toggle_button.is(':visible')) nav.addClass('mobile');
  	$(window).resize(function() {
   	if (toggle_button.is(':visible')) nav.addClass('mobile');
    	else nav.removeClass('mobile');
  	});

  	$('ul#nav li a').on("click", function() {      
   	if (nav.hasClass('mobile')) nav.fadeOut('fast');      
  	});


  	/*----------------------------------------------------*/
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {

      e.preventDefault();

   	  var target = this.hash;
      smoothScroll(target);
  	});

    function smoothScroll(target) {
      var $target = $(target);
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
        }, 800, 'swing', function () {
         window.location.hash = target;
      });
    }


  

   /*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/

    /* fill the placeholder found in the specified container (e.g. #modal-01) */
    function fillPlaceholder (containerSelector) {
      var placeholder = document.querySelector(containerSelector + ' .placeholder');

      if (!placeholder) {
        console.log("Placeholder not found for " + containerSelector + ", skipping.");
        return;
      }
      if (placeholder.classList.contains('placeholder-filled')) {
        console.log('Placeholder previously filled; skipping');
        return;
      }

      var small = placeholder.querySelector('.img-small');
      var alt = small.getAttribute('alt');

      // 1: load small image and show it
      var img = new Image();
      img.src = small.src;
      img.onload = function () {
       small.classList.add('loaded');
      };

      // 2: load large image
      var imgLarge = new Image();
      imgLarge.src = placeholder.dataset.large;
      imgLarge.setAttribute('alt', alt);
      imgLarge.onload = function () {
        imgLarge.classList.add('loaded');
      };
      placeholder.appendChild(imgLarge);
      placeholder.classList.add('placeholder-filled');

    }


    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 300,
       showCloseBtn: false,
       mainClass: 'mfp-fade',
       callbacks: {
          beforeOpen: function() {
            var hash = this.items[this.index].hash;
            // console.log('preloading image for ' + hash);
            fillPlaceholder(hash);
          },
       }

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });

    $(document).on('click', '.popup-modal-contact', function (e) {
            e.preventDefault();
            $.magnificPopup.close();
            smoothScroll('#contact');

    });



  /*----------------------------------------------------*/
  /*
   * Lazy Line Painter - Draw Truck Illustration
  /*------------------------------------------------------ */

  /*
   * Generated using 'SVG to Lazy Line Converter'
   *
   * http://lazylinepainter.info
   * Copyright 2013, Cam O'Connell
   *
   */



var pathObj = {
    "truck": {
        "strokepath": [
            {
                "path": "m 12.902252,17.255633 18.622793,0 0,-4.35338 C 31.525045,11.209272 32.976172,10 34.427298,10 l 39.664128,0 c 1.692981,0 2.902253,1.451127 2.902253,2.902253 l 0,4.35338 30.231811,0 0,-4.35338 C 107.22549,11.209272 108.67662,10 110.12774,10 l 19.59021,0 c 0.96742,0 1.93484,0.241855 2.90225,0.48371 l 15.23684,6.771923 34.58518,0 c 1.20928,0 2.6604,0.725564 3.1441,1.934835 l 27.0877,49.822015 c 0,0.241854 0.48372,0.483709 0.72557,0.725564 l 12.33457,6.771924 c 1.20928,0.725564 1.93484,1.934836 1.93484,3.144109 l 0,32.8922 c 0,1.69298 -1.45112,2.90226 -2.90226,2.90226 l -16.44609,0 c -0.96742,9.19046 -8.70676,16.20424 -18.13909,16.20424 -9.43232,0 -17.17166,-7.25563 -18.13908,-16.20424 l -109.076358,0 c -0.967418,9.19046 -8.70676,16.20424 -18.139083,16.20424 -9.432323,0 -17.171666,-7.25563 -18.139083,-16.20424 l -13.785704,0 C 11.209271,115.44854 10,113.99741 10,112.54628 l 0,-92.388393 c 0,-1.692981 1.451125,-2.902254 2.902252,-2.902254 z m 60.221757,-3.627816 -37.971148,0 0,3.385962 37.971148,0 z m 57.803211,0.241854 c -0.24185,-0.241854 -0.96741,-0.241854 -1.20927,-0.241854 l -18.62279,0 0,3.385962 27.32956,0 z m -117.05755,7.01378 0,4.111524 170.74924,0 -2.17669,-4.111524 z m 152.85201,7.981196 -35.5526,0 0,83.197923 28.53883,0 6.77192,-22.492459 c 0,-0.483708 0.24185,-1.209272 0.24185,-1.451127 z m 41.11956,82.956073 15.95808,0 0,-31.924786 -12.33457,-6.771925 c -0.96741,-0.48371 -1.69298,-1.451127 -2.17669,-2.176691 l -22.73432,-42.082671 -16.20424,0 0,59.012483 c 0,0.725563 -0.24186,1.934835 -0.48371,2.660399 l -6.28822,21.283191 8.46491,0 c 0.96742,-9.19047 8.70676,-16.204248 18.13908,-16.204248 9.43233,0 17.17167,7.255638 18.13909,16.204248 m -18.13909,16.4461 c 7.98119,0 14.51127,-6.53007 14.51127,-14.51126 0,-7.9812 -6.53008,-14.51127 -14.51127,-14.51127 -7.9812,0 -14.51126,6.53007 -14.51126,14.51127 0.24186,7.98119 6.53006,14.51126 14.51126,14.51126 z m -145.354521,0 c 7.981196,0 14.511266,-6.53007 14.511266,-14.51126 0,-7.9812 -6.53007,-14.51127 -14.511266,-14.51127 -7.981196,0 -14.511267,6.53007 -14.511267,14.51127 0.241855,7.98119 6.771925,14.51126 14.511267,14.51126 z M 26.92981,111.82072 c 0.967419,-9.19047 8.706761,-16.204248 18.139084,-16.204248 9.432322,0 17.171664,7.255638 18.139083,16.204248 l 64.333283,0 0,-82.956073 -113.67159,0 0,83.197923 13.06014,0 z",
                "duration": 1800,
                // "strokeDash": "20, 3"
                "ease": "easeInOutExpo"
            },
            {
                "path": "m 158.74049,72.882155 -19.34837,0 c -1.69298,0 -2.90224,-1.451127 -2.90224,-2.902254 l 0,-32.408494 c 0,-1.692981 1.45112,-2.902253 2.90224,-2.902253 l 19.34837,0 c 1.69298,0 2.90224,1.451126 2.90224,2.902253 l 0,32.408494 c 0,1.692981 -1.20926,2.902254 -2.90224,2.902254 z m -0.96742,-34.585185 -17.65537,0 0,30.957367 17.65537,0 0,-30.957367 z",
                "duration": 600
            },
            {
                "path": "m 199.61389,72.882155 -22.25061,0 c -1.69298,0 -2.90226,-1.451127 -2.90226,-2.902254 l 0,-32.408494 c 0,-1.692981 1.45114,-2.902253 2.90226,-2.902253 l 3.86966,0 c 1.20928,0 2.6604,0.725562 3.14412,1.934835 l 17.41351,32.892203 c 0.48372,0.725564 0.48372,1.692981 0,2.660399 -0.4837,0.483708 -1.20926,0.725564 -2.17668,0.725564 z m -18.38095,-34.585185 -3.1441,0 0,30.957367 19.34835,0 -16.20425,-30.957367 z",
                "duration": 800
            },
            {
                "path": "m 159.70791,84.249314 -21.52505,0 c -0.96742,0 -1.93484,-0.967418 -1.93484,-1.934836 0,-0.967417 0.96742,-1.934835 1.93484,-1.934835 l 21.52505,0 c 0.96742,0 1.93482,0.967418 1.93482,1.934835 0,0.967418 -0.72556,1.934836 -1.93482,1.934836 z",
                "duration": 600
            },
            {
                "path": "m 159.70791,92.956073 -21.52505,0 c -0.96742,0 -1.93484,-0.967417 -1.93484,-1.934835 0,-0.967418 0.96742,-1.934835 1.93484,-1.934835 l 21.52505,0 c 0.96742,0 1.93482,0.967417 1.93482,1.934835 0,0.967418 -0.72556,1.934835 -1.93482,1.934835 z",
                "duration": 600
            },
            {
                "path": "m 185.4375,113.65279 c -0.14431,-1.53762 2.4359,-4.66537 4.75,-4.5 2.3141,0.16537 4.63925,2.39341 4.625,4.5 -0.0153,2.2539 -1.68685,4.8095 -4.8125,4.75 -4.05758,-0.0772 -4.57031,-4.69531 -4.57031,-4.69531",
                "duration": 600
            },
            {
                "path": "m 40.127057,113.65279 c -0.14431,-1.53762 2.4359,-4.66537 4.75,-4.5 2.3141,0.16537 4.63925,2.39341 4.625,4.5 -0.0153,2.2539 -1.68685,4.8095 -4.8125,4.75 -4.05758,-0.0772 -4.57031,-4.69531 -4.57031,-4.69531",
                "duration": 600
            },
            {
                "path": "m 48.659382,48.537201 2.905276,0 0,-2.732849 4.254051,0 0.03991,2.732849 2.638898,0 0,-2.732849 1.093157,0 0,2.732849 24.59563,0 0,-2.18628 1.093157,0 0,2.18628 6.558827,0 0,0.546571 0,0.54657 0,8.198548 -1.165835,8.198549 -5.666287,0 0,3.825987 -0.546567,0 0,-2.186279 -1.366429,0 0,-1.093139 1.366429,0 0,-0.546569 -6.212853,0 -1.093158,-7.651979 -9.910953,0 c -2.52351,0 -2.732835,0.775583 -2.732835,1.63971 l 0,10.931397 28.292641,0 1.749575,6.41509 0.01935,5.609449 -45.911881,0 0,-0.546572 0,-0.546569 0,-19.129946 -3.279426,0 0,-10.931398 3.279426,0 0,-3.27942 z m 6.586567,-2.319067 -2.748289,0 0.03991,2.319067 2.708262,0 z m -5.493433,5.598487 0,10.931398 0,12.852104 3.279425,0 0,1.206365 -3.279425,0 0,2.338628 2.186291,0 0,1.093139 -2.186291,0 0,1.63971 43.725589,0 0,-3.82599 -9.838251,0 0,-1.093138 9.668832,0 -1.3413,-4.919131 -35.65602,0 0,-1.093139 7.105418,0 0,-10.931397 c 0,-2.4224 2.04471,-2.732851 3.825967,-2.732851 l 9.843186,0 -0.0048,-3.825988 1.093134,0 0,4.333751 1.020456,7.144216 10.530221,0 1.020433,-7.144216 0,-8.15974 -35.527039,0 -2.732858,0 -2.732835,0 0,2.186279 z m -3.279402,1.093139 0,8.745118 2.186268,0 0,-8.745118 z",
                "duration": 1800,
                "strokeDash": null

            },
            {
                "path": "m 81.853327,60.146273 c 0.02912,1.04051 0.753877,1.738674 1.828321,1.848513 l 4.6e-5,0 C 84.818701,61.980996 85.502,61.00296 85.502,60.175297 c 0,-0.827663 -0.661249,-1.846959 -1.820306,-1.819511 -1.159057,0.02745 -1.830743,0.986323 -1.830743,1.825035",
                "duration": 600
            },
            {
                "path": "m 53.579768,64.504282 c 0.04551,1.626066 1.178129,2.717129 2.857226,2.888781 l 7.2e-5,0 c 1.776868,-0.02155 2.8447,-1.549985 2.8447,-2.843424 0,-1.293438 -1.033373,-2.886353 -2.8447,-2.843458 -1.811328,0.04289 -2.861011,1.541386 -2.861011,2.852091",
                "duration": 600
            },
            {
                "path": "m 8.870676,-95.678978 18.192448,0 0,2.136481 -18.192448,0 z",
                "duration": 600
            },
            {
                "path": "m 41.46301,62.879342 -11.951172,1.158203 12.017578,0.9375 0.0625,-0.830078 -0.128906,-1.265625 z",
                "duration": 600
            },
            {
                "path": "M 72.584283,44.777382 71.42608,32.82621 l -0.9375,12.017577 0.830078,0.0625 1.265625,-0.128906 z",
                "duration": 600
            },
            {
                "path": "m 97.522995,61.288352 11.951165,1.158203 -12.017571,0.9375 -0.0625,-0.830078 0.128906,-1.265625 z",
                "duration": 600
            },
            {
                "path": "m 72.584283,86.955115 -1.158203,11.951172 -0.9375,-12.017577 0.830078,-0.0625 1.265625,0.128906 z",
                "duration": 600
            }
        ],
        "dimensions": {
            "width": 238,
            "height": 142
        }
    }
};



  /* thx, http://jsfiddle.net/tovic/vVaat/light/ */
  function isScrolledIntoView(elem) {
    var $window = $(window),
        docViewTop = $window.scrollTop(),
        docViewBottom = docViewTop + $window.height(),
        elemTop = $(elem).offset().top,
        elemBottom = elemTop + $(elem).outerHeight();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  var paintedTruck = false;

  var paintTruck = function () {
    /* Setup and Paint lazyline */
    if (!paintedTruck) { /* only paint once */
      $('#sky').remove();
      $('#truck').lazylinepainter(
          {
            "svgData": pathObj,
            "strokeWidth": 1,
            "strokeColor": "#707273",
            "delay": 250,
          }).lazylinepainter('paint');
      paintedTruck = true;
    }
  };

  $(document).ready(function(){

    if (isScrolledIntoView('#road')) {
      paintTruck();
    }

    $(window).on("scroll", function() {
      if (isScrolledIntoView('#road')) {
        paintTruck();
      }
    });
  });


   /*----------------------------------------------------*/
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */  	 
	// $('input, textarea').placeholder()

   
	/*----------------------------------------------------*/
	/*	contact form
	------------------------------------------------------*/

	/* local validation */
	// $('#contactForm').validate({

	// 	/* submit via ajax */
	// 	submitHandler: function(form) {

	// 		var sLoader = $('#submit-loader');

	// 		$.ajax({

	// 	      type: "POST",
	// 	      url: "inc/sendEmail.php",
	// 	      data: $(form).serialize(),
	// 	      beforeSend: function() {

	// 	      	sLoader.fadeIn();

	// 	      },
	// 	      success: function(msg) {

	//             // Message was sent
	//             if (msg == 'OK') {
	//             	sLoader.fadeOut();
	//                $('#message-warning').hide();
	//                $('#contactForm').fadeOut();
	//                $('#message-success').fadeIn();
	//             }
	//             // There was an error
	//             else {
	//             	sLoader.fadeOut();
	//                $('#message-warning').html(msg);
	// 	            $('#message-warning').fadeIn();
	//             }

	// 	      },
	// 	      error: function() {

	// 	      	sLoader.fadeOut();
	// 	      	$('#message-warning').html("Something went wrong. Please try again.");
	// 	         $('#message-warning').fadeIn();

	// 	      }

	//       });
 //  		}

	// });
	

})(jQuery);