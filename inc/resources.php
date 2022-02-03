<?php 
$args = array( 
	'post_type' => 'resource',
	'posts_per_page' => '-1',
	'post_status' => 'publish',
	'meta_key'		=> 'resource_sticky',
	'meta_value'	=> '1'
);
$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ): ?>

	<div id="featured-resource">
		<div class="container" tabindex="-1">
			<div class="row no-gutters">
							
				<?php
				while ( $the_query->have_posts() ):
					$the_query->the_post(); ?>
					<div class="col-12 resource">
						<p class="superheading">Featured Resource</p>							
						<h3><?php the_title(); ?></h3>
						<?php
						if ( get_field( 'resource_short_description_text', $post->ID )): ?>
							<div class="text">
								<?php echo apply_filters( 'the_content', get_field( 'resource_short_description_text', $post->ID ));  ?>
							</div>
							<?php
						endif;
						?>
						<a href="<?php the_permalink(); ?>" class="btn btn-primary">View Resource</a>						
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

<div id="resources-filter-wrapper" class="filter-wrapper">
	<div class="container">
		<div class="row">
			<div class="col-12">	
				<div class="filters-search">
					<div class="filters"> 	
						
						<div class="row">

							<div class="col-12 col-md-7">
								<div class="label">Filter by:</div>
								
								<div class="row">
									<div class="col-12 col-md-6">																						
										<div class="filter resource_topic">
											<form>
												<label for="select-resource_topic" class="sr-only">Topic</label>
												<select id="select-resource_topic" class="selectpicker" data-live-search="false">
													<option value="" selected>Topic</option>
													<?php
													if ( isset( $_GET['resource_topics'] )):
														$current = $_GET['resource_topics'];
													else:
														$current = '';
													endif; 		 
													$terms = get_terms( array(
														'taxonomy' => 'resource_topics',
														'hide_empty' => false
													) );   
													foreach ( $terms AS $term ) {?>
														<option value="<?php echo $term->slug; ?>"<?php if ( $term->slug == $current) { echo ' selected'; };  ?>><?php echo $term->name; ?></option>
															<?php 
													};
													wp_reset_postdata(); ?> 		                        
												</select>
											</form>				
										</div>									
									</div>

									<div class="col-12 col-md-6">
										<div class="filter resource_type">										
											<form>
												<div class="form-group">
													<label for="select-resource_type" class="sr-only">Type</label>
													<select id="select-resource_type" class="selectpicker">
														<option value="" selected>Type</option>
														<?php
														$current = $_GET['resource_types'];		 
														$terms = get_terms( array(
															'taxonomy' => 'resource_types',
															'hide_empty' => false
														) );   
														foreach ( $terms AS $term ) {?>
															<option value="<?php echo $term->slug; ?>"<?php if ( $term->slug == $current) { echo ' selected'; };  ?>><?php echo $term->name; ?></option>
																<?php 
														};
														wp_reset_postdata(); ?> 		                        
													</select>
												</div>
											</form>				
										</div>
									</div>
								</div>
								
								<div class="clear-filters">
									<i class="far fa-times"></i> Clear all filters
								</div>
							</div>
								
							<div class="col-12 col-md-4 offset-md-1 col-search">		
								<div class="label">Search all resources</div>							
								
								<div class="search">
									<form id="resources-search">
										<label class="sr-only" for="s">Search</label>
										<div class="input-group">
											<span class="input-group-prepend">
												<input class="submit" name="submit" type="submit" value="&#xf002;">
											</span>
											<input id="resources-search-query" class="field form-control" type="text"
												placeholder="<?php if ( isset($_GET['search']) ) { esc_attr_e( $_GET['search'], 'understrap' ); } else { esc_attr_e( 'Search resources', 'understrap' ); }; ?>" value="">											
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