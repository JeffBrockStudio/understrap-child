// Custom JavaScript
jQuery(document).ready(function($) {
	
	// Search button
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
	
	// Accordion
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