<?php
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
		'page_title'  => 'Admin',
		'menu_title'  => 'Admin',
		'parent_slug' => 'theme-general-options',
	));	

	acf_add_options_sub_page(array(
		'page_title'  => 'Contact Info',
		'menu_title'  => 'Contact Info',
		'parent_slug' => 'theme-general-options',
	));
	
	acf_add_options_sub_page(array(
		'page_title'  => 'External Scripts',
		'menu_title'  => 'External Scripts',
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
		'page_title'  => 'Social Media',
		'menu_title'  => 'Social',
		'parent_slug' => 'theme-general-options',
	));
	
}


/**
 * Add custom CSS/JS for Advanced Custom Fields.
 */
function custom_acf_admin_head() {
	?>
	<style type="text/css">
		.acf-editor-wrap iframe {
		    max-height: 400px;
		}
		.short .acf-editor-wrap {
			/*top: -32px;*/
		}
		.short .acf-editor-wrap iframe {
		    max-height: 160px;
		    min-height: 0;
		}
		.short .acf-editor-wrap 	.mce-menubar {
			display: none;
		}
		
		.acf-tab-group {
			padding-left: 0;
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
 			border-bottom: 4px solid #F9F9F9;
 			border-top: 4px solid #F9F9F9;
		}
		.acf-repeater.-block .ui-sortable tr.acf-row:first-child td {
			border-top: none;
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
		
		/* Hide unnecessary taxonomies in sidebar ACF */
		#side-sortables #team_rolesdiv,
		#side-sortables #resource_typesdiv,
		#side-sortables #resource_topicsdiv,
		#side-sortables #event_typesdiv,
		#side-sortables #job_categoriesdiv {
			display: none;			
		}
		
		/* Color palette field */
		.acf-palette-field-layout .acf-palette-label:before {
			border-color: #ffffff;
		}				
		
		/* Make SVG icons 100% width */
		.acf-image-uploader .image-wrap {
			max-width: 100% !important;
			width: 100%;
		}
		
		/* TinyMCE */
		.mce-edit-area {
			padding-left: 1rem !important;
			padding-right: 1rem !important;
		}		
		.mce-edit-area iframe {
			margin-top: 1rem;
		}				
		
		/* Restore some admin CSS that gets overridden by Bootstrap for the Dynamic Previews */
		#wpwrap {
			background: #F0F0F1;
		}
		#wpwrap #titlediv #title {
			font-size: 1.25rem;
		}		
		#edit-slug-box {
			font-size: 13px;
		}
		#sample-permalink a,
		#side-sortables a,
		#message a {
			color: #2271b1;
		}
		
		
	</style>

	<script type="text/javascript">
	(function($){

	  jQuery('#pageparentdiv label[for=menu_order]').parents('p').eq(0).remove();
	  jQuery('#pageparentdiv input#menu_order').remove();

	})(jQuery);
	</script>
		
	<?php
}
add_action('acf/input/admin_head', 'custom_acf_admin_head');


/**
 * Add custom enqueue scripts for Advanced Custom Fields.
 */
function custom_acf_admin_enqueue_scripts() {
	
	// Include Bootstrap & custom CSS if this page includes blocks
	$the_theme = wp_get_theme();
	$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
	// Grab asset urls.
	$theme_styles  = "/css/child-theme{$suffix}.css";
	
	//wp_enqueue_style( 'acfe-blocks-layout', get_stylesheet_directory_uri() . $theme_styles, array(), $the_theme->get( 'Version' ) );	

}
add_action('acf/input/admin_enqueue_scripts', 'custom_acf_admin_enqueue_scripts');


/**
 * Hide drafts in ACF pickers.
 */
function acf_hide_drafts($options, $field, $the_post) {
	$options['post_status'] = array('publish');
	return $options;
}
add_filter('acf/fields/relationship/query', 'acf_hide_drafts', 10, 3);


add_editor_style( 'css/custom-editor-style.css' );
	
	
/**
 * Edit toolbars for WYSIWYG fields in Advanced Custom Fields.
 */
function custom_toolbars( $toolbars ) {

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
add_filter( 'acf/fields/wysiwyg/toolbars' , 'custom_toolbars'  );


/**
 * Use WordPress' native, generated PDF thumbnails in ACF.
 */
function acf_change_icon_on_files ( $icon, $mime, $attachment_id ){ 
	if ( strpos( $_SERVER[ 'REQUEST_URI' ], '/wp-admin/upload.php' ) === false && $mime === 'application/pdf' ){
		$get_image = wp_get_attachment_image_src ( $attachment_id, 'thumbnail' );
		if ( $get_image ) {
			$icon = $get_image[0];
		} 
	}
	return $icon;
}
add_filter( 'wp_mime_type_icon', 'acf_change_icon_on_files', 10, 3 );
	
	
/**
 * Get all values of a custom field
 */
function get_meta_values( $key = '', $type = 'post', $status = 'publish' ) {

    global $wpdb;

    if( empty( $key ) )
        return;

    $r = $wpdb->get_col( $wpdb->prepare( "
        SELECT pm.meta_value FROM {$wpdb->postmeta} pm
        LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
        WHERE pm.meta_key = %s 
        AND p.post_status = %s 
        AND p.post_type = %s
    ", $key, $status, $type ) );

    return $r;
}
	
	
add_filter('acfe/flexible/render/style/', 'my_acf_layout_style', 10, 4);
function my_acf_layout_style($file, $field, $layout, $is_preview){

		$file = get_stylesheet_directory() . '/css/child-theme.css';

		// Do not include the style file
		// return false;

		return $file;

}	