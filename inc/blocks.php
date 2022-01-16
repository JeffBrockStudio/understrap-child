<?php 
 // loop through the rows of data

$is_preview = FALSE;
while ( have_rows('blocks', $post->ID) ) : the_row();

	// Set a unique block ID
	if ( get_sub_field( 'anchor_id' )):
		$block_id = get_sub_field( 'anchor_id' );
	else:
		$block_id = 'block-' . generateRandomString();
	endif;

  $layout = get_row_layout();			
	include( 'blocks/' .$layout. '.php' );	

endwhile;	 
?>