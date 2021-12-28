<?php
/**
 * Add custom image sizes.
 */
//add_image_size( 'large_square', 1400, 1400, true );


/**
 * Filter media library by PDF.
 */
function custom_modify_post_mime_types( $post_mime_types ) {
    $post_mime_types['application/pdf'] = array( __( 'PDFs' ), __( 'Manage PDFs' ), _n_noop( 'PDF <span class="count">(%s)</span>', 'PDFs <span class="count">(%s)</span>' ) );
    return $post_mime_types; 
}
add_filter( 'post_mime_types', 'custom_modify_post_mime_types' );


/**
 * Add support for SVGs.
 */
function custom_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'custom_mime_types');


/**
 * Automatically set upload title and image alt-text upon upload.
 */ 
function custom_attachment_meta_upon_upload( $post_ID ) {
	$attachment_title = get_post( $post_ID )->post_title;
	// Sanitize the title: remove hyphens, underscores & extra spaces
	$attachment_title = preg_replace( '%\s*[-_\s]+\s*%', ' ', $attachment_title );
	// Sanitize the title: capitalize first letter of every word:
	$attachment_title = ucwords( strtolower( $attachment_title ) );
	$attachment_meta = array(
		// Specify the image (ID) to be updated
		'ID' => $post_ID,
		// Set image Title to sanitized title
		'post_title' => $attachment_title,
	);

	// Check if uploaded file is an image, else do nothing
	if ( wp_attachment_is_image( $post_ID ) ) {
		// Set the image Alt-Text
		update_post_meta( $post_ID, '_wp_attachment_image_alt',
		$attachment_title );
	}
	
	// Set the attachment meta (e.g. Title, Excerpt, Content)
	wp_update_post( $attachment_meta );
	
}
add_action( 'add_attachment', 'custom_attachment_meta_upon_upload' );
	