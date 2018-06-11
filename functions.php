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
}

function add_child_theme_textdomain() {
    load_child_theme_textdomain( 'understrap-child', get_stylesheet_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'add_child_theme_textdomain' );


/**
 * Load Advanced Custom Fields options page.
 */
if(function_exists('acf_add_options_page')) { 
	acf_add_options_page();
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
 * Allow a draft page to be set as a parent
 */
function understrap_attributes_dropdown_pages_args($dropdown_args) {
  $dropdown_args['post_status'] = array('publish','draft');
  return $dropdown_args;
}
add_filter('page_attributes_dropdown_pages_args', 'understrap_attributes_dropdown_pages_args', 1, 1);


/**
 * Remove anchor from "Read more" link
 */
function understrap_remove_more_link_scroll( $link ) {
	$link = preg_replace( '|#more-[0-9]+|', '', $link );
	return $link;
}
add_filter( 'the_content_more_link', 'understrap_remove_more_link_scroll' );


/**
 * Prevent Yoast SEO from adding "Make Primary" to all categories
 */
add_filter( 'wpseo_primary_term_taxonomies', '__return_false' );


function foobar_func( $atts ){
	return "foo and bar";
}
//add_shortcode( 'foobar', 'foobar_func' );


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