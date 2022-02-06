<?php

// Get labels for post type
$post_type_object = get_post_type_object( $post_type ); 
$post_type_labels = $post_type_object->labels;

// print ( '<pre>' );
// print_r( $post_type_object->labels );
// print ( '</pre> ');
 
$args = array( 
	'post_type' => $post_type,
	'posts_per_page' => '-1',
	'post_status' => 'publish',
	'meta_key'		=> $post_type . '_sticky',
	'meta_value'	=> '1'
);
$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ): ?>

	<div id="featured-<?php echo $post_type; ?>">
		<div class="container" tabindex="-1">
			<div class="row no-gutters">
							
				<?php
				while ( $the_query->have_posts() ):
					$the_query->the_post(); ?>
					<div class="col-12 <?php echo $post_type; ?>">
						<p class="superheading">Featured <?php echo $post_type_labels->singular_name; ?></p>							
						<h3><?php the_title(); ?></h3>
						<?php
						if ( get_field( $post_type . '_short_description_text', $post->ID )): ?>
							<div class="text">
								<?php echo apply_filters( 'the_content', get_field( $post_type . '_short_description_text', $post->ID ));  ?>
							</div>
							<?php
						endif;
						?>
						<a href="<?php the_permalink(); ?>" class="btn btn-primary"><?php echo $post_type_labels->view_item; ?></a>						
					</div>
					<?php 					
				endwhile;
				wp_reset_postdata();
				?>
				
			</div>
		</div>
	</div>

<?php 
endif; 
?>

<div id="<?php echo $post_type; ?>-filter-wrapper" class="filter-wrapper">
	<div class="container">
		<div class="row">
			
			<div class="col-12">	
				<div class="filters-search">
					<div class="filters"> 	
						
						<div class="row">

							<div class="col-12 col-md-7">
								<div class="label">Filter by:</div>
								
								<div class="row">
									
									<?php $taxonomies = get_object_taxonomies( $post_type );									
									foreach ( $taxonomies AS $taxonomy ): 
										$taxonomy_details = get_taxonomy( $taxonomy );
										$taxonomy_labels = $taxonomy_details->labels;
										?>
										<div class="col-12 col-md-6">		
											<div class="filter <?php echo $taxonomy; ?>">
												<label for="select-<?php echo $taxonomy; ?>" class="sr-only"><?php echo $taxonomy_labels->menu_name; ?></label>
												<select id="select-<?php echo $taxonomy; ?>" data-taxonomies='<?php echo json_encode( $taxonomies ) ?>' data-post_type="<?php echo $post_type; ?>">
													<option value="" selected><?php echo $taxonomy_labels->menu_name; ?></option>
													<?php
													if ( isset( $_GET[$taxonomy] )):
														$current = $_GET[$taxonomy];
													else:
														$current = '';
													endif; 		 
													$terms = get_terms( array(
														'taxonomy' => $taxonomy,
														'hide_empty' => false
													) );   
													foreach ( $terms AS $term ) {?>
														<option value="<?php echo $term->slug; ?>"<?php if ( $term->slug == $current) { echo ' selected'; };  ?>><?php echo $term->name; ?></option>
															<?php 
													};
													wp_reset_postdata(); ?> 		                        
												</select>
											</div>
										</div>
										<?php											
									endforeach;										
									?>
									
								</div>
								
								<div class="clear-filters" data-post_type="<?php echo $post_type; ?>" data-taxonomies='<?php echo json_encode( $taxonomies ) ?>' data-search_placeholder="<?php echo $post_type_labels->search_items; ?>">
									<i class="far fa-times"></i> Clear all filters
								</div>
							</div>
								
							<div class="col-12 col-md-4 offset-md-1 col-search">		
								<div class="label"><?php echo $post_type_labels->search_items; ?></div>							
								
								<div class="search">
									<form id="<?php echo $post_type; ?>-search" class="filters-search-form" data-post_type="<?php echo $post_type; ?>" data-taxonomies='<?php echo json_encode( $taxonomies ) ?>'>
										<label class="sr-only" for="s">Search</label>
										<div class="input-group">
											<span class="input-group-prepend">
												<input class="submit" name="submit" type="submit" value="&#xf002;">
											</span>
											<input 
												id="<?php echo $post_type; ?>-search-query" 
												class="field form-control search-query" 
												type="text"
												placeholder="<?php if ( isset($_GET['search']) ) { esc_attr_e( $_GET['search'], 'understrap' ); } else { esc_attr_e( $post_type_labels->search_items, 'understrap' ); }; ?>" 
												value="">											
										</div>
									</form>									
								</div>
								
							</div>
							
						</div>
						
					</div>
					
				</div>
			</div>
			
		</div>
	</div>
