<?php if ( is_home()) {
	$post_id = get_option( 'page_for_posts' );
} else {
	$post_id = $post->ID;
}

// check if the flexible content field has rows of data
if( have_rows('blocks', $post_id) ):

     // loop through the rows of data
    while ( have_rows('blocks', $post_id) ) : the_row();
    
			// Set a unique block ID
			if ( get_sub_field( 'anchor_id' )):
				$block_id = get_sub_field( 'anchor_id' );
			else:
				$block_id = 'block-' . generateRandomString();
			endif;
		
	    $layout = get_row_layout();			
			include( 'blocks/' .$layout. '.php' );	

    endwhile;	
 endif;
?>