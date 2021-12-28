<?php if ( is_home()) {
	$post_id = get_option( 'page_for_posts' );
} else {
	$post_id = $post->ID;
}

// check if the flexible content field has rows of data
if( have_rows('blocks', $post_id) ):

     // loop through the rows of data
    while ( have_rows('blocks', $post_id) ) : the_row();
    
			if ( get_sub_field( 'anchor_id' )):
				$block_id = get_sub_field( 'anchor_id' );
			else:
				$block_id = 'block-' . generateRandomString();
			endif;
		
	    $layout = get_row_layout();
	    switch ( $layout ) {

				// Accordion
		    case 'accordion':
					include( 'blocks/accordion.php' );		    	
		    	break;		    			    	
					
				// Blog
				case 'blog':
					include( 'blocks/blog.php' );		    	
					break;		    			    		
		    	
		    // Call-out Box
	    	case 'call_out_box':
					include( 'blocks/call-out-box.php' );
	    		break;
				
				// Cards
				case 'cards':
					include( 'blocks/cards.php' );	
					break;		  
					
				// Carousel
				case 'carousel':
					include( 'blocks/carousel.php' );	
					break;		    
					
				// Columns
				case 'columns':
					include( 'blocks/columns.php' );	
					break;		    
					
				// Embedded Video
		    case 'embedded_video':
					include( 'blocks/embedded-video.php' );		
		    	break;		    	
				
				// Flip Cards
				case 'flip_cards':
					include( 'blocks/flip-cards.php' );	
					break;	
					
				// Form
				case 'form':
					include( 'blocks/form.php' );	
					break;		
					
				// Hero
				case 'hero':   	
					include( 'blocks/hero.php' );		
					break;			
					
				// Hero
				case 'illustrated_sections':   	
					include( 'blocks/illustrated-sections.php' );		
					break;			
					
				// Job Listings
				case 'job_listings':   	
					include( 'blocks/job-listings.php' );		
					break;		
				
				// Locations
				case 'locations':   	
					include( 'blocks/locations.php' );		
					break;
							
				// Logos
				case 'logos':   	
					include( 'blocks/logos.php' );		
					break;
					
				// People
				case 'people':   	
					include( 'blocks/people.php' );		
					break;						
		    
				// Section Heading
				case 'section_heading':   	
					include( 'blocks/section-heading.php' );		
					break;	
						
		    // Statistics
	    	case 'statistics':   	
					include( 'blocks/statistics.php' );		
	    		break;		
					
				// Subnav
				case 'subnav':   	
					include( 'blocks/subnav.php' );		
					break;			    	
		    	
		    // Testimonials	
	    	case 'testimonials':
					include( 'blocks/testimonials.php' );	
	    		break;
					
				// Text with Image
		    case 'text_image':
					include( 'blocks/text-image.php' );	
		    	break;		    	
		    	
				// Vertical Tabs
				case 'vertical_tabs':
					include( 'blocks/vertical-tabs.php' );	
					break;		
					
				// WYSIWYG
				case 'wysiwyg':
					include( 'blocks/wysiwyg.php' );		
					break;
				
	    }

    endwhile;	
 endif;
?>