<?php
	
/**
 * Register custom post types.
 */
function custom_create_post_types() {
	register_post_type( 'item',
		array(
			'labels' => array(
				'name'               => __( 'Items' ),
				'singular_name'      => __( 'Items' ),
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
			'supports' => array( 'title', 'editor', 'revisions' )
		)
	);
}
//add_action( 'init', 'custom_create_post_types' );


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
			'utility-menu' => __( 'Utility Menu' )
		)
	);
}
add_action( 'init', 'custom_register_menus' );

