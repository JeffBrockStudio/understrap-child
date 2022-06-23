<?php
/**
 * Omit heading sizes from TinyMCE paragraph dropdown.
 */
function omit_heading_sizes($args) {
	// Omit from list as needed
	$args['block_formats'] = 'Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Pre=pre';
	return $args;
}
add_filter('tiny_mce_before_init', 'omit_heading_sizes' );


/**
 * Remove the format dropdown select and text color selector
 */
function remove_default_format_select( $buttons ) {
    $remove = array( 'formatselect' );
    return array_diff( $buttons, $remove );
}
//add_filter( 'mce_buttons', 'remove_default_format_select' );


/**
 * Add styles/classes to the "Styles" drop-down
 */ 
add_filter( 'tiny_mce_before_init', 'fb_mce_before_init' );

function fb_mce_before_init( $settings ) {

    $style_formats = array(
        array(
            'title' => 'Paragraph',
            'block' => 'p',
            'classes' => 'none'
        ),
        array(
            'title' => 'Button: Primary',
            'block' => 'div',
            'classes' => 'btn btn-primary btn-wysiwyg'
        ), 
        array(
            'title' => 'Button: Secondary',
            'block' => 'div',
            'classes' => 'btn btn-secondary btn-wysiwyg'
        ), 
        array(
            'title' => 'Button: Info',
            'block' => 'div',
            'classes' => 'btn btn-info btn-wysiwyg'
        ),         
        array(
            'title' => 'Link',
            'block' => 'div',
            'classes' => 'link'
        ), 
    );

    $settings['style_formats'] = json_encode( $style_formats );

    return $settings;

}


/**
 * Add "Pullquote" button to TinyMCE Editor.
 */
/*
if ( ! function_exists( 'mytheme_buttons' ) ) {
    function mytheme_buttons() {
        if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
            return;
        }

        if ( get_user_option( 'rich_editing' ) !== 'true' ) {
            return;
        }

        add_filter( 'mce_external_plugins', 'mytheme_add_buttons' );
        add_filter( 'mce_buttons', 'mytheme_register_buttons' );
    }
}

if ( ! function_exists( 'mytheme_add_buttons' ) ) {
    function mytheme_add_buttons( $plugin_array ) {
        $plugin_array['pullquote'] = get_stylesheet_directory_uri() .'/js/tinymce_buttons.js';
        return $plugin_array;
    }
}

if ( ! function_exists( 'mytheme_register_buttons' ) ) {
    function mytheme_register_buttons( $buttons ) {
        array_push( $buttons, 'pullquote' );
        return $buttons;
    }
}

add_action ( 'after_wp_tiny_mce', 'mytheme_tinymce_extra_vars' );

if ( !function_exists( 'mytheme_tinymce_extra_vars' ) ) {
	function mytheme_tinymce_extra_vars() { ?>
		<script type="text/javascript">
			var tinyMCE_object = <?php echo json_encode(
				array(
				'button_name' => esc_html__('Pullquote', 'mythemeslug'),
				'button_title' => esc_html__('Insert Pullquote', 'mythemeslug'),
				)
			);
			?>;
		</script><?php
	}
}
*/