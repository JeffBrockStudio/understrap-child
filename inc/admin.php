<?php
/**
 * Hide Order field in admin sidebar.
 */
function hide_order_attribution() {
	echo '<style>
	     label[for="menu_order"],
	     input[name="menu_order"],
	     #pageparentdiv .inside p:last-of-type {
	       display:none;
	     }
	    </style>';
} 
add_action('admin_head', 'hide_order_attribution');


/**
 * Add or change content in the Featured Image Meta Box.
 */
function add_featured_image_instruction( $content ) {
    return $content .= '<p class="howto">Text here.</p>';
}
//add_filter( 'admin_post_thumbnail_html', 'add_featured_image_instruction');


/**
 * Remove support for post formats.
 */
function remove_featured_images_from_child_theme() {
	remove_theme_support( 'post-formats' );
} 
add_action( 'after_setup_theme', 'remove_featured_images_from_child_theme', 11 ); 


/*
add_action( 'after_setup_theme', 'mytheme_theme_setup' );

if ( ! function_exists( 'mytheme_theme_setup' ) ) {
    function mytheme_theme_setup() {

        add_action( 'init', 'mytheme_buttons' );

    }
}
*/


/**
 * Prevent Yoast SEO from adding "Make Primary" to all categories.
 */
add_filter( 'wpseo_primary_term_taxonomies', '__return_false' );


/**
 * Move Yoast SEO to bottom of edit screen.
 */
function yoasttobottom() {
	return 'low';
}
add_filter( 'wpseo_metabox_prio', 'yoasttobottom');


/**
 * Remove tag support from posts.
 */ 
function understrap_unregister_tags() {
    unregister_taxonomy_for_object_type('post_tag', 'post');
}
add_action('init', 'understrap_unregister_tags');


/**
 * Remove dashboard widgets 
 */
function remove_dashboard_meta() {
  remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
  remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' );
  remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
  remove_meta_box( 'dashboard_secondary', 'dashboard', 'normal' );
  remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
  remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );
  remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
  remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
  remove_meta_box( 'dashboard_activity', 'dashboard', 'normal');
}
add_action( 'admin_init', 'remove_dashboard_meta' );


/**
 * Disable auto update notification emails for core updates
 */  
function wpb_stop_update_emails( $send, $type, $core_update, $result ) {
  if ( ! empty( $type ) && $type == 'success' ) {
    return false;
  }
    return true;
  }
// add_filter( 'auto_core_update_send_email', 'wpb_stop_auto_update_emails', 10, 4 );


/**
 * Disable auto update notification emails for plugins
 */
// add_filter( 'auto_plugin_update_send_email', '__return_false' );


/**
 * Disable auto update notification emails for themes
 */
// add_filter( 'auto_theme_update_send_email', '__return_false' );