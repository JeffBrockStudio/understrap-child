<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Advanced Custom Fields functions 
require_once('acf.php');


// Admin functions
require_once('admin.php');


// Custom post types
require_once('custom-post-types.php');


// Custom taxonomies
require_once('custom-taxonomies.php');


// Enqueue scripts and styles
require_once('enqueue-scripts-styles.php');


// Filters
require_once('filters.php');


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


// Admin Columns Pro local storage
add_filter( 'acp/storage/file/directory', function() {
		// Use a writable path, directory will be created for you
		return get_stylesheet_directory() . '/acp-settings';
} );