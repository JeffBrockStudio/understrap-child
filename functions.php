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
 * Register custom post types.
 */
function understrap_create_post_types() {
	register_post_type( 'item',
		array(
			'labels' => array(
				'name'               => __( 'Items' ),
				'singular_name'      => __( 'Item' ),
				'menu_name'          => __( 'Items' ),
				'name_admin_bar'     => __( 'Item' ),
				'add_new'            => __( 'Add New' ),
				'add_new_item'       => __( 'Add New Item' ),
				'new_item'           => __( 'New Item' ),
				'edit_item'          => __( 'Edit Item' ),
				'view_item'          => __( 'View Item' ),
				'all_items'          => __( 'All Items' ),
				'search_items'       => __( 'Search Items' ),
				'parent_item_colon'  => __( 'Parent Items:' ),
				'not_found'          => __( 'No items found.' ),
				'not_found_in_trash' => __( 'No items found in Trash.' )
			),
			'menu_icon' => 'dashicons-clipboard',			
			'public' => true,
			'hierarchical' => false,
			'supports' => array( 'title', 'editor', 'thumbnail' )
		)
	);
}
add_action( 'init', 'understrap_create_post_types' );


/**
 * Add custom taxonomies
 */
function understrap_add_custom_taxonomies() {
	
	register_taxonomy('taxonomy', 'custom_post_type_name', 
		array(
			'labels' => array(
				'name'                       => __( 'Items' ),
				'singular_name'              => __( 'Item' ),
				'menu_name'                  => __( 'Items' ),
				'all_items'                  => __( 'All Items' ),
				'parent_item'                => __( 'Parent Item' ),
				'parent_item_colon'          => __( 'Parent Item:' ),
				'new_item_name'              => __( 'New Item Name' ),
				'add_new_item'               => __( 'Add Item' ),
				'edit_item'                  => __( 'Edit Item' ),
				'update_item'                => __( 'Update Item' ),
				'view_item'                  => __( 'View Item' ),
				'separate_items_with_commas' => __( 'Separate items with commas' ),
				'add_or_remove_items'        => __( 'Add or remove items' ),
				'choose_from_most_used'      => __( 'Choose from the most used' ),
				'popular_items'              => __( 'Popular Items' ),
				'search_items'               => __( 'Search Items' ),
				'not_found'                  => __( 'Not Found' ),
				'no_terms'                   => __( 'No items' ),
				'items_list'                 => __( 'Items list' ),
				'items_list_navigation'      => __( 'Items list navigation' )
			),		
			'label' => __( 'Items' ),
			'hierarchical' => false
		)
	);
};
add_action( 'init', 'understrap_add_custom_taxonomies', 0 );



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
		    max-height: 400px;
		}
		.short .acf-editor-wrap iframe {
		    max-height: 200px;
		    min-height: 0;
		}
		
		/* "Very Simple" editor */		
		[data-toolbar="very_simple"] iframe {
			height: 150px !important;
		}		
		[data-toolbar="very_simple"] .mce-menubar,
		[data-toolbar="very_simple"] .mce-statusbar {
			display: none;
		}
		.very-simple > .acf-input {
			margin-top: -2rem;
		}
				
		/* Add border between repeater items */		
		.acf-repeater.-block .ui-sortable tr.acf-row td {
 			border-bottom: 4px solid #E1E1E1;
 			border-top: 4px solid #E1E1E1;
		}
		.acf-repeater.-block .ui-sortable tr.acf-row:nth-last-child(2) td {
			border-bottom: none;
		}
		.acf-repeater.-block .acf-row-handle .acf-icon {
			margin-top: -14px;
		}
		
		/* Hide unnecessary label in sidebar ACF */
		#side-sortables .acf-field-image .acf-label {
			display: none;
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
 * Edit toolbars for WYSIWYG fields in Advanced Custom Fields.
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
 * Omit heading sizes from TinyMCE paragraph dropdown.
 */
