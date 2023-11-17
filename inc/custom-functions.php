<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// add_action( 'init', 'register_acf_blocks' );
// function register_acf_blocks() {
//     register_block_type( __DIR__ . '/blocks/testimonial' );
// }

// Theme variables
require_once('theme_variables.php');


// Advanced Custom Fields functions 
require_once('acf.php');


// Admin functions
require_once('admin-tools.php');


// Custom post types
require_once('custom-post-types.php');


// Custom taxonomies
require_once('custom-taxonomies.php');


// Enqueue scripts and styles
require_once('enqueue-scripts-styles.php');


// Filters
require_once('filters.php');


// Gutenberg
require_once('gutenberg.php');


// Login
require_once('login.php');


// Media Library
require_once('media-library.php');


// Shortcodes
require_once('shortcodes.php');


// Text functions
require_once('text.php');


// TinyMCE functions
require_once('tinymce.php');


add_filter('wp_nav_menu_objects', 'my_wp_nav_menu_objects', 10, 2);

function my_wp_nav_menu_objects( $items, $args ) {

		foreach( $items as &$item ) {
			
				// vars
				$icon = get_field('menu_item_icon', $item);
				
				// append icon
				if( $icon ) {
						
					
						$item->title = ' <img src="'.$icon['url'].'">' . $item->title;
						
				}
				
		}		
		
		// return
		return $items;
		
}