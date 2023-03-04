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
										<img src="<?php $image = get_field( 'default_image_post', 'options' ); echo $image['sizes']['medium'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
									</div>
								</a>
							<?php 
							endif;
						endif; ?>
					</div>
										
					<div class="col-12 col-md-8">		
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