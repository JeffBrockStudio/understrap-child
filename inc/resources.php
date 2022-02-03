<?php

// Set post type
$post_type = 'resource';
 
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
												<select id="select-<?php echo $taxonomy; ?>">
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
								
								<div class="clear-filters">
									<i class="far fa-times"></i> Clear all filters
								</div>
							</div>
								
							<div class="col-12 col-md-4 offset-md-1 col-search">		
								<div class="label"><?php echo $post_type_labels->search_items; ?></div>							
								
								<div class="search">
									<form id="<?php echo $post_type; ?>-search">
										<label class="sr-only" for="s">Search</label>
										<div class="input-group">
											<span class="input-group-prepend">
												<input class="submit" name="submit" type="submit" value="&#xf002;">
											</span>
											<input 
												id="<?php echo $post_type; ?>-search-query" 
												class="field form-control" 
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