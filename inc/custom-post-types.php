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
			'legal-menu' => __( 'Legal Menu' )
		)
	);
}
add_action( 'init', 'custom_register_menus' );

