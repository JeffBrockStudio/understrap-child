<?php 
	
/**
 * Add custom taxonomies
 */
function custom_add_custom_taxonomies() {
	
	// Focus Areas
	register_taxonomy('focus_areas', array( 'resource', 'event', 'post' ), 
		array(
			'labels' => array(
				'name'                       => __( 'Focus Areas' ),
				'singular_name'              => __( 'Focus Area' ),
				'menu_name'                  => __( 'Focus Areas' ),
				'all_items'                  => __( 'All Focus Areas' ),
				'parent_item'                => __( 'Parent Focus Area' ),
				'parent_item_colon'          => __( 'Parent Focus Area:' ),
				'new_item_name'              => __( 'New Focus Area Name' ),
				'add_new_item'               => __( 'Add Focus Area' ),
				'edit_item'                  => __( 'Edit Focus Area' ),
				'update_item'                => __( 'Update Focus Area' ),
				'view_item'                  => __( 'View Focus Area' ),
				'separate_items_with_commas' => __( 'Separate focus areas with commas' ),
				'add_or_remove_items'        => __( 'Add or remove focus areas' ),
				'choose_from_most_used'      => __( 'Choose from the most used' ),
				'popular_items'              => __( 'Popular Focus Areas' ),
				'search_items'               => __( 'Search Focus Areas' ),
				'not_found'                  => __( 'Not Found' ),
				'no_terms'                   => __( 'No items' ),
				'items_list'                 => __( 'Focus areas list' ),
				'items_list_navigation'      => __( 'Focus areas list navigation' )
			),		
			'label' => __( 'Focus Areas' ),
			'hierarchical' => true,			
			'public' => true,
			'show_ui' => true
		)
	);	
	
	// Resource Types
	register_taxonomy('resource_types', 'resource', 
		array(
			'labels' => array(
				'name'                       => __( 'Resource Types' ),
				'singular_name'              => __( 'Resource Type' ),
				'menu_name'                  => __( 'Types' ),
				'all_items'                  => __( 'All Resource Types' ),
				'parent_item'                => __( 'Parent Resource Type' ),
				'parent_item_colon'          => __( 'Parent Resource Type:' ),
				'new_item_name'              => __( 'New Resource Type Name' ),
				'add_new_item'               => __( 'Add Resource Type' ),
				'edit_item'                  => __( 'Edit Resource Type' ),
				'update_item'                => __( 'Update Resource Type' ),
				'view_item'                  => __( 'View Resource Type' ),
				'separate_items_with_commas' => __( 'Separate resource types with commas' ),
				'add_or_remove_items'        => __( 'Add or remove resource types' ),
				'choose_from_most_used'      => __( 'Choose from the most used' ),
				'popular_items'              => __( 'Popular Resource Types' ),
				'search_items'               => __( 'Search Resource Types' ),
				'not_found'                  => __( 'Not Found' ),
				'no_terms'                   => __( 'No items' ),
				'items_list'                 => __( 'Resource Types list' ),
				'items_list_navigation'      => __( 'Resource Types list navigation' )
			),		
			'label' => __( 'Types' ),
			'hierarchical' => true,
			'public' => false,
			'show_ui' => true			
		)
	);
	
	// Resource Topics
	register_taxonomy('resource_topics', array( 'resource' ), 
		array(
			'labels' => array(
				'name'                       => __( 'Resource Topics' ),
				'singular_name'              => __( 'Resource Topic' ),
				'menu_name'                  => __( 'Topics' ),
				'all_items'                  => __( 'All Resource Topics' ),
				'parent_item'                => __( 'Parent Resource Topic' ),
				'parent_item_colon'          => __( 'Parent Resource Topic:' ),
				'new_item_name'              => __( 'New Resource Topic Name' ),
				'add_new_item'               => __( 'Add Resource Topic' ),
				'edit_item'                  => __( 'Edit Resource Topic' ),
				'update_item'                => __( 'Update Resource Topic' ),
				'view_item'                  => __( 'View Resource Topic' ),
				'separate_items_with_commas' => __( 'Separate resource topics with commas' ),
				'add_or_remove_items'        => __( 'Add or remove resource topics' ),
				'choose_from_most_used'      => __( 'Choose from the most used' ),
				'popular_items'              => __( 'Popular Resource Topics' ),
				'search_items'               => __( 'Search Resource Topics' ),
				'not_found'                  => __( 'Not Found' ),
				'no_terms'                   => __( 'No items' ),
				'items_list'                 => __( 'Resource topics list' ),
				'items_list_navigation'      => __( 'Resource topics list navigation' )
			),		
			'label' => __( 'Topics' ),
			'hierarchical' => true,
			'public' => true,
			'show_ui' => true			
		)
	);	
	
	// Team Roles
	register_taxonomy('team_roles', 'team', 
		array(
			'labels' => array(
				'name'                       => __( 'Team Roles' ),
				'singular_name'              => __( 'Team Role' ),
				'menu_name'                  => __( 'Team Roles' ),
				'all_items'                  => __( 'All Team Roles' ),
				'parent_item'                => __( 'Parent Team Role' ),
				'parent_item_colon'          => __( 'Parent Team Role' ),
				'new_item_name'              => __( 'New Team Role Name' ),
				'add_new_item'               => __( 'Add Team Role' ),
				'edit_item'                  => __( 'Edit Team Role' ),
				'update_item'                => __( 'Update Team Role' ),
				'view_item'                  => __( 'View Team Role' ),
				'separate_items_with_commas' => __( 'Separate team roles with commas' ),
				'add_or_remove_items'        => __( 'Add or remove team roles' ),
				'choose_from_most_used'      => __( 'Choose from the most used' ),
				'popular_items'              => __( 'Popular Team Roles' ),
				'search_items'               => __( 'Search Team Roles' ),
				'not_found'                  => __( 'Not Found' ),
				'no_terms'                   => __( 'No items' ),
				'items_list'                 => __( 'Team Roles list' ),
				'items_list_navigation'      => __( 'Team Roles list navigation' )
			),		
			'label' => __( 'Team Roles' ),
			'hierarchical' => true,
			'public' => true,
			'show_ui' => true		
		)
	);
	
	// Event Types
	register_taxonomy('event_types', 'event', 
		array(
			'labels' => array(
				'name'                       => __( 'Event Types' ),
				'singular_name'              => __( 'Event Type' ),
				'menu_name'                  => __( 'Types' ),
				'all_items'                  => __( 'All Types' ),
				'parent_item'                => __( 'Parent Type' ),
				'parent_item_colon'          => __( 'Parent Type' ),
				'new_item_name'              => __( 'New Type Name' ),
				'add_new_item'               => __( 'Add Type' ),
				'edit_item'                  => __( 'Edit Type' ),
				'update_item'                => __( 'Update Type' ),
				'view_item'                  => __( 'View Type' ),
				'separate_items_with_commas' => __( 'Separate types with commas' ),
				'add_or_remove_items'        => __( 'Add or remove types' ),
				'choose_from_most_used'      => __( 'Choose from the most used' ),
				'popular_items'              => __( 'Popular Types' ),
				'search_items'               => __( 'Search Types' ),
				'not_found'                  => __( 'Not Found' ),
				'no_terms'                   => __( 'No items' ),
				'items_list'                 => __( 'Types list' ),
				'items_list_navigation'      => __( 'Types list navigation' )
			),		
			'label' => __( 'Event Types' ),
			'hierarchical' => true,
			'public' => true,
			'show_ui' => true		
		)
	);
	
	// Job Categories
	register_taxonomy('job_categories', 'job', 
		array(
			'labels' => array(
				'name'                       => __( 'Job Categories' ),
				'singular_name'              => __( 'Job Category' ),
				'menu_name'                  => __( 'Job Categories' ),
				'all_items'                  => __( 'All Job Categories' ),
				'parent_item'                => __( 'Parent Job Category' ),
				'parent_item_colon'          => __( 'Parent Job Category' ),
				'new_item_name'              => __( 'New Job Category Name' ),
				'add_new_item'               => __( 'Add Job Category' ),
				'edit_item'                  => __( 'Edit Job Category' ),
				'update_item'                => __( 'Update Job Category' ),
				'view_item'                  => __( 'View Job Category' ),
				'separate_items_with_commas' => __( 'Separate job categories with commas' ),
				'add_or_remove_items'        => __( 'Add or remove job categories' ),
				'choose_from_most_used'      => __( 'Choose from the most used' ),
				'popular_items'              => __( 'Popular Job Categories' ),
				'search_items'               => __( 'Search Job Categories' ),
				'not_found'                  => __( 'Not Found' ),
				'no_terms'                   => __( 'No items' ),
				'items_list'                 => __( 'Job Categories list' ),
				'items_list_navigation'      => __( 'Job Categories list navigation' )
			),		
			'label' => __( 'Job Categories' ),
			'hierarchical' => true,
			'public' => true,
			'show_ui' => true		
		)
	);
	
};
add_action( 'init', 'custom_add_custom_taxonomies', 0 );


/**
 * Disable tags and post formats
 */
add_action('init', function(){
	register_taxonomy( 'post_tag', [] );
	register_taxonomy( 'post_format', []);
});