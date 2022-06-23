<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

<?php
global $post;
$post_type = 'event';

// Get labels for post type
$post_type_object = get_post_type_object( $post_type ); 
$post_type_labels = $post_type_object->labels;

// print ( '<pre>' );
// print_r( $post_type_object->labels );
// print ( '</pre> ');
 
?>

<div id="<?php echo $post_type; ?>-filter-wrapper" class="filter-wrapper full-bleed">
	<div class="container">
		<div class="row">
			
			<div class="col-12">	
				<div class="filters-search">
					<div class="filters"> 	
						
						<div class="row">
														
							<div class="col-12 col-md-6">
								<div class="label">Filter by:</div>
								
								<div class="row">
									
									<?php $taxonomies = get_object_taxonomies( $post_type );									
									foreach ( $taxonomies AS $taxonomy ): 
										$taxonomy_details = get_taxonomy( $taxonomy );
										$taxonomy_labels = $taxonomy_details->labels;
										?>
										<div class="col-12 col-lg-6">		
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
														'hide_empty' => true
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
								
								<div class="row">
									
									<div class="col-12">
										<div class="clear-filters" data-post_type="<?php echo $post_type; ?>" data-taxonomies='<?php echo json_encode( $taxonomies ) ?>' data-search_placeholder="<?php echo $post_type_labels->search_items; ?>">
											<i class="far fa-times"></i> Clear all filters
										</div>
									</div>
									
								</div>
															
							</div>
	
							<div class="col-12 col-md-6 col-lg-3 col-search">		
								<div class="label">Search</div>							
								
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
										<p class="instructions">For example, search "NASA"</p>
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

$currentdate = date("Ymd",mktime(0,0,0,date("m"),date("d"),date("Y")));	
	
// Basic arguments
$args = array( 
	'post_type' => $post_type,
	'posts_per_page' => get_option( 'posts_per_page' ),
	'post_status' => 'publish',
	'paged' => $paged
);

// Events taking place today or later
$args['meta_query'] = array(
	array(
		'key' => 'event_start_date',
		'compare' => '>=',
		'value' => $currentdate,
		'type' => 'DATE',
	)
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
	$args['meta_key'] = 'event_start_date';
	$args['orderby'] = 'meta_value';								
	$querystring .= 'orderby=event_start_date&';
}	  

// Order
if ( array_key_exists( 'order', $_GET ) && $_GET['order'] ) {								
	$args['order'] = $_GET['order'];
	$querystring .= 'order=' . $_GET['order'] . '&';
	$order = $_GET['order'];
} else {
	$args['order'] = 'ASC';								
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
												
									<div class="row">
										
										<div class="col-12 col-md-5 col-lg-4">
											<div class="image">
												<?php if ( get_the_post_thumbnail( $resource_id )): ?>															
													<?php echo get_the_post_thumbnail( $resource_id, 'large' ); ?>
												<?php else: ?>	
													<img src="<?php $image = get_field( 'default_image_event', 'options' ); echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
												<?php endif; ?>
											</div>
										</div>

										<div class="col-12 col-md-7 col-lg-8">		
																				
											<div class="date">
												<?php 
												if ( get_field( 'event_day_tbd', $resource_id ) == 'Yes' ):
													echo date( 'F Y', strtotime( get_field( 'event_start_date', $resource_id ))) . ' <span class="time">(Day TBD)</span>';
												else:
													echo date( get_option('date_format'), strtotime( get_field( 'event_start_date', $resource_id )));
												endif; 
												if ( get_field( 'event_start_time', $resource_id )): ?>
													<span class="time">@ <?php echo get_field( 'event_start_time', $resource_id );
												endif;
												if ( get_field( 'event_end_time', $resource_id )):
													echo ' - ' . get_field( 'event_end_time', $resource_id );
												endif;
												?></span>
											</div>
											
											<div class="title">
												<h3><?php echo get_the_title( $resource_id ); ?></h3>
											</div>
											
											<?php if ( get_field( 'event_location_text', $resource_id )): ?>
												<div class="location">
													<?php echo get_field( 'event_location_text', $resource_id ); ?>
												</div>
											<?php endif; ?>	
											
											<?php 
											$event_types = get_the_terms( $resource_id, 'event_types');
											if( $event_types ):
													$event_types_array = array();
													foreach ( $event_types AS $event_type ) {
														$event_types_array[] = '<a href="/calendar/?event_types='. $event_type->slug .'">' .  $event_type->name . '</a>';
													}
											endif;
											echo implode( ' &#8226; ', $event_types_array ); ?>														
											
											<div class="text">
												<?php 
												$event_short_description_text = get_field( 'event_short_description', $resource_id );
												$event_short_description_text = $event_short_description_text['text'];
												?>
												<?php echo apply_filters( 'the_content', $event_short_description_text ); ?>	
											</div>
											

											<a href="<?php echo get_permalink( $resource_id ); ?>">View event details ></a>
										</div>
										
									</div>	
									
							</div>

							<?php	     
							$i++; 
						endforeach;
					endif;
				else:?>
					<div class="not-found">
						<h3><?php echo get_field( 'text_no_events_found', 'options' ); ?></h3>
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
				$next_posts_link = get_next_posts_link('Load More ', $the_query->max_num_pages);
									
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