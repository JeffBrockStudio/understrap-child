<?php

if ( has_category( 'in-the-news' )): 
	$permalink = esc_url( get_field( 'news-external-url' ));
	$target = '_blank';
else:
	$permalink = get_permalink( $resource_id );
	$target = '';
endif;

/**
 * List
 */
if ( $layout == 'list' ): ?>
	
	<div class="item col-12">		
		<article <?php post_class(); ?>>
			
			<div class="entry-content">		
				<div class="row">
					
					<div class="col-12 col-md-4">
						<?php 
						if ( $show['thumbnails'] ):
							if ( get_the_post_thumbnail( $resource_id ) ): ?>
								<a href="<?php echo $permalink; ?>" target="<?php echo $target; ?>">
									<div class="featured-image">
										<?php echo get_the_post_thumbnail( $resource_id, 'medium' ); ?>
									</div>
								</a>
								<?php 
							else: ?>
								<a href="<?php echo $permalink; ?>" target="<?php echo $target; ?>">
									<div class="featured-image">
										<img src="<?php $image = get_field( 'default_image_event', 'options' ); echo $image['sizes']['medium'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
									</div>
								</a>
							<?php 
							endif;
						endif; ?>
					</div>
										
					<div class="col-12 col-md-8">		
						<header class="entry-header">							
							<h2 class="entry-title"><?php the_title(); ?></h2>
						</header><!-- .entry-header -->	
							
							<div class="date">																	
								<h3><?php echo date( 'D, m/d/Y', strtotime( get_field( 'event_start_date', $post->ID )));	?></h3>
								<?php if ( get_field( 'event_start_time', $post->ID )): ?>
									<div class="time">| <?php echo get_field( 'event_start_time', $post->ID );
									if ( get_field( 'event_end_time', $post->ID )):
										echo ' - ' . get_field( 'event_end_time', $post->ID );
									endif;
									?></div>
								<?php endif; ?>																									
							</div>
							
							<div class="location">								
								<?php if ( get_field( 'event_location_text', $post->ID )):?>
									<div class="location-text">
										<?php echo get_field( 'event_location_text', $post->ID ); ?>
									</div>
								<?php endif; ?>
								<?php if ( get_field( 'event_location_address', $post->ID )):?>
									<div class="address">
										<?php echo get_field( 'event_location_address', $post->ID ); ?>
									</div>
								<?php endif; ?>
								<?php if ( get_field( 'event_location_city', $post->ID ) OR get_field( 'event_location_state',  $post->ID ) OR get_field( 'event_location_zip',  $post->ID ) ):?>
									<div class="city-state-zip">
										<?php echo get_field( 'event_location_city', $post->ID ); ?>
										<?php echo get_field( 'event_location_state', $post->ID ); ?> 										
										<?php echo get_field( 'event_location_zip', $post->ID ); ?>
									</div>
									<div class="map-link">
										<?php if ( get_field( 'event_location_google_map_link', $post->ID )):
												$map_link = get_field( 'event_location_google_map_link', $post->ID );												
											else:												
												$map_link = 'https://www.google.com/maps?q=' .
												urlencode(get_field( 'event_location_address', $post->ID )) . ',' .
												urlencode(get_field( 'event_location_city', $post->ID )) . ',' .
												urlencode(get_field( 'event_location_state', $post->ID )) . ',' .
												urlencode(get_field( 'event_location_zip', $post->ID ));												
											endif;
											?>										
										[<a href="<?php echo $map_link ?>" target="_blank"><?php _e('Map', 'powehi'); ?></a>]
									</div>
								<?php endif; ?>
							</div>														
							
							<?php if ( $show['taxonomies'] ): ?>								
								<div class="entry-meta">							
									<div class="taxonomies">
										<div class="news-types">
											<?php 
											$news_types = get_the_terms( $resource_id, 'event_types' );
											if( $news_types ):
												$news_types_array = array();
												foreach ( $news_types AS $news_type ) {
													$news_types_array[] = '<span>' .  $news_type->name . '</span>';
												}
												echo implode( ', ', $news_types_array );
											endif; ?>										
										</div>									
									</div>							
								</div>										
							<?php endif; ?>														
						
						<?php if ( $show['excerpt'] AND $post->post_content != '' ) : ?>
							<div class="excerpt">
								<?php																				
								if ( $post->post_excerpt ):						
									echo strip_tags( $post->post_excerpt );
								else:
									$content = apply_filters('the_content',  $post->post_content );
									$content = str_replace(']]>', ']]&gt;', $content);
									echo understrap_limit_text( $content, 50 );
								endif;
								?>
							</div>
						<?php endif; ?>
						
						<?php if ( get_field( 'event_rsvp', $post->ID )): ?>
							<div class="buttons">
								<a class="btn btn-secondary" href="<?php $link = get_field( 'event_rsvp_link', $post->ID ); echo $link['url'];?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></a>
						<?php endif; ?>		
						
						<?php if ( $show['button'] ): ?>
							<div class="buttons">
								<a class="btn btn-primary" href="<?php echo $permalink; ?>" target="<?php echo $target; ?>"><?php _e('Read More', 'powehi'); ?></a>
							</div>
						<?php endif; ?>
						
					</div>
					
				</div>	
			</div>
		
		</article>
	</div>
	
	<?php	
	
