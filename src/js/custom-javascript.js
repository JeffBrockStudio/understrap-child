// Custom JavaScript
jQuery(document).ready(function($) {
	
	/**
	 * Search overlay
	 */
	$('li.search .nav-link').click(function(e) {
		e.preventDefault();
		if ( $('body').hasClass('search-open') ) {
			$('body').removeClass('search-open');						
			$('#wrapper-search').attr('aria-hidden', 'true');
			$('#wrapper-search').attr('role', '');
		} else {
			$('body').addClass('search-open');			
			$('#wrapper-search #s').focus();
			$('#wrapper-search').attr('aria-hidden', 'false');
			$('#wrapper-search').attr('role', 'search');
		}				
	});
	
	$('#wrapper-search .close').click(function() {
		$('body').removeClass('search-open');						
		$('#wrapper-search').attr('aria-hidden', 'true');
		$('#wrapper-search').attr('role', '');
	});
	
	
	/**
	 * Gridder for team page
	 */
	$('body.page-template-page-team-php .gridder-list').matchHeight({
		property: 'min-height',
		byRow: false	  
	});        	
	
	$('body.page-template-page-team-php .gridder').gridderExpander({
			scroll: true,
			scrollOffset: 140,
			scrollTo: "panel",                  // panel or listitem
			animationSpeed: 400,
			animationEasing: "easeInOutExpo",
			showNav: true,                      // Show Navigation
			nextText: "Next",                   // Next button text
			prevText: "Previous",               // Previous button text
			closeText: "",                 			// Close button text
			onStart: function(){
					//Gridder Inititialized
			},
			onContent: function(){
					//Gridder Content Loaded
			},
			onClosed: function(){
					//Gridder Closed
			}
	});
	
	
	/**
	 * Accordion
	 */
	$('.answer.collapse').on('shown.bs.collapse', function(e) {
		
		var $fixed_offset = 92;
		if ( Modernizr.mq('(max-width: 1024px)')) {
			$fixed_offset = 92;
		}
		if ( Modernizr.mq('(max-width: 768px)')) {
			$fixed_offset = 68;
		}
		
		var $card = $(this).parent();
		var $scroll_top = $card.offset().top - $fixed_offset;
		$('html,body').animate({
			scrollTop: $scroll_top
		}, 500)
		
	});	
		
});


jQuery(function($) {
	$(window).on('resize', function() {	  
/*
		if ( Modernizr.mq('(min-width: 768px)')) {
		}
*/
		
	}).trigger('resize');
});