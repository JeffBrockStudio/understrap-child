<?php
function understrap_remove_scripts() {
    wp_dequeue_style( 'understrap-styles' );
    wp_deregister_style( 'understrap-styles' );

    wp_dequeue_script( 'understrap-scripts' );
    wp_deregister_script( 'understrap-scripts' );

    // Removes the parent themes stylesheet and scripts from inc/enqueue.php
}
add_action( 'wp_enqueue_scripts', 'understrap_remove_scripts', 20 );

add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {

	// Get the theme data
	$the_theme = wp_get_theme();
    wp_enqueue_style( 'child-understrap-styles', get_stylesheet_directory_uri() . '/css/child-theme.min.css', array(), $the_theme->get( 'Version' ) );
    wp_enqueue_script( 'jquery');
	wp_enqueue_script( 'popper-scripts', get_template_directory_uri() . '/js/popper.min.js', array(), false);
    wp_enqueue_script( 'child-understrap-scripts', get_stylesheet_directory_uri() . '/js/child-theme.min.js', array(), $the_theme->get( 'Version' ), true );
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }

    // Add Google Fonts
    wp_enqueue_style( 'child-understrap-google-fonts', 'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,400,700,300', false ); 
    
}

function add_child_theme_textdomain() {
    load_child_theme_textdomain( 'understrap-child', get_stylesheet_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'add_child_theme_textdomain' );


/**
 * Load Advanced Custom Fields options page.
 */
if( current_user_can('manage_options') AND function_exists('acf_add_options_page') ) {

	acf_add_options_page(array(
		'page_title'  => 'Global Settings',
		'menu_title'  => 'Global Settings',
		'menu_slug'   => 'theme-general-options',
		'capability'  => 'edit_posts',
		'redirect'    => true,
		'icon_url'	  => 'dashicons-admin-site',
		'position'    => 58 // End of the menu, before the separator at 59
	));

	acf_add_options_sub_page(array(
		'page_title'  => 'Social Media',
		'menu_title'  => 'Social',
		'parent_slug' => 'theme-general-options',
	));

	acf_add_options_sub_page(array(
		'page_title'  => 'Header',
		'menu_title'  => 'Header',
		'parent_slug' => 'theme-general-options',
	));

	acf_add_options_sub_page(array(
		'page_title'  => 'Footer',
		'menu_title'  => 'Footer',
		'parent_slug' => 'theme-general-options',
	));

	acf_add_options_sub_page(array(
		'page_title'  => 'External Scripts',
		'menu_title'  => 'External Scripts',
		'parent_slug' => 'theme-general-options',
	));
	
}


/**
 * Add custom CSS/JS for Advanced Custom Fields.
 */
function understrap_acf_admin_head() {
	?>
	<style type="text/css">
		.acf-editor-wrap iframe {
		    max-height: 120px;
		}
		.short .acf-editor-wrap iframe {
		    max-height: 120px;
		    min-height: 0;
		}		
		[data-toolbar="very_simple"] .mce-menubar {
			display: none;
		}
		[data-toolbar="very_simple"] .mce-edit-area {
			padding: 10px !important;
		}
	</style>

	<script type="text/javascript">
	(function($){

		/* ... */

	})(jQuery);
	</script>
	<?php
}
add_action('acf/input/admin_head', 'understrap_acf_admin_head');


/**
 * Edits toolbars for WYSIWYG fields in Advanced Custom Fields.
 */
function understrap_toolbars( $toolbars ) {

	// Add a new toolbar called "Very Simple"
	$toolbars['Very Simple' ] = array();
	$toolbars['Very Simple' ][1] = array('bold' , 'italic' , 'link', 'unlink' );
 
	// Edit the "Basic" toolbar
	if( ($key = array_search('underline', $toolbars['Basic'][1])) !== false ) {
	    unset( $toolbars['Basic'][1][$key] );
	}
	if( ($key = array_search('blockquote', $toolbars['Basic'][1])) !== false ) {
	    unset( $toolbars['Basic'][1][$key] );
	}
	if( ($key = array_search('strikethrough', $toolbars['Basic'][1])) !== false ) {
	    unset( $toolbars['Basic'][1][$key] );
	}
	if( ($key = array_search('alignright', $toolbars['Basic'][1])) !== false ) {
	    unset( $toolbars['Basic'][1][$key] );
	}
	if( ($key = array_search('fullscreen', $toolbars['Basic'][1])) !== false ) {
	    unset( $toolbars['Basic'][1][$key] );
	}
 
	return $toolbars;
}
add_filter( 'acf/fields/wysiwyg/toolbars' , 'understrap_toolbars'  );


/**
 * Filter media library by PDF
 */
function understrap_modify_post_mime_types( $post_mime_types ) {
    $post_mime_types['application/pdf'] = array( __( 'PDFs' ), __( 'Manage PDFs' ), _n_noop( 'PDF <span class="count">(%s)</span>', 'PDFs <span class="count">(%s)</span>' ) );
    return $post_mime_types; 
}
add_filter( 'post_mime_types', 'understrap_modify_post_mime_types' );


/**
 * Add Support for SVGs
 */
function understrap_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'understrap_mime_types');


/**
 * Convert text to a slug
 */
function slugify($text) {
  // replace non letter or digits by -
  $text = preg_replace('~[^\pL\d]+~u', '-', $text);

  // transliterate
  $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

  // remove unwanted characters
  $text = preg_replace('~[^-\w]+~', '', $text);

  // trim
  $text = trim($text, '-');

  // remove duplicate -
  $text = preg_replace('~-+~', '-', $text);

  // lowercase
  $text = strtolower($text);

  if (empty($text)) {
    return 'n-a';
  }

  return $text;
}