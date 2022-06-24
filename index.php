<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );

$post_id = get_option( 'page_for_posts' );
$post_type = 'post';

// Get labels for post type
$post_type_object = get_post_type_object( $post_type ); 
$post_type_labels = $post_type_object->labels;

?>

<?php if ( is_front_page() && is_home() ) : ?>
	<?php get_template_part( 'global-templates/hero' ); ?>
<?php endif; ?>

<div class="wrapper" id="index-wrapper">
	
	<?php require( 'inc/blocks.php' ); ?>
	
	<?php if ( get_field( 'blog_newsletter_signup_form', $post_id )): ?>
		<div id="newsletter-signup-body">
			<div class="<?php echo esc_attr( $container ); ?>">
				<div class="row">
					
					<div class="col-12">
						<?php if ( get_field( 'blog_newsletter_signup_heading', $post_id )): ?>
							<h3 class="newsletter-heading"><?php echo get_field( 'blog_newsletter_signup_heading', $post_id ); ?></h3>
						<?php endif; ?>
						<?php       
						echo FrmFormsController::get_form_shortcode(array(
							'id' => get_field( 'blog_newsletter_signup_form', $post_id ), 
							'title' => false, 
							'description' => false
						));	          
						?>		
					</div>
				</div>
				
			</div>
		</div>
	<?php endif; ?>
	
	<?php
	$args = array( 
		'post_type' => 'post',
		'posts_per_page' => '1',
		'post__in' => get_option( 'sticky_posts' ),
		'post_status' => 'publish',					
		'ignore_sticky_posts' => 1
	);
	$the_query = new WP_Query( $args );
	if ( $the_query->have_posts() ) {
		while ( $the_query->have_posts() ) {
			$the_query->the_post();?>
				<div id="featured-post">			
					<div class="container" id="content" tabindex="-1">
						<div class="row">
					
							<div class="col-12 col-md-4">
								<?php if ( get_the_post_thumbnail( $post->ID )): ?>
									<div class="featured-image">
										<a href="<?php echo esc_url( get_permalink()); ?>">
											<?php echo get_the_post_thumbnail( $post->ID, 'thumbnail_4_3' ); ?>
										</a>
									</div>
								<?php endif; ?>
							</div>
							
							<div class="col-12 col-md-8">							
									
								<h2><?php	the_title();?></h2>
								
								<div class="excerpt">
									<?php				
									if ( $post->post_excerpt ):						
										echo strip_tags( $post->post_excerpt );
									else:
										// $content = apply_filters('the_content', $content);
										// $content = str_replace(']]>', ']]&gt;', $content);
										// echo understrap_limit_text( $content, 50 );
									endif;
									?>
								</div>
								
								<div class="buttons">
									<a class="btn btn-primary" href="<?php echo esc_url( get_permalink()); ?>">Learn More</a>
								</div>
										
							</div>
							
						</div>
					</div>
				</div>
			<?php						
		}
	};
	wp_reset_postdata();?>
			
	<div id="<?php echo $post_type; ?>-filter-wrapper" class="filter-wrapper">
		<div class="<?php echo esc_attr( $container ); ?>">
			<div class="row">
				
				<div class="col-12">						
					<div class="filters-search">
						<div class="filters"> 								
							<div class="row">
								<?php $taxonomies = get_object_taxonomies( $post_type );									
								foreach ( $taxonomies AS $taxonomy ): 
									if ( $taxonomy != 'post_format'):
									$taxonomy_details = get_taxonomy( $taxonomy );
									$taxonomy_labels = $taxonomy_details->labels;
									?>
									<div class="col-12 col-md-3">		
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
									endif;
								endforeach;										
								?>								
						
								<div class="col-12 col-md-3">
									<?php /* ?>
									<div class="label"><?php echo $post_type_labels->search_items; ?></div>							
									<?php */ ?>
									
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

									<div class="clear-filters">
										<i class="far fa-times"></i> Clear all filters
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
		'paged' => $paged,
		'post__not_in' => get_option( 'sticky_posts' )
	);
	
	// Get newest/oldest sorting from URL
	if ( array_key_exists( 'sort', $_GET ) && $_GET['sort'] ) {
		$sort = $_GET['sort'];		
	} else {
		$sort = 'ASC';	
	};																													
								
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
							
	// Search	
	if ( array_key_exists( 'search', $_GET ) && $_GET['search'] ) {
		$search_query = $_GET['search'];
		
		$args = array( 
			'fields' => 'ids', 
			'post_type' => $post_type,
			'posts_per_page' => -1,
			'post_status' => 'publish',
			'orderby' => 'title',
			'order' => $sort,
			's' => $_GET['search']	                 					                          
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
					'posts_per_page' => 10,
					'orderby' => 'date',
					'order' => $sort,
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
											
	<div id="<?php echo $post_type; ?>-list-wrapper" class="list-wrapper">
		<div class="<?php echo esc_attr( $container ); ?>">
		
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
								$resource_id = $resource_item['id'];
								$post = get_post( $resource_id ); ?>
								
								<div class="item <?php echo $post_type; ?>">		
									<article <?php post_class(); ?>>
										
										<div class="entry-content">		
											<div class="row">
												
												<div class="col-12 col-md-4">
													<?php if ( get_the_post_thumbnail( $resource_id )): ?>
														<a href="<?php echo esc_url( get_permalink( $resource_id )); ?>">
															<div class="featured-image">
																<?php echo get_the_post_thumbnail( $resource_id, 'thumbnail_4_3' ); ?>
															</div>
														</a>
													<?php endif; ?>
												</div>
												
												<div class="col-12 col-md-8">
													
													<header class="entry-header">
														
															<div class="type">
																<?php 
																$news_types = get_the_terms( $resource_id, 'category' );
																if( $news_types ):
																	$news_types_array = array();
																	foreach ( $news_types AS $news_type ) {
																		$news_types_array[] = '<span>' .  $news_type->name . '</span>';
																	}
																endif;
																echo implode( ' &#8226; ', $news_types_array ); ?>										
															</div>
														
															<div class="entry-meta">
																<?php understrap_posted_on(); ?>
															</div>
													
														<?php
														the_title(
															sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ),
															'</a></h2>'
														);
														?>
													
													</header><!-- .entry-header -->	
													
													<div class="excerpt">
														<?php																				
														if ( $post->post_excerpt ):						
															echo strip_tags( $post->post_excerpt );
														else:
															// $content = apply_filters('the_content', $content);
															// $content = str_replace(']]>', ']]&gt;', $content);
															// echo understrap_limit_text( $content, 50 );
														endif;
														?>
													</div>
																	
													<?php 
													$taxonomy = get_the_terms( $resource_id, 'focus_areas' );					
													if( $taxonomy ):
														$taxonomy_array = array();
														foreach ( $taxonomy AS $term ) {
															$taxonomy_array[] = '<span>' .  $term->name . '</span>';
														}?>
														<div class="focus-areas">
															<?php echo implode( ' &#8226; ', $taxonomy_array );?>
														</div>
														<?php
													endif;
													?>				
													
												</div>
											
											</div>	
										</div>
									
									</article>
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

</div><!-- #index-wrapper -->

<?php
get_footer();
