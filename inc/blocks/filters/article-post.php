<?php
if ( has_category( 'in-the-news' )): 
	$permalink = esc_url( get_field( 'news-external-url' ));
	$target = '_blank';
else:
	$permalink = esc_url( get_permalink( $resource_id ));
	$target = '';
endif;
?>

<div class="col-12 col-md-6 col-lg-4">		
	<article <?php post_class(); ?>>
		
		<div class="entry-content">		
			<div class="row">
				
				<div class="col-12">
					<?php 
					if ( $show['thumbnails'] ):
						if ( get_the_post_thumbnail( $resource_id ) ): ?>
							<a href="<?php echo $permalink; ?>" target="<?php echo $target; ?>">
								<div class="featured-image">
									<?php echo get_the_post_thumbnail( $resource_id, 'thumbnail' ); ?>
								</div>
							</a>
							<?php 
						else: ?>
							<a href="<?php echo $permalink; ?>" target="<?php echo $target; ?>">
								<div class="featured-image">
									<img src="<?php $image = get_field( 'default_blog_image', 'options' ); echo $image['sizes']['thumbnail'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
								</div>
							</a>
						<?php 
						endif;
					endif; ?>
						
					<header class="entry-header">
						
							<div class="entry-meta">
								<?php understrap_posted_on(); ?>																
							
								<?php if ( $show['taxonomies'] ): ?>
								
									<div class="taxonomies">
										<div class="news-types">
											<?php 
											$news_types = get_the_terms( $resource_id, 'news_types' );
											if( $news_types ):
												$news_types_array = array();
												foreach ( $news_types AS $news_type ) {
													$news_types_array[] = '<span>' .  $news_type->name . '</span>';
												}
												echo implode( ' ', $news_types_array );
											endif; ?>										
										</div>
										
										<?php 
										$taxonomy = get_the_terms( $resource_id, 'news_topics' );					
										if( $taxonomy ):
											$taxonomy_array = array();
											foreach ( $taxonomy AS $term ) {
												$taxonomy_array[] = '<span>' .  $term->name . '</span>';
											}?>
											<div class="news-topics">
												<?php echo implode( ' &#8226; ', $taxonomy_array );?>
											</div>
											<?php
										endif;
										?>			
									</div>
									
								<?php endif; ?>
								
							</div>
						
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