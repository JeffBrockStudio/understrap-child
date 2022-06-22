<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<?php 
$terms = get_sub_field( 'roles_to_display' );

foreach( $terms AS $term ):	
	$first_role = get_term( $term['role'] )->slug;
	break;
endforeach;

if ( array_key_exists( 'team_roles', $_GET ) && $_GET['team_roles'] ) {
	$first_visit = FALSE;
	$team_roles = $_GET['team_roles'];
} else {
	$first_visit = TRUE; 
	$team_roles = $first_role; 
	if ( count($terms) > 1 ): ?>
		<script>
			jQuery(function($) {		
				var queryParams = new URLSearchParams(window.location.search);    
				queryParams.set('team_roles', '<?php echo $team_roles;?>');
				history.pushState(null, null, '?'+queryParams.toString());
			});
		</script>
		<?php
	endif;
} ?>

<?php if ( count($terms) > 1 ): ?>

	<div id="team-type-wrapper">
		<div class="container">
			
			<div class="row">
				<div class="col-12">	
					<div class="buttons">
						<?php foreach( $terms AS $term ):
								$term_data = get_term( $term['role'] ); ?>								
								<a 
									data-team-role = "<?php echo $term_data->slug; ?>" 
									class="team-role btn 
									<?php if ( $team_roles == $term_data->slug ) {
										echo 'btn-primary';
									} else { 
										echo 'btn-outline-primary';
									} ?>"
									href="<?php global $wp; echo home_url( $wp->request ) ?>/?team_roles=<?php echo $term_data->slug; ?>"									
								>
									<?php echo $term_data->name; ?>
								</a>				 
						 <?php endforeach; ?>			
					</div>
				</div>
			</div>
		</div>
	</div>
	
<?php endif; ?>

<?php 
$querystring = '?';
$sorting_array = array();								
$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;					
$post_type = 'team';
	
// Basic arguments
$args = array( 
	'post_type' => $post_type,
	'posts_per_page' => -1,
	'post_status' => 'publish',
	'paged' => $paged,
	'orderby' => 'menu_order',
	'order' => 'ASC'
);

	
// Get filters from URL
$filters = array();

if ( array_key_exists( 'team_departments', $_GET ) && $_GET['team_departments'] ) {
	$filter_departments = $_GET['team_departments'];
	$querystring .= 'team_departments=' . $filter_departments . '&';		    
	$filters[] = 'team_departments';          
};

if ( $first_visit == TRUE ):
	 $filter_roles = $first_role;
	 $querystring .= 'team_roles=' . $filter_roles . '&';		    
	 $filters[] = 'team_roles';   
	 $_GET['team_roles'] = $first_role;
endif;	

if ( array_key_exists( 'team_roles', $_GET ) && $_GET['team_roles'] ) {
	$filter_roles = $_GET['team_roles'];
	$querystring .= 'team_roles=' . $filter_roles . '&';		    
	$filters[] = 'team_roles';          
};
	

