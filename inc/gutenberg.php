<?php

// Remove core block patterns
//remove_theme_support( 'core-block-patterns' );

/*
 * Blacklist specific Gutenberg blocks
 */
add_filter( 'allowed_block_types_all', 'blacklist_blocks' );
 
function blacklist_blocks( $allowed_blocks ) {
	// Get all the registered blocks
	$blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

	// Text
  unset( $blocks[ 'core/freeform' ] );              // Classic
  unset( $blocks[ 'core/code' ] );                  // Code
	//unset( $blocks[ 'core/heading' ] );               // Heading
  //unset( $blocks[ 'core/list' ] );                  // List
  //unset( $blocks[ 'core/list-item' ] );             // List Item
	//unset( $blocks[ 'core/paragraph' ] );             // Paragraph
  unset( $blocks[ 'core/preformatted' ] );          // Preformatted
  //unset( $blocks[ 'core/pullquote' ] );             // Pullquote
  unset( $blocks[ 'core/quote' ] );                 // Quote
  //unset( $blocks[ 'core/table' ] );                 // Table
  unset( $blocks[ 'core/verse' ] );                 // Verse

  // Media 
  //unset( $blocks[ 'core/image' ] );                 // Image
  //unset( $blocks[ 'core/gallery' ] );               // Gallery
  //unset( $blocks[ 'core/audio' ] );                 // Audio
  //unset( $blocks[ 'core/cover' ] );                 // Cover
  //unset( $blocks[ 'core/file' ] );                  // File
  //unset( $blocks[ 'core/media-text' ] );            // Media & Text
  //unset( $blocks[ 'core/video' ] );                 // Video

  // Design
  //unset( $blocks[ 'core/buttons' ] );               // Buttons
  //unset( $blocks[ 'core/columns' ] );               // Columns
  unset( $blocks[ 'core/group' ] );                 // Group
  unset( $blocks[ 'core/row' ] );                   // Row
  unset( $blocks[ 'core/stack' ] );                 // Stack
  unset( $blocks[ 'core/more' ] );                  // More
  unset( $blocks[ 'core/nextpage' ] );              // Page Break
  //unset( $blocks[ 'core/separator' ] );             // Separator
  unset( $blocks[ 'core/spacer' ] );                // Spacer

  // Widgets
  unset( $blocks[ 'core/archives' ] );              // Archives
  unset( $blocks[ 'core/calendar' ] );              // Calendar
  //unset( $blocks[ 'core/categories' ] );            // Categories
  unset( $blocks[ 'core/html' ] );                  // HTML
  unset( $blocks[ 'core/latest-comments' ] );       // Latest Comments
  //unset( $blocks[ 'core/latest-posts' ] );          // Latest Posts  
  unset( $blocks[ 'core/page-list' ] );             // Page List
  unset( $blocks[ 'core/rss' ] );                     // RSS
  unset( $blocks[ 'core/search' ] );                // Search
  //unset( $blocks[ 'core/shortcode' ] );             // Shortcode
  unset( $blocks[ 'core/social-links' ] );          // Social Links
  unset( $blocks[ 'core/tag-cloud' ] );             // Tag Cloud

  // Theme
  unset( $blocks[ 'core/query-title' ] );           // Archive Title
  unset( $blocks[ 'core/avatar' ] );                // Avatar 
  unset( $blocks[ 'core/comments' ] );              // Comments
  unset( $blocks[ 'core/comments-query-loop' ] );   // Comments Query Loop
  unset( $blocks[ 'core/loginout' ] );              // Login/out
  unset( $blocks[ 'core/navigation' ] );            // Navigation
  unset( $blocks[ 'core/post-author' ] );           // Post Author
  //unset( $blocks[ 'core/post-author-biography' ] ); // Post Author Biography
  unset( $blocks[ 'core/post-author-name' ] );      // Post Author Name
  unset( $blocks[ 'core/post-comments-form' ] );    // Post Comments Form
  unset( $blocks[ 'core/post-content' ] );          // Post Content
  unset( $blocks[ 'core/post-date' ] );             // Post Date
  unset( $blocks[ 'core/post-excerpt' ] );          // Post Excerpt
  //unset( $blocks[ 'core/post-featured-image' ] );   // Post Featured Image
  unset( $blocks[ 'core/post-navigation-link' ] );  // Post Navigation Link
  unset( $blocks[ 'core/post-terms' ] );            // Post Terms
  unset( $blocks[ 'core/post-title' ] );            // Post Title
  unset( $blocks[ 'core/posts-list' ] );            // Posts List
  unset( $blocks[ 'core/query' ] );                 // Query Loop
  unset( $blocks[ 'core/read-more' ] );             // Read More
  unset( $blocks[ 'core/site-logo' ] );             // Site Logo
  unset( $blocks[ 'core/site-tagline' ] );          // Site Tagline
  unset( $blocks[ 'core/site-title' ] );            // Site Title
  unset( $blocks[ 'core/term-description' ] );      // Term Description

	// Return the new list of allowed blocks
	return array_keys( $blocks );
	
}


/*
 * Whitelist embed blocks
 */
function wpb_embedblock() {
  wp_enqueue_script(
      'deny-list-blocks',
      get_stylesheet_directory_uri() . '/src/js/blockembed.js',
      array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' )
  );
}
add_action( 'enqueue_block_editor_assets', 'wpb_embedblock' );


/**
 * Register ACF Blocks￼
 */
// add_action( 'init', 'register_acf_blocks' );
// function register_acf_blocks() {
//     register_block_type( get_stylesheet_directory_uri() . '/blocks/testimonial' );
// }
//echo get_stylesheet_directory_uri() . '/blocks/testimonial';