function omit_heading_sizes($args) {
	// Omit from list as needed
	$args['block_formats'] = 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Pre=pre';
	return $args;
}
add_filter('tiny_mce_before_init', 'omit_heading_sizes' );


/**
 * Add or change content in the Featured Image Meta Box.
 */
function add_featured_image_instruction( $content ) {
    return $content .= '<p class="howto">Text here.</p>';
}
//add_filter( 'admin_post_thumbnail_html', 'add_featured_image_instruction');


/**
 * Filter media library by PDF.
 */
function understrap_modify_post_mime_types( $post_mime_types ) {
    $post_mime_types['application/pdf'] = array( __( 'PDFs' ), __( 'Manage PDFs' ), _n_noop( 'PDF <span class="count">(%s)</span>', 'PDFs <span class="count">(%s)</span>' ) );
    return $post_mime_types; 
}
add_filter( 'post_mime_types', 'understrap_modify_post_mime_types' );


/**
 * Add support for SVGs.
 */
function understrap_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'understrap_mime_types');


/**
 * Convert text to a slug.
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


/**
 * Prevent Yoast SEO from adding "Make Primary" to all categories.
 */
add_filter( 'wpseo_primary_term_taxonomies', '__return_false' );


/**
 * Wrap video embeds in responsive div.
 */
function video_wrapper($content) {
  // match any iframes
  $pattern = '~<iframe.*</iframe>|<embed.*</embed>~';
  preg_match_all($pattern, $content, $matches);

  foreach ($matches[0] as $match) {
    // wrap matched iframe with div
    $wrappedframe = '<div class="video-container">' . $match . '</div>';

    //replace original iframe with new in content
    $content = str_replace($match, $wrappedframe, $content);
  }

  return $content;    
}
add_filter('the_content', 'video_wrapper');


/**
 * Add excerpt to custom post types.
 */
function add_excerpt_support_for_cpt() {
 add_post_type_support( 'project', 'excerpt' );
 add_post_type_support( 'resource', 'excerpt' );
}
add_action( 'init', 'add_excerpt_support_for_cpt' );


/**
 * Remove "Read More" button from excerpts.
 */
function understrap_all_excerpts_get_more_link( $post_excerpt ) {
	return $post_excerpt;
}
add_filter( 'wp_trim_excerpt', 'understrap_all_excerpts_get_more_link' );


/**
 * Remove tag support from posts.
 */ 
function understrap_unregister_tags() {
    unregister_taxonomy_for_object_type('post_tag', 'post');
}
add_action('init', 'understrap_unregister_tags');


/**
 * Automatically set upload title and image alt-text upon upload.
 */ 
function understrap_attachment_meta_upon_upload( $post_ID ) {
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
add_action( 'add_attachment', 'understrap_attachment_meta_upon_upload' );


/**
 * Custom login logo
 */
function understrap_login_logo() { ?>
  <style type="text/css">
    .login h1 a {
      background-image: url( <?php $image = get_field( 'login_logo', 'options' ); echo $image['url']; ?> );
      height: 84px;
      width: 100%;
      background-size: contain;
    }
  </style>
<?php }
add_action( 'login_head', 'understrap_login_logo' );

function understrap_login_logo_url() {
  return get_bloginfo( 'url' );
}
add_filter( 'login_headerurl', 'understrap_login_logo_url' );

function understrap_login_logo_url_title() {
  return get_bloginfo( 'name' );
}
add_filter( 'login_headertitle', 'understrap_login_logo_url_title' );


/**
 * Change default "from" email address and sender name
 */
function understrap_sender_email( $original_email_address ) {
    return get_field( 'email_sender_address', 'options' );
}
function understrap_sender_name( $original_email_from ) {
    return get_field( 'email_sender_name', 'options' );
}
add_filter( 'wp_mail_from', 'understrap_sender_email' );
add_filter( 'wp_mail_from_name', 'understrap_sender_name' );


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
?>