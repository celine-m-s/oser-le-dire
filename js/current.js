var fixed_menu = true;
window.jQuery = window.$ = jQuery;

//<![CDATA[
	jQuery(window).load(function(){
		"use strict";
		$("#status").fadeOut(); // will first fade out the loading animation
		$("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
	})
//]]>


/************** Custom Scripts ******************/

function calculateScroll() {
	"use strict";
	var contentTop      =   [];
	var contentBottom   =   [];
	var winTop      =   $(window).scrollTop();
	var rangeTop    =   200;
	var rangeBottom =   500;
	$('.navmenu li.scrollable').find('a').each(function(){
		contentTop.push( $( $(this).attr('href') ).offset().top );
		contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
	})
	$.each( contentTop, function(i){
		if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
			$('.navmenu li.scrollable')
			.removeClass('active')
			.eq(i).addClass('active');
			
			$('#top .navmenu li').first().addClass('active');
			jQuery('.mobile_menu_wrapper').css({'display' : 'none'});			
		}
	})
};

//menu logo center
function menu_update() {
	"use strict";
	var topHeader = $('#top header').innerHeight(); 
	$('.mobile_menu_wrapper').css({'top': topHeader + 'px'});
	
	if (jQuery(window).width() > 767) {
		jQuery('nav.navmenu li a').css({'line-height': jQuery('#logo').height() + 'px'});		
	} else {
		jQuery('nav.navmenu li a').css({'line-height': 'auto'});		
		
	}	
}

//full-width slider
function fullwidthslider() {
	"use strict";
	var full_slider_w = jQuery(window).width();
	if (jQuery(window).width() > 767) {
		var full_slider_h = jQuery(window).height();
	} 
	else {
		var full_slider_h = jQuery(window).width()*0.7;
	}
		
	jQuery('.full_slider .flexslider, .full_slider .flexslider li').css({'width': full_slider_w, 'height': full_slider_h});	
	jQuery('.full_slider, .full_slider .flexslider li img.slide_bg').attr('style', 'height: '+full_slider_h+'px');		
	jQuery('.full_slider').css({'min-height': full_slider_h + 'px'});
};