</div>

<?php
$querystring = '?';
$sorting_array = array();								
$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;					
	
// Basic arguments
$args = array( 
	'post_type' => $post_type,
	'posts_per_page' => get_option( 'posts_per_page' ),
	'post_status' => 'publish',
	'paged' => $paged
);

// Order by
if ( array_key_exists( 'orderby', $_GET ) && $_GET['orderby'] ) {								
	$args['meta_key'] = $_GET['meta_key'];
	
	if ( $_GET['orderby'] == 'title' ) {
		$args['orderby'] = 'title';	
	} else if ( $_GET['orderby'] == 'taxonomy' ) {
		$args['orderby'] = 'title';	
		$orderby_taxonomy = $_GET['taxonomy'];
	} else {
		$args['orderby'] = 'meta_value';									
	}
	
} else {
	$args['orderby'] = 'date';								
	$querystring .= 'orderby=title&';
}	  

// Order
if ( array_key_exists( 'order', $_GET ) && $_GET['order'] ) {								
	$args['order'] = $_GET['order'];
	$querystring .= 'order=' . $_GET['order'] . '&';
	$order = $_GET['order'];
} else {
	$args['order'] = 'DESC';								
	$querystring .= 'order=ASC&';
}		
	
// Get filters from URL
$filters = array();

foreach ( $taxonomies AS $taxonomy ):
	if ( array_key_exists( $taxonomy, $_GET ) && $_GET[$taxonomy] ) {
		$filter_resource_topics = $_GET[$taxonomy];
		$querystring .= $taxonomy . '=' . $filter_resource_topics . '&';		    
		$filters[] = $taxonomy;          
	};
endforeach;

// print ( '<pre>' );
// print_r( $filters );
// print ( '</pre> ');
	
// Add filters, if any, to query
if ( count( $filters )):
	if ( count( $filters ) == 1 ):
		$filter_name = $filters[0];
		$args['tax_query'] = array(	       
			array(
				'taxonomy' => $filter_name,      
				'field'    => 'slug',
				'terms'    => array( $_GET[$filter_name] )
			),
		);	          
	else:
	
		$tax_query = array();
		$tax_query['relation'] = 'AND';
		
		foreach ( $filters AS $filter ):
			array_push( $tax_query,
				array(
					'taxonomy' => $filter,
					'field'    => 'slug',
					'terms'    => array( $_GET[$filter] ),
				)
			);	    
		endforeach; 
		$args['tax_query'] = $tax_query;     

	endif;
	
endif;


