<?php 
	
/**
 * Add custom taxonomies
 */
function custom_add_custom_taxonomies() {
	
	register_taxonomy('taxonomy_name', 'custom_post_type', 
		array(
			'labels' => array(
				'name'                       => __( 'Items' ),
				'singular_name'              => __( 'Item' ),
				'menu_name'                  => __( 'Items' ),
				'all_items'                  => __( 'All Items' ),
				'parent_item'                => __( 'Parent Item' ),
				'parent_item_colon'          => __( 'Parent Items:' ),
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
			'hierarchical' => true
		)
	);

};
//add_action( 'init', 'custom_add_custom_taxonomies', 0 );