/**
 * Grid
 */
else: ?>
	
	<div class="item col-12 col-md-6 col-lg-4">		
		<article <?php post_class(); ?>>
			
			<div class="entry-content">		
				<div class="row">
					
					<div class="col-12">
						<?php 
						if ( $show['thumbnails'] ):
							if ( get_the_post_thumbnail( $resource_id ) ): ?>
								<a href="<?php echo $permalink; ?>" target="<?php echo $target; ?>">
									<div class="featured-image">
										<?php echo get_the_post_thumbnail( $resource_id, 'medium' ); ?>
									</div>
								</a>
								<?php 
							else: ?>
								<a href="<?php echo $permalink; ?>" target="<?php echo $target; ?>">
									<div class="featured-image">
										<img src="<?php $image = get_field( 'default_blog_image', 'options' ); echo $image['sizes']['medium'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
									</div>
								</a>
							<?php 
							endif;
						endif; ?>
							
						<header class="entry-header">
							
							<div class="entry-meta">
								<?php understrap_posted_on(); ?>
							</div>																
							
							<?php if ( $show['taxonomies'] ): ?>								
								<div class="taxonomies">										
									<?php 
									$taxonomy = get_the_terms( $resource_id, 'category' );
									if( $taxonomy ):?>											
											<?php
											$taxonomy_array = array();
											foreach ( $taxonomy AS $term ) {
												$taxonomy_array[] = '<span>' .  $term->name . '</span>';
											}?>
											<div class="taxonomy">
												<?php echo implode( ' &#8226; ', $taxonomy_array );?>
											</div>
										<?php
									endif; ?>										
									
									<?php 
									$taxonomy = get_the_terms( $resource_id, 'focus_areas' );					
									if( $taxonomy ):
										$taxonomy_array = array();
										foreach ( $taxonomy AS $term ) {
											$taxonomy_array[] = '<span>' .  $term->name . '</span>';
										}?>
										<div class="taxonomy">
											<?php echo implode( ' &#8226; ', $taxonomy_array );?>
										</div>
										<?php
									endif;
									?>			
								</div>									
							<?php endif; ?>
									
							<?php
							the_title(
								sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', $permalink ),
								'</a></h2>'
							);
							?>
						
						</header><!-- .entry-header -->	
						
						<?php if ( $show['excerpt'] ): ?>
							<div class="excerpt">
								<?php																				
								if ( $post->post_excerpt ):						
									echo strip_tags( $post->post_excerpt );
								else:
									$content = apply_filters('the_content',  $post->post_content );
									$content = str_replace(']]>', ']]&gt;', $content);
									echo understrap_limit_text( $content, 50 );
								endif;
								?>
							</div>
						<?php endif; ?>
						
						<?php if ( $show['button'] ): ?>
							<div class="buttons">
								<a class="btn btn-primary" href="<?php echo $permalink; ?>" target="<?php echo $target; ?>">Read More</a>
							</div>
						<?php endif; ?>
						
					</div>
					
				</div>	
			</div>
		
		</article>
	</div>
	<?php
endif;
?>