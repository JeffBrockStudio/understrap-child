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
	$('.answer.collapse').on('shown.bs.collapse', function() {
		
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
	
	
	/**
	 * Team Members
	 */
	
	// Team Roles
	$('body.page-template-page-team-php a.team-role').click(function(event) {
		
		event.preventDefault();
		
		if ( $(this).hasClass( 'btn-primary' )) {
			$('a.team-role').removeClass( 'btn-outline-primary' ).addClass('btn-primary');
			$(this).removeClass( 'btn-primary' ).addClass( 'btn-outline-primary' );
		} else {
			$('a.team-role').removeClass( 'btn-primary' ).addClass('btn-outline-primary');
			$(this).removeClass( 'btn-outline-primary' ).addClass( 'btn-primary' );
		}
		
		var url = [location.protocol, '//', location.host, location.pathname].join('');	 
		
		var team_role = $(this).data('team-role');
		
		$('.pagination-row').remove();		
		$('#posts-ajax .resource').remove();
		$('.gridder-show').hide();			
		$('.spinner-row').addClass('visible');

		var href = url + '?team_roles=' + team_role;		    		    

		history.pushState(null, null, '?team_roles=' + team_role);
		
		$('#posts-ajax').load(href + ' #posts-ajax>*', function(){
			$('.spinner-row.visible').remove();
			
			// Call Gridder
			$('.gridder').gridderExpander({
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
			
		});		
	});
	
	
	/**
	 * Pretty Dropdown
	 */
	 
	$dropdown = $('select').prettyDropdown({
		classic: true,
		height: 44,
		width: '100%'
	});	
	
	
	/**
	 * Resources
	 */
	 
	// Functions 
	function hideElements() {
		$('.not-found').hide();
		$('.pagination-row').remove();		
		$('#posts-ajax .item').remove();
		$('.spinner-row').addClass('visible');
	}
	
	function loadAjax(href) {
		
		console.log( href );
		$('#posts-ajax').load(href + ' #posts-ajax>*', function(){
			$('.spinner-row.visible').remove();
		});		
		
	}
	
	function buildHref(thisObj) {
		
		var url = [location.protocol, '//', location.host, location.pathname].join('');	 
		var href = url + '?';		  
		var queryParams = new URLSearchParams(window.location.search);
		
		// Taxonomy filters
		var taxonomies = thisObj.data('taxonomies');
		$.each( taxonomies, function(index, element) {
			var filter = $('#select-' + element ).val();
			if ( filter ) {
				href = href + element + '=' + filter + '&';		
				queryParams.set( element, filter);
			} else {
				queryParams.delete( element );	
			}
		});
		
		// Search query
		var post_type = thisObj.data('post_type');		
		var search_query = encodeURIComponent($('#' + post_type + '-search-query').val());		
		if ( search_query ) {
			href = href + 'search=' + search_query;		    
			queryParams.set('search', search_query);
		} else {
			queryParams.delete('search');	
		}
		
		// Update querystrings
		history.pushState(null, null, '?'+queryParams.toString());		
		
		return href;
	}
	 
	// AJAX pagination 
	$('#posts-ajax').on('click', '#pagination-ajax', function(e){
		
		e.preventDefault();
		$('.pagination-row').remove();
		$('.spinner-row').addClass('visible');
		
		var existinghtml = $('#posts-ajax').html();
		$('#posts-ajax').load($(this).attr('href') + ' #posts-ajax>*', function(){
			$('#posts-ajax').prepend(existinghtml);
			$('.spinner-row.visible').remove();
		});
		
	}); 	
	
	// Filters
	$(document).on('change', '.filter select', function() {
			
		hideElements();				
		if ( $(this).hasClass( 'cleared' )) {
			// "Clear filters" forces a "change" state for Pretty Dropdown. 
			// Prevent unnecessary AJAX reloads with the "cleared" class.
			$(this).removeClass( 'cleared' );
		} else {	
			href = buildHref( $(this) );
			loadAjax(href);
		}
	
	});
	
	// Search
	$('.filters .filters-search-form').submit(function( event ) {
		event.preventDefault();	
	
		hideElements();		
		
		href = buildHref( $(this) );
		loadAjax(href);
	});		
	
	// Clear filters
	$('.clear-filters').click(function() {
	
		hideElements();
		
		var post_type = $(this).data('post_type');
		var search_placeholder = $(this).data('search_placeholder');		
				
		var url = [location.protocol, '//', location.host, location.pathname].join('');	 
		var href = url;
		var queryParams = new URLSearchParams(window.location.search);		    		    		
		
		var taxonomies = $(this).data('taxonomies');
		$.each( taxonomies, function(index, element) {
			queryParams.delete( element );	
		});
		queryParams.delete( 'search' );			
		history.pushState(null, null, '?'+queryParams.toString());
	
		$('.filter select').val('').attr('selected','selected').addClass('cleared').change();
		$dropdown.refresh();
		
		$('#' + post_type + '-search-query').val('').attr('placeholder', search_placeholder );					
		
		loadAjax(href);
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