jQuery(document).ready(function() {
	"use strict";
	
	fullwidthslider();
	calculateScroll();
	
	
	//Fixed Menu
	if (jQuery('.fixed-menu').size() && fixed_menu == true) {		
		jQuery('.fixed-menu').append('<div class="fixed-menu-wrapper">'+jQuery('#top header').html()+'</div>');
		jQuery('.fixed-menu').find('.menu').children('li').each(function(){
			jQuery(this).children('a').append('<div class="menu_fadder"/>');
		});
		var fixd_menu = setInterval(scrolled_menu, 10);
		$('.fixed-menu .navmenu li').first().removeClass('active');
	}
		
	
	//MobileMenu
	jQuery('#top header').append('<a href="javascript:void(0)" class="menu_toggler"/>');
	jQuery('#top').append('<div class="mobile_menu_wrapper"><div class="mobile_menu container"/></div>');	
	jQuery('.mobile_menu').html(jQuery('#top header').find('.navmenu').html());
	jQuery('.mobile_menu_wrapper').hide();
	jQuery('.menu_toggler').click(function(){
		jQuery('.mobile_menu_wrapper').slideToggle(300);
	});
		
	$(window).scroll(function(event) {
		calculateScroll();
	});
	
	// link scroll
	$('.navmenu ul li.scrollable a, .mobile_menu ul li.scrollable a, .mouse, .next_section, #logo a, .go_section').click(function() {  	
		if (jQuery(window).width() < 767) {
			$('html, body').animate({scrollTop: $(this.hash).offset().top - jQuery('#logo').height() - 10}, 1000);
		} 
		else {
			$('html, body').animate({scrollTop: $(this.hash).offset().top - jQuery('#logo').height() - 40}, 1000);
		}
		return false;
	});
	
	$('ul.portfolio-menu').on('click', 'li:not(.active)', function() {  
		$(this).addClass('active').siblings().removeClass('active')
	});
	
	// contact form
	$("#ajax-contact-form").submit(function() {
		var str = $(this).serialize();		
		$.ajax({
			type: "POST",
			url: "contact_form/contact_process.php",
			data: str,
			success: function(msg) {
				// Message Sent - Show the 'Thank You' message and hide the form
				if(msg == 'OK') {
					var result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
					$("#fields").hide();
				} else {
					var result = msg;
				}
				$('#note').html(result);
			}
		});
		return false;
	});
	
	//Iframe transparent
	$("iframe").each(function(){
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});
	
	
	// prettyPhoto
	$("a[rel^='prettyPhoto'], .prettyPhoto").prettyPhoto();	
	$(".not_control").prettyPhoto({
		theme: 'pp_default',
		social_tools: '<div class="pp_social" style="display:none;"></div>'
	});
	
	$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});
	
	
	jQuery('.full_slider .flexslider li img.slide_bg').each(function(){
		jQuery(this).parent().attr('style', 'background-image:url('+$(this).attr('src')+');');		
	});
	
	jQuery('.flexslider').flexslider({
		animation: "fade",
		controlNav: true,
		directionNav: false,
		slideshowSpeed: 4000,
    	animationSpeed: 1400,
		pauseOnHover: false
    });
	
	menu_update();	
		
	// Counter
	if (jQuery('.counter_item').size() > 0) {
		if (jQuery(window).width() > 760) {						
			jQuery('.counter_item').each(function(){							
				if (jQuery(this).offset().top < jQuery(window).height()) {
					if (!jQuery(this).hasClass('done')) {
						var set_count = jQuery(this).find('.stat_count').attr('data-count');
						jQuery(this).find('.stat_temp').stop().animate({width: set_count}, {duration: 3000, step: function(now) {
								var data = Math.floor(now);
								jQuery(this).parents('.counter_wrapper').find('.stat_count').html(data);							
							}
						});	
						jQuery(this).addClass('done');
						jQuery(this).find('.stat_count');
					}							
				} else {
					jQuery(this).waypoint(function(){
						if (!jQuery(this).hasClass('done')) {
							var set_count = jQuery(this).find('.stat_count').attr('data-count');
							jQuery(this).find('.stat_temp').stop().animate({width: set_count}, {duration: 3000, step: function(now) {
									var data = Math.floor(now);
									jQuery(this).parents('.counter_wrapper').find('.stat_count').html(data);								
								}
							});	
							jQuery(this).addClass('done');
							jQuery(this).find('.stat_count');
						}
					},{offset: 'bottom-in-view'});								
				}														
			});
		} else {
			jQuery('.counter_item').each(function(){							
				var set_count = jQuery(this).find('.stat_count').attr('data-count');
				jQuery(this).find('.stat_temp').animate({width: set_count}, {duration: 3000, step: function(now) {
						var data = Math.floor(now);
						jQuery(this).parents('.counter_wrapper').find('.stat_count').html(data);					
					}
				});
				jQuery(this).find('.stat_count');
			},{offset: 'bottom-in-view'});	
		}
	};
});

jQuery(window).load(function(){
	"use strict";
	menu_update();
	fullwidthslider();

	// Parallax
	if (jQuery(window).width() > 1025 && jQuery('.parallax').size() > 0) {	
		var $window = jQuery(window);
		jQuery('.parallax').each(function(){
			var $bgobj = jQuery(this); // assigning the object
			jQuery(window).scroll(function() {                   
				var yPos = ($bgobj.offset().top-$window.scrollTop())/2;
				var coords = '50% '+ yPos + 'px';
				$bgobj.css({ 'background-position': coords });		
			});
		});
	}
});


jQuery(window).resize(function(){
	"use strict";
	menu_update();	
	fullwidthslider();
});

function scrolled_menu() {
	"use strict";
	if (jQuery(window).scrollTop() > (jQuery(window).height() - jQuery('#logo').height() - 45)) {
		jQuery('.fixed-menu').addClass('fixed_show');
	} else {
		jQuery('.fixed-menu').removeClass('fixed_show');
	}
};