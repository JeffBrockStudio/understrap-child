<div class="sticky-article <?php echo $post_type; ?>" id="sticky-<?php echo $post_type; ?>">
	<div class="container" tabindex="-1">
		<div class="row no-gutters">
						
			<div class="col-12">
				<p class="superheading"><?php _e('Featured', 'powehi') ?> <?php echo $post_type_labels->singular_name; ?></p>							
				<h3><?php the_title(); ?></h3>
				<?php
				if ( get_field( $post_type . '_short_description_text', $post->ID )): ?>
					<div class="excerpt">
						<?php echo apply_filters( 'the_content', get_field( $post_type . '_short_description_text', $post->ID ));  ?>
					</div>
					<?php
				endif;
				?>
				<div class="buttons">
					<a href="<?php the_permalink(); ?>" class="btn btn-primary"><?php echo $post_type_labels->view_item; ?></a>						
				</div>
			</div>
			
		</div>
	</div>
</div>		