// Add filters, if any, to query
if ( count( $filters )):
	if ( count( $filters ) == 1 ):
		$filter_name = $filters[0];
		$args['tax_query'] = array(	             
			array(
				'taxonomy' => $filter_name,
				'field'    => 'slug',
				'terms'    => array( $_GET[$filter_name] ),
			)
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
	
// 	
// 	print ( '<pre>' );
// 	print_r( $args 	 );
// 	print ( '</pre> ');
// 
// Search	
if ( array_key_exists( 'search', $_GET ) && $_GET['search'] ) {
	$search_query = $_GET['search'];
	
	$args = array( 
		'fields' => 'ids', 
		'post_type' => $post_type,
		'posts_per_page' => -1,
		'post_status' => 'publish',
		'orderby' => 'menu_order',
		'order' => 'DESC',
		's' => $_GET['search']	                 					                          
	);
	
	$args['tax_query'] = array(	             
		array(
			'taxonomy' => 'team_roles',
			'field'    => 'slug',
			'terms'    => $first_role,
		)
	);	          
	
				
	$search_results_query = new SWP_Query( $args );	
	
	$search_results_array = $search_results_query->posts;
	wp_reset_postdata();
	
	if ( count( $search_results_array ) ) {
	
		// Get all resources that are in the array of search results.
		// For some reason, we can't get the original search results query
		// to include only resources, thus this extra query.
		$posts = get_posts(array(
				'post_type' => $post_type,
				'post__in' => $search_results_array,
				'post_status' => 'publish',
				'posts_per_page' => -1
		));									

		$args = array(
				'post_type' => $post_type,
				'post__in' => $search_results_array,
				'post_status' => 'publish',
				'posts_per_page' => -1,
				'orderby' => 'menu_order',
				'order' => 'DESC',
				'paged' => $paged         	          									    
		);				
		$the_query = new WP_Query( $args );
		$results_found = TRUE;
	
	} else {
		$results_found = FALSE;
	}
	
	$querystring .= 'search=' . $search_query . '&sort=' . $sort;
	wp_reset_postdata();

} else {
	$results_found = TRUE;
	$the_query = new WP_Query( $args );
	wp_reset_postdata();
}
?>

<div id="team-list-wrapper">
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
							$resources_list[$resource_id]['title'] = get_the_title( $resource_id );
							
						endwhile;
				
						if ( count($resources_list) > 0 ):?>
							<div class="grid">
								<ul class="gridder">
									<?php
									$i = 1;
									foreach ( $resources_list AS $resource_item):			
										$resource_id = $resource_item['id'];?>
										
										<li class="gridder-list resource" data-griddercontent="#content<?php echo $i; ?>">
		
											<div class="inner">
													<div class="thumb">
															<?php echo get_the_post_thumbnail( $resource_id, 'medium' ); ?>
															<div class="plus"><i class="fas fa-plus"></i></div>
													</div>
													<div class="text">
														<h3><?php echo get_the_title( $resource_id ); ?></h3>
														<?php if ( get_field( 'team_position', $resource_id )) { ?>
															<div class="team-position"><p><?php echo get_field( 'team_position', $resource_id ); ?></p></div>
														<?php } ?>		
														<?php /* ?>			
														<div class="excerpt">	    
															<?php $excerpt = apply_filters( 'the_content', get_post_field( 'post_content', $resource_id ));
															echo understrap_limit_text( $excerpt, 45 );
															 ?>
														</div>
														<?php */ ?>
													</div>
													<?php /* ?>
													<div class="buttons">
														<a class="btn btn-primary">Read More</a>
													</div>
													<?php */ ?>
											</div>
	
										</li>
		
										<?php	     
										$i++; 
									endforeach;?>
								</ul>
							</div>
							
							<div class="view-content">
							
								<?php
								$i = 1;
								foreach ( $resources_list AS $resource_item):			
									$resource_id = $resource_item['id'];?>
									<div id="content<?php echo $i; ?>" class="gridder-content col-12">
										<div class="row">												
											<div class="col-12 col-md-4">
												<?php echo get_the_post_thumbnail( $resource_id, 'large' ); ?>
											</div>
											<div class="col-12 col-md-8">																				
												<?php if ( get_field( 'team_position', $resource_id )) { ?>
													<h3 style="color: <?php echo $accent_color; ?>" class="title"><?php echo get_field( 'team_position', $resource_id ); ?></h3>
												<?php } ?>		
												<h2><?php echo get_the_title( $resource_id ); ?> </h2>
												<?php if ( get_field( 'team_pronouns', $resource_id )) { ?>
													<div class="pronouns">Pronouns: <?php echo get_field( 'team_pronouns', $resource_id ); ?></div>
												<?php } ?>
																		
												<div class="description">
													<?php echo apply_filters( 'the_content', get_post_field( 'post_content', $resource_id )); ?>
												</div>
												
												<?php					
												if ( get_field( 'team_social_media', $resource_id )) {?>
													<div class="social-media">
														<?php
														$social_media = get_field( 'team_social_media', $resource_id );
														foreach ( $social_media AS $social_media_item ) {?>
															<a href="<?php echo $social_media_item['url']; ?>" style="color: <?php echo $accent_color; ?>" target="_blank"><?php echo $social_media_item['icon']; ?><span class="sr-only"><?php echo $social_media_item['title'];?></span>
															</a>
														<?php 
														}?>
													</div><?php 
												}
												?>			
				
											</div>											
										</div>
									</div>
									<?php
								$i++;
								endforeach;
								wp_reset_postdata();?>
							
							</div>
							
							<?php
						else:
							echo 'No resources found';
						endif;
					else:?>
						<div class="not-found">
							<h3><?php echo get_field( 'text_no_team_members_found', 'options' ); ?></h3>
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
					$next_posts_link = get_next_posts_link('See More <i class="fa fas fa-arrow-down"></i>', $the_query->max_num_pages);
										
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

</div>