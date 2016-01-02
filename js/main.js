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