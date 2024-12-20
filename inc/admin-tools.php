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
 * Move Yoast SEO to bottom of edit screen.
 */
function yoasttobottom() {
	return 'low';
}
add_filter( 'wpseo_metabox_prio', 'yoasttobottom');


/**
	* Remove Yoast Zapier notice
	*/
function webdezy_remove_yoast_zapier_free_publishbox_text() {
	if ( class_exists( 'Yoast\WP\SEO\Integrations\Third_Party\Zapier_Free' ) ) {
		$zapier_free = YoastSEO()->classes->get( Yoast\WP\SEO\Integrations\Third_Party\Zapier_Free::class );
		remove_action( 'wpseo_publishbox_misc_actions', [ $zapier_free, 'add_publishbox_text' ] );
	}
}
add_action( 'init', 'webdezy_remove_yoast_zapier_free_publishbox_text' );


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
add_filter( 'auto_core_update_send_email', 'wpb_stop_auto_update_emails', 10, 4 );


/**
 * Disable auto update notification emails for plugins
 */
add_filter( 'auto_plugin_update_send_email', '__return_false' );


/**
 * Disable auto update notification emails for themes
 */
add_filter( 'auto_theme_update_send_email', '__return_false' );


/**
 * Provide HTTP Basic Authentication credentials to SearchWP (and WP Cron).
 */
class MySearchWPBasicAuthCreds {
  private $username = ''; // HTTP Basic Auth username.
  private $password = ''; // HTTP Basic Auth password.

  function __construct() {
    // Provide HTTP Basic Authentication credentials to SearchWP.
    add_filter(
      'searchwp\background_process\http_basic_auth_credentials',
      function( $credentials ) {
        return [
          'username' => $this->username,
          'password' => $this->password,
        ];
      }
    );

    // Also provide HTTP Basic Authentication credentials to WP Cron.
    // This can be removed if handled elsewhere, otherwise *REQUIRED*
    add_filter( 'cron_request', function( $cron_request ) {
      if ( ! isset( $cron_request['args']['headers'] ) ) {
        $cron_request['args']['headers'] = [];
      }

      if ( isset( $cron_request['args']['headers']['Authorization'] ) ) {
        return $cron_request;
      }

      $cron_request['args']['headers']['Authorization'] = sprintf(
        'Basic %s',
        base64_encode( $this->username . ':' . $this->password )
      );
      
      return $cron_request;
    }, 999 );
  }
}
//new MySearchWPBasicAuthCreds();


/**
 * Remove SearchWP from top admin nav
 */
add_filter( 'searchwp_admin_bar', '__return_false' );


/**
 * Custom debug file
 */
function custom_debug( $debug_variable, $file, $line ) {
  $logfile = get_stylesheet_directory() . '/debug.log';
  date_default_timezone_set('America/Los_Angeles');
  $message = print_r( $debug_variable, TRUE ) . ' | ' . $file . ':' . $line . ' | ' . date( 'Y-m-d H:i:s' );
  error_log( $message."\n", 3, $logfile );  
}


/**
 * Admin Columns Pro local storage
 */
add_filter( 'acp/storage/file/directory', function() {
		// Use a writable path, directory will be created for you
		return get_stylesheet_directory() . '/acp-settings';
} );
