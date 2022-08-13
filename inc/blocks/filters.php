<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

<?php 
/**
 * Content settings
 */	

// Post type 
$post_type = get_sub_field( 'content_type' );  

// Taxonomies for this post type
$taxonomies = get_object_taxonomies( $post_type );		

// Preselected filter, if any
switch( $post_type ):
	
	// Event
	case 'event':
		$$preselected_filter_name = '';
		break;
		
	// Post
	case 'post':
		$preselected_filter_name = 'category';
		break;
		
	// Resource
	case 'resource':
		$preselected_filter_name = 'resource_topics';
		break;		
		
	// Team
	case 'team':
		$preselected_filter_name = 'team_roles';?>
		<style>
			.block.filters .gridder-navigation .gridder-close:after {
				background-image: url("data:image/svg+xml,%3Csvg id='b' xmlns='http://www.w3.org/2000/svg' width='46.82' height='46.82' viewBox='0 0 46.82 46.82'%3E%3Cg id='c'%3E%3Cg%3E%3Ccircle cx='23.41' cy='23.41' r='23.41' fill='<?php echo urlencode($accent_color);?>'/%3E%3Cpath d='M35.42,15.05l-8.26,8.26,8.67,8.67-3.86,3.86-8.67-8.67-8.3,8.3-3.69-3.69,8.3-8.3L10.98,14.84l3.86-3.86,8.63,8.63,8.26-8.26,3.69,3.69Z' fill='%23fff'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
			}
		</style>		
		<?php 
		$terms = get_sub_field( 'team_roles' );
		if ( $terms ):
			
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
			}
			
		endif; ?>
		
		<?php		
		break;		
		
endswitch;
$preselected_filter = get_sub_field( $preselected_filter_name );

// Number of posts per page
$posts_per_page = get_sub_field( 'number_of_posts' );
if ( !$posts_per_page ):
	// If none is set manually, get WordPress default
	$posts_per_page = get_option( 'posts_per_page' );
endif;

// Pagination style
$pagination = get_sub_field( 'pagination' );

// Infinite Load button text
$load_more_text = get_sub_field( 'button_text' );

// Layout
$layout = get_sub_field( 'layout' );


/**
 * Display settings
 */

// Show/hide choices
$show = array();

$items = get_sub_field( 'show_hide_' . $post_type );
foreach( $items AS $key => $value ):
	$field = substr( $key, 5 ); // Trim "show_" from beginning of variable
	$show[ $field ] = $value;
endforeach;

// Hide individual elements in meta data ?>	
<style>
	<?php if ( !$show['date'] ): ?>
		#<?php echo $block_id; ?>.block.filters article .posted-on {
			display: none !important;
		}
	<?php endif; ?>
	<?php if ( !$show['author'] ): ?>
		#<?php echo $block_id; ?>.block.filters article .byline {
			display: none !important;
		}
	<?php endif; ?>
</style>

<?php if ( $post_type == 'team' ):?>
	<?php if ( $terms AND count($terms) > 1 ): ?>
	
		<div id="team-type-wrapper">
			<div class="container">
				
				<div class="row">
					<div class="col-12">	
						<div class="buttons">
							<?php foreach( $terms AS $term ):
									$term_data = get_term( $term['role'] ); ?>								
									<a 
										data-team-role = "<?php echo $term_data->slug; ?>" 
										data-accent-color = "<?php echo $accent_color; ?>"
										data-svg-bg-color = "<?php echo $svg_bg_color; ?>"
										class="team-role btn 
										<?php if ( $team_roles == $term_data->slug ) {
											echo '"; ';?>
											style="background-color: <?php echo $accent_color; ?>; border-color: <?php echo $accent_color; ?>; color: <?php echo $svg_bg_color ?>"
											<?php
										} else { 
											echo 'btn-outline';};?>"
											style="background-color: #ffffff; border-color: <?php echo $accent_color; ?>; color: <?php echo $accent_color ?>"
										href="<?php global $wp; echo home_url( $wp->request ) ?>/?team_roles=<?php echo $term_data->slug; ?>">
										<?php echo $term_data->name; ?>
									</a>				 
							 <?php endforeach; ?>			
						</div>
					</div>
				</div>
			</div>
		</div>
		
	<?php endif; ?>
<?php endif; ?>
	
