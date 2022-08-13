<div class="sticky-article <?php echo $post_type; ?>" id="sticky-<?php echo $post_type; ?>">
	<div class="container" tabindex="-1">
		<div class="row">
	
			<div class="col-12 col-md-5">
				<?php if ( get_the_post_thumbnail( $post->ID )): ?>
					<div class="featured-image">
						<a href="<?php echo esc_url( get_permalink()); ?>">
							<?php echo get_the_post_thumbnail( $post->ID, 'thumbnail_4_3' ); ?>
						</a>
					</div>
				<?php endif; ?>
			</div>
			
			<div class="col-12 col-md-7">							
					
				<h2><?php	the_title();?></h2>
				
				<div class="excerpt">
					<?php				
					if ( $post->post_excerpt ):						
						echo strip_tags( $post->post_excerpt );
					else:
						$content = apply_filters('the_content', $post->post_content);
						$content = str_replace(']]>', ']]&gt;', $content);
						echo understrap_limit_text( $content, 50 );
					endif;
					?>
				</div>
				
				<?php if ( $show['button'] ): ?>
					<div class="buttons">
						<a class="btn btn-primary" href="<?php echo esc_url( get_permalink()); ?>">Learn More</a>
					</div>
				<?php endif; ?>
						
			</div>
			
		</div>
	</div>
</div>