// Search	
if ( array_key_exists( 'search', $_GET ) && $_GET['search'] ) {
	$search_query = $_GET['search'];
	
	$args['fields'] = 'ids';
	$args['posts_per_page'] = '-1';
	$args['orderby'] = 'title';
//	$args['order'] = $sort;
	$args['s'] = $_GET['search'];	                 					                          
	
	// print ( '<pre>' );
	// print_r( $args );
	// print ( '</pre> ');
				
	$search_results_query = new SWP_Query( $args );	
	
	$search_results_array = $search_results_query->posts;
	
	// print ( '<pre>' );
	// print_r( $search_results_array );
	// print ( '</pre> ');
	wp_reset_postdata();
	
	if ( count( $search_results_array ) ) {
	
		$args = array(
				'post_type' => $post_type,
				'post__in' => $search_results_array,
				'post_status' => 'publish',
				'posts_per_page' => get_option( 'posts_per_page' ),
				'orderby' => 'date',
				//'order' => $sort,
				'paged' => $paged         	          									    
		);				
		$the_query = new WP_Query( $args );
	
	}
	
	$querystring .= '&search=' . $search_query;
	//$querystring .= '&search=' . $search_query . '&order=' . $sort;
	wp_reset_postdata();

} else {
	$the_query = new WP_Query( $args );
	wp_reset_postdata();
}

// print ( '<pre>' );
// print_r( $args );
// print ( '</pre> ');

?>

<div id="<?php echo $post_type; ?>-list-wrapper" class="list-wrapper">
	<div class="container">
		<div class="row">
			<div class="col-12" id="posts-ajax">	

				<?php
				$the_query = new WP_Query( $args );
				if ( $the_query->have_posts() ):
							
					$resources_list = array();	
					while ( $the_query->have_posts() ):
						$the_query->the_post();										
						$resource_id = $post->ID;						
						$resources_list[$resource_id]['id'] = $post->ID;					
					endwhile;
			
					if ( count($resources_list) > 0 ):
						$i = 1;
						foreach ( $resources_list AS $resource_item):			
							$resource_id = $resource_item['id'];?>

							<div class="item <?php echo $post_type; ?>">									
								<a href="<?php echo get_permalink($resource_id); ?>">								
									<div class="row">

										<div class="col-12 col-md-6 date">		
											<?php echo get_the_date( get_option('date_format'), $resource_id ); ?>
										</div>
										
										<div class="col-12 col-md-6 topic">		
											<?php 
										 	$resource_topics = get_the_terms( $resource_id, 'resource_topics');
											if( $resource_topics ):
													$resource_topics_array = array();
												foreach ( $resource_topics AS $resource_topic_name ) {
													$resource_topics_array[] = $resource_topic_name->name;
												}
											endif;
											echo implode( ', ', $resource_topics_array); ?>				      															
										</div>			
										
									</div>	
									
									<div class="row">
											
										<div class="col-12">
											<div class="title">
												<h3><?php echo get_the_title( $resource_id ); ?></h3>
											</div>

											<div class="type">
												<?php 
												$resource_types = get_the_terms( $resource_id, 'resource_types');
												if( $resource_types ):
														$resource_types_array = array();
													foreach ( $resource_types AS $resource_type_name ) {
														$resource_types_array[] = $resource_type_name->name;
													}
												endif;
												echo implode( ', ', $resource_types_array ); ?>													
											</div>
											
											<div class="text">
												<?php echo apply_filters( 'the_content', get_field( 'resource_short_description_text', $resource_id )); ?>	
											</div>
										</div>
														
									</div>
								</a>								
							</div>

							<?php	     
							$i++; 
						endforeach;
					endif;
				else:?>
					<div class="not-found">
						<h3><?php echo get_field( 'text_no_resources_found', 'options' ); ?></h3>
					</div>
					<?php
				endif; 									
				?>

				<div class="row spinner-row">
					<div class="col-12">
						<div class="icon-spinner-circle"></div>
					</div>
				</div>
				
				<?php						
				$next_posts_link = get_next_posts_link('Load More ' . $post_type_labels->name . ' <i class="fa fas fa-arrow-down"></i>', $the_query->max_num_pages);
									
				if( $next_posts_link ): ?>
					<div class="row pagination-row">
						<div class="col-12">
							<?php 
							echo $next_posts_link; ?>
						</div>
					</div>
					<?php
				endif;					
				wp_reset_postdata();	
				?>
			</div>
		</div>
	</div>
</div>