<?php if ( $layout == 'list'): ?>
	<div class="container list">
		<div class="row">
			
			<div class="col-12 col-md-6 col-heading">
				<div class="inner">			
					<?php if ( get_sub_field( 'heading' )): ?>
						<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
					<?php endif; ?>
				</div>				
			</div>

			<div class="col-12 col-md-6">
				<?php
				if ( get_sub_field( 'number_of_posts' )):
					$number_of_posts = get_sub_field( 'number_of_posts' );
				else:
					$number_of_posts = '-1';
				endif;
				
				$args = array( 
					'post_type' => 'post',
					'posts_per_page' => $number_of_posts,
					'post_status' => 'publish'
				);
	
				$category = get_sub_field( 'category' );
				if ( $category ):
					$args['category__in'] = $category;
				endif;
								
				$the_query = new WP_Query( $args );
				
				if ( $the_query->have_posts() ) {
					// Start the Loop.
					while ( $the_query->have_posts() ) {
						$the_query->the_post();?>
	
						<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
						
							<header class="entry-header">
						
								<?php if ( 'post' === get_post_type() ) : ?>
								
									<div class="entry-meta">
										<?php understrap_posted_on(); ?>
									</div><!-- .entry-meta -->
								
								<?php endif; ?>
								
								<?php if ( has_category( 'in-the-news' )): 
									the_title(
										sprintf( '<h2 class="entry-title"><a target="_blank" href="%s" rel="bookmark">', get_field( 'news-external-url' ) ),
										'</a></h2>'
									);
								else:
									the_title(
										sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ),
										'</a></h2>'
									);
								endif; ?>
										
							</header><!-- .entry-header -->
						
							<?php if ( get_the_post_thumbnail( $post->ID, 'large' ) AND $show['thumbnails'] ): ?>
								<?php echo get_the_post_thumbnail( $post->ID, 'large' ); ?>
							<?php endif; ?>
						
							<div class="entry-content">
								<?php if ( has_category( 'in-the-news' )): ?>
									<a href="<?php echo get_field( 'news-external-url' ); ?>" target="_blank" class="learn-more">Learn More</a>		
								<?php else: ?>
									<?php
									the_excerpt();
									understrap_link_pages();
									?>
								<?php endif; ?>		
						
							</div><!-- .entry-content -->
						
							<?php if ( !has_category( 'in-the-news' )): ?>
								<footer class="entry-footer">
							
									<?php understrap_entry_footer(); ?>
							
								</footer><!-- .entry-footer -->
							<?php endif; ?>
						
						</article><!-- #post-## -->
						<?php
					}
				} else {
					get_template_part( 'loop-templates/content', 'none' );
				}
				wp_reset_postdata();
				?>
				
				<?php if ( get_sub_field( 'button' )): ?>
					<div class="buttons">
						<a class="btn btn-outline" href="<?php $link = get_sub_field( 'button' ); echo $link['url'];?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></a>
					</div>
					<?php
				endif; ?>
				
			</div>
			
		</div>
	</div>
	
