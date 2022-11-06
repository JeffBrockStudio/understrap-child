<?php
	
/**
 * Register custom post types.
 */
function custom_create_post_types() {
	register_post_type( 'resource',
		array(
			'labels' => array(
				'name'               => __( 'Resources' ),
				'singular_name'      => __( 'Resource' ),
				'menu_name'          => __( 'Resources' ),
				'name_admin_bar'     => __( 'Resource' ),
				'add_new'            => __( 'Add New' ),
				'add_new_item'       => __( 'Add New Resource' ),
				'new_item'           => __( 'New Resource' ),
				'edit_item'          => __( 'Edit Resource' ),
				'view_item'          => __( 'View Resource' ),
				'all_items'          => __( 'All Resources' ),
				'search_items'       => __( 'Search Resources' ),
				'parent_item_colon'  => __( 'Parent Resources:' ),
				'not_found'          => __( 'No resources found.' ),
				'not_found_in_trash' => __( 'No resources found in Trash.' )
			),
			'menu_icon' => 'dashicons-analytics',			
			'public' => true,
			'hierarchical' => false,
			'supports' => array( 'title', 'editor' ),
			'has_archive' => true,
			'rewrite' => array( 'slug' => 'resource', 'with_front' => TRUE)
		)
	);
	
	// Team Member
	register_post_type( 'team',
		array(
			'labels' => array(
				'name'               => __( 'Team Member' ),
				'singular_name'      => __( 'Team Member' ),
				'menu_name'          => __( 'Team Members' ),
				'name_admin_bar'     => __( 'Team Member' ),
				'add_new'            => __( 'Add New' ),
				'add_new_item'       => __( 'Add New Team Member' ),
				'new_item'           => __( 'New Team Member' ),
				'edit_item'          => __( 'Edit Team Member' ),
				'view_item'          => __( 'View Team Member' ),
				'all_items'          => __( 'All Team Members' ),
				'search_items'       => __( 'Search Team Members' ),
				'parent_item_colon'  => __( 'Parent Team Members:' ),
				'not_found'          => __( 'No team members found.' ),
				'not_found_in_trash' => __( 'No team members found in Trash.' )
			),
			'menu_icon' => 'dashicons-groups',			
			'public' => true,
			'hierarchical' => true,
			'supports' => array( 'title', 'editor', 'thumbnail' ),
			'has_archive' => true			
		)
	);	
	
	// Events
	register_post_type( 'event',
		array(
			'labels' => array(
				'name'               => __( 'Events' ),
				'singular_name'      => __( 'Event' ),
				'menu_name'          => __( 'Events' ),
				'name_admin_bar'     => __( 'Event' ),
				'add_new'            => __( 'Add New' ),
				'add_new_item'       => __( 'Add New Event' ),
				'new_item'           => __( 'New Event' ),
				'edit_item'          => __( 'Edit Event' ),
				'view_item'          => __( 'View Event' ),
				'all_items'          => __( 'All Events' ),
				'search_items'       => __( 'Search Events' ),
				'parent_item_colon'  => __( 'Parent Events:' ),
				'not_found'          => __( 'No events found.' ),
				'not_found_in_trash' => __( 'No events found in Trash.' )
			),
			'menu_icon' => 'dashicons-calendar-alt',			
			'public' => true,
			'hierarchical' => true,
			'supports' => array( 'title', 'editor', 'thumbnail', 'page-attributes' ),
			'has_archive' => true			
		)
	);	
	
	// Jobs
	register_post_type( 'job',
		array(
			'labels' => array(
				'name'               => __( 'Jobs' ),
				'singular_name'      => __( 'Job' ),
				'menu_name'          => __( 'Jobs' ),
				'name_admin_bar'     => __( 'Job' ),
				'add_new'            => __( 'Add New' ),
				'add_new_item'       => __( 'Add New Job' ),
				'new_item'           => __( 'New Job' ),
				'edit_item'          => __( 'Edit Job' ),
				'view_item'          => __( 'View Job' ),
				'all_items'          => __( 'All Jobs' ),
				'search_items'       => __( 'Search All Openings' ),
				'parent_item_colon'  => __( 'Parent Jobs:' ),
				'not_found'          => __( 'No events found.' ),
				'not_found_in_trash' => __( 'No events found in Trash.' )
			),
			'menu_icon' => 'dashicons-calendar-alt',			
			'public' => true,
			'hierarchical' => true,
			'supports' => array( 'title', 'editor' ),
			'has_archive' => true			
		)
	);	
}
add_action( 'init', 'custom_create_post_types' );


/**
 * Add excerpt to custom post types.
 */
function custom_add_excerpt_support_for_cpt() {
 add_post_type_support( 'project', 'excerpt' );
}
//add_action( 'init', 'custom_add_excerpt_support_for_cpt' );


/**
 * Register additional menus.
 */
function custom_register_menus() {
	register_nav_menus(
		array(
			'footer-menu' => __( 'Footer Menu' ),
			'utility-menu' => __( 'Utility Menu' ),
			'vertical-accordion-menu' => __( 'Vertical Accordion Menu' ),
			'legal-menu' => __( 'Legal Menu' )
		)
	);
}
add_action( 'init', 'custom_register_menus' );


/**
 * Disable post formats
 */
function remove_post_formats() {
	remove_theme_support('post-formats');
}
add_action( 'after_setup_theme', 'remove_post_formats', 11 );