<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Advanced Custom Fields functions 
require_once('acf.php');


// Admin functions
require_once('admin.php');


// Blocks
require_once('blocks.php');


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
