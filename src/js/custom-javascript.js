// Custom JavaScript
jQuery(document).ready(function($) {
	
	$('.answer.collapse').on('shown.bs.collapse', function(e) {
		
		var $fixed_offset = 110;
		var $fixed_offset = 0;
		if ( Modernizr.mq('(max-width: 1024px)')) {
			console.log( '1024' );
			$fixed_offset = 110;
		}
		if ( Modernizr.mq('(max-width: 768px)')) {
			console.log( '768' );
			$fixed_offset = 110;
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