<?php else: ?>
	
	<?php
	
	$post_id = $post->ID;
	
	// Get labels for post type
	$post_type_object = get_post_type_object( $post_type ); 
	$post_type_labels = $post_type_object->labels;
	
	// Sticky / featured item
	if ( (array_key_exists('sticky', $show)) AND $show['sticky'] ):
		
		$sticky_found = TRUE;
		$args = array( 
			'post_type' => $post_type,
			'posts_per_page' => '1',
			'post_status' => 'publish'
		);
		
		if ( $post_type == 'post' ):
			// Post uses WordPress default stickiness
			$sticky = get_option( 'sticky_posts' );
			
			if ( empty( $sticky ) ):			
				$sticky_found = FALSE;
			else:
				$args['post__in'] = get_option( 'sticky_posts' );
				$args['ignore_sticky_posts'] = 1;
			endif;

		else:		
			// Other post types don't offer stickiness by default
			$args['meta_key'] = $post_type . '_sticky';
			$args['meta_value'] = '1';
			
		endif;
		
		// Run query
		if ( $sticky_found ):
			$the_query = new WP_Query( $args );
			if ( $the_query->have_posts() ):
				while ( $the_query->have_posts() ):
					$the_query->the_post();
					
					// Include sticky template based on post type
					include( 'filters/sticky-' .$post_type. '.php' );	
					
				endwhile;
			endif;
			wp_reset_postdata();
		endif;

	endif;
	?>
		
	<?php if ( get_sub_field( 'heading' )):?>
		<div class="<?php echo esc_attr( $container ); ?>">
			<div class="row">
			
				<div class="col-12 col-heading">
					<div class="inner">				
						<<?php the_sub_field( 'heading_level' );?> style="color: <?php echo $accent_color; ?>"><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
					</div>
				</div>
				
			</div>
		</div>
	<?php endif; ?>
		
	<?php
	if ( 	((array_key_exists('filters', $show)) AND $show['filters'] ) 
		OR 	((array_key_exists('search', $show)) AND $show['search'] ) ): ?>				
		<div id="<?php echo $post_type; ?>-filter-wrapper" class="filter-wrapper">
			<div class="<?php echo esc_attr( $container ); ?>">
				<div class="row">
					
					<div class="col-12">	
						<div class="filters-search">
							<div class="filters"> 	
								
								<div class="row">
		
									<div class="col-12 col-md-7">
										<?php if ((array_key_exists('filters', $show)) AND $show['filters'] ): ?>
											<div class="label">Filter by:</div>
											
											<div class="row">
												
												<?php								
												foreach ( $taxonomies AS $taxonomy ): 
													$taxonomy_details = get_taxonomy( $taxonomy );
													$taxonomy_labels = $taxonomy_details->labels;
													?>
													<?php if ( $taxonomy_details->publicly_queryable ): ?>
														<div class="col-12 col-md-6">		
															<div class="filter <?php echo $taxonomy; ?>">
																<label for="select-<?php echo $taxonomy; ?>" class="sr-only"><?php echo $taxonomy_labels->menu_name; ?></label>
																<select id="select-<?php echo $taxonomy; ?>" data-taxonomies='<?php echo json_encode( $taxonomies ) ?>' data-post_type="<?php echo $post_type; ?>">
																	<option value="" selected><?php echo $taxonomy_labels->menu_name; ?></option>
																	<?php
																	if ( isset( $_GET[$taxonomy] )):
																		$current = $_GET[$taxonomy];
																	elseif ( get_sub_field( $preselected_filter_name ) AND !(isset( $_GET['override'] ) )):
																		$catinfo = get_term( get_sub_field( $preselected_filter_name ) );    			 
																		$current = $catinfo->slug;
																	else:
																		$current = '';
																	endif; 		 
																	$terms = get_terms( array(
																		'taxonomy' => $taxonomy,
																		'hide_empty' => true
																	) );   
																	foreach ( $terms AS $term ) {
																		if ( $term->slug != 'members' ):?>
																			<option value="<?php echo $term->slug; ?>"<?php if ( $term->slug == $current) { echo ' selected'; };  ?>><?php echo $term->name; ?></option>
																			<?php 
																		endif;
																	};
																	wp_reset_postdata(); ?> 		                        
																</select>
															</div>
														</div>
													<?php			
													endif;								
												endforeach;										
												?>
												
											</div>
											
											<div class="clear-filters" data-post_type="<?php echo $post_type; ?>" data-taxonomies='<?php echo json_encode( $taxonomies ) ?>' data-search_placeholder="<?php echo $post_type_labels->search_items; ?>">
												<i class="far fa-times"></i> Clear all filters
											</div>
										<?php endif; ?>
									</div>
										
									<div class="col-12 col-md-4 offset-md-1 col-search">		
										<?php if ( (array_key_exists('search', $show)) AND $show['search'] ): ?>
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
										<?php endif;?>
									</div>
									
								</div>	
								
							</div>
							
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
		
	// Basic arguments
	$args = array( 
		'post_type' => $post_type,
		'posts_per_page' => $posts_per_page,
		'post_status' => 'publish',
		'paged' => $paged
	);
	
	// Order by
	if ( $post_type == 'team') {
		$args['orderby'] = 'menu_order';	
	} elseif ( array_key_exists( 'orderby', $_GET ) && $_GET['orderby'] ) {								
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
	if ( $post_type == 'team') {
		$args['order'] = 'ASC';
	} elseif ( array_key_exists( 'order', $_GET ) && $_GET['order'] ) {								
		$args['order'] = $_GET['order'];
		$querystring .= 'order=' . $_GET['order'] . '&';
		$order = $_GET['order'];
	} else {
		$args['order'] = 'DESC';								
		$querystring .= 'order=ASC&';
	}		
		
	// Get filters from URL`
	$filters = array();
	
	if ( $post_type == 'team'):
		if ( $first_visit == TRUE ):
		 	$filter_roles = $first_role;
		 	$querystring .= 'team_roles=' . $filter_roles . '&';		    
		 	$filters[] = 'team_roles';   
		 	$_GET['team_roles'] = $first_role;
		endif;	
	endif;
	
	foreach ( $taxonomies AS $taxonomy ):
		if ( array_key_exists( $taxonomy, $_GET ) && $_GET[$taxonomy] ) {
			$filter_resource_topics = $_GET[$taxonomy];
			$querystring .= $taxonomy . '=' . $filter_resource_topics . '&';		    
			$filters[] = $taxonomy;          
		};
	endforeach;
	
	// Pre-selected filter
	if ( get_sub_field( $preselected_filter_name ) AND !isset( $_GET[$preselected_filter_name] ) AND !(isset( $_GET['override'] ) )):
		$catinfo = get_term( get_sub_field( $preselected_filter_name ) );    			 
		$querystring .= $preselected_filter_name . '=' . $catinfo->slug . '&';		
		$_GET[$preselected_filter_name] = $catinfo->slug;
		$filters[] = $preselected_filter_name;     
	endif;
	
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
		
		$args['engine'] = 'default';              					                          
		
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
					'posts_per_page' => $posts_per_page,
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
		<div class="<?php echo esc_attr( $container ); ?>">
			<div id="posts-ajax" class="row <?php echo $post_type; ?>">
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
						
						if ( $post_type == 'team' ):?>
							<div class="grid">
								<ul class="gridder">
									<?php
									$i = 1;
									foreach ( $resources_list AS $resource_item):			
										$resource_id = $resource_item['id'];
										include( 'filters/article-' .$post_type. '.php' );	
										?>
										
										<?php	     
										$i++; 
									endforeach;?>
								</ul>
							</div>
							
							<div class="view-content">
							
								<?php
								$i = 1;
								foreach ( $resources_list AS $resource_item):			
									$resource_id = $resource_item['id'];
									include( 'filters/article-' .$post_type. '-full.php' );	?>
									<?php
								$i++;
								endforeach;
								wp_reset_postdata();?>
							
							</div>
							<?php
						else:
							
							foreach ( $resources_list AS $resource_item):			
								$resource_id = $resource_item['id'];		
								
								$post = get_post( $resource_id ); 							
								if ( has_category( 'in-the-news' )): 
									$permalink = esc_url( get_field( 'news-external-url' ));
									$target = '_blank';
								else:
									$permalink = esc_url( get_permalink( $resource_id ));
									$target = '';
								endif;
								
								// Item: Event, Post, Resource, Team							
								include( 'filters/article-' .$post_type. '.php' );	
								
								$i++; 
							endforeach;
							
						endif;												
							
					endif;
					
				else: ?>
				
					<div class="not-found">
						<h3><?php echo get_field( 'text_no_' .$post_type. '_found', 'options' ); ?></h3>
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
					if ( $pagination == 'ajax' ):
						$next_posts_link = get_next_posts_link($load_more_text . ' <i class="fa fas fa-arrow-down"></i>', $the_query->max_num_pages);
					
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
						
					else: ?>
											
						<div class="row pagination-row">
							<div class="col-12">
								<div class="pagination">
									<?php 
									$total_pages = $the_query->max_num_pages;
							
									if ($total_pages > 1){
							
											$current_page = max(1, get_query_var('paged'));
											
											$querystring_array = array();											
											if ( get_query_var('search') ):
												$querystring_array['search'] = get_query_var('search');
											endif;
											
											if ( get_query_var('news_topics') ):											
												$querystring_array['news_topics'] = get_query_var('news_topics');
											endif;
											
											if ( get_query_var('news_types') ):											
												$querystring_array['news_types'] = get_query_var('resource_topics');
											endif;
											
											// print ( '<pre>' );
											// print_r( $querystring_array );
											// print ( '</pre> ');
							
											echo paginate_links(array(
													'base' => preg_replace('/\?.*/', '/', get_pagenum_link(1)) . '%_%',
													'format' => 'page/%#%/',
													'current' => $current_page,
													'total' => $total_pages,
													'prev_text' => __('«'),
													'next_text' => __('»'),
													'add_args' => $querystring_array
											));
									}								
							
									wp_reset_postdata();	
									?>
								</div>
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
	
<?php endif; ?>	
			
</div>