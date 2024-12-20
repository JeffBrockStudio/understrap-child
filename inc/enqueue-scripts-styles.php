<?php
/**
 * Enqueue custom stylesheet and javascript file
 */
function custom_theme_enqueue_styles() {

    // Add Google Fonts
    wp_enqueue_style( 'child-understrap-google-fonts', 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap', false ); 
    
    $the_theme = wp_get_theme();
    
		// GSAP for animations
		wp_enqueue_script( 'gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js', array(), $the_theme->get( 'Version' ), true );
		
		// GSAP Scrolltrigger
		wp_enqueue_script( 'gsap-ScrollTrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js', array(), $the_theme->get( 'Version' ), true );
		
		// Justified Gallery
		wp_enqueue_script( 'justified-gallery', get_stylesheet_directory_uri() . '/src/js/jquery.justifiedGallery.min.js', array(), $the_theme->get( 'Version' ), true );	

		// Waypoints
		wp_enqueue_script( 'waypoints', get_stylesheet_directory_uri() . '/src/js/jquery.waypoints.min.js', array(), $the_theme->get( 'Version' ), true );
		
		// Waypoints Sticky Plugin
		wp_enqueue_script( 'waypoints-sticky', get_stylesheet_directory_uri() . '/src/js/sticky.min.js', array(), $the_theme->get( 'Version' ), true );	
		
		// Waypoints InView Plugin
		wp_enqueue_script( 'waypoints-inview', get_stylesheet_directory_uri() . '/src/js/inview.min.js', array(), $the_theme->get( 'Version' ), true );		
				
    wp_enqueue_script( 'custom-javascript', get_stylesheet_directory_uri() . '/src/js/custom-javascript.js', array(), $the_theme->get( 'Version' ), true );
				
}
add_action( 'wp_enqueue_scripts', 'custom_theme_enqueue_styles' );

	
/**
 * Font Awesome Kit Setup
 * 
 * This will add your Font Awesome Kit to the front-end, the admin back-end,
 * and the login screen area.
 */
if (! function_exists('custom_fa_setup_kit') ) {
    function custom_fa_setup_kit($kit_url = '') {
        foreach ( [ 'wp_enqueue_scripts', 'admin_enqueue_scripts', 'login_enqueue_scripts' ] as $action ) {
            add_action(
                $action,
                function () use ( $kit_url ) {
                    wp_enqueue_script( 'font-awesome-kit', $kit_url, [], null );
                }
            );
        }
    }
}
//custom_fa_setup_kit('https://kit.fontawesome.com/XXXX.js');
	

/**
 * Add editor styles
 */
function custom_add_editor_styles() {
    add_theme_support( 'editor-styles' );

    add_editor_style( [
        'css/child-theme.min.css',
        'css/custom-editor-style.min.css',
    ] );
}
add_action( 'after_setup_theme', 'custom_add_editor_styles' );    