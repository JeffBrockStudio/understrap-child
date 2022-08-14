<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<div class="container">

		<div class="row">
			
			<?php if ( get_sub_field( 'text_width' ) == 4 ): ?>
				<div class="col-12">
					<<?php the_sub_field( 'heading_level' );?> class="full-width"><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
				</div>
			<?php endif; ?>			
			
			<div class="col-12 col-md-<?php echo get_sub_field( 'text_width' ); ?> col-text<?php if ( !get_sub_field( 'text' )) echo ' no-text'; ?>">
				
				<?php if ( get_sub_field( 'text_width' ) != 4 ): ?>				
					<?php include( get_stylesheet_directory() . '/inc/blocks/headings.php' ); ?>				
				<?php endif; ?>	
				
				<?php if ( the_sub_field( 'text' )): ?>
					<div class="text">
						<?php echo apply_filters( 'the_content', the_sub_field( 'text' )); ?>
					</div>
				<?php endif; ?>
				
				<?php if ( get_sub_field( 'button_link' )) {
					$link = get_sub_field( 'button_link' );?>
					<div class="buttons">
				 		<a class="btn btn-primary" href="<?php echo $link['url']?>" target="<?php echo $link['target']?>"><?php echo $link['title']; ?></a>
					</div>
				<?php } ?>									
			</div>														
			
			<?php  if ( get_sub_field( 'interactive_image' )): 
				$col_image_width = 4;
			else:
				$col_image_width = 12 - get_sub_field( 'text_width' );
			endif;
		  ?>
			
			<div class="col-12 col-md-<?php echo $col_image_width; ?> col-image">
				<div class="image">
					<?php if ( get_sub_field( 'interactive_image' )): 
						$interactive_image = get_sub_field( 'interactive_image' );
						echo do_shortcode( '['. $interactive_image .']' );
					else:	?>
						<img src="<?php $image = get_sub_field( 'image' ); echo $image['sizes']['large']; ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
					<?php 
					endif; ?>
				</div>
			</div>
										
		</div>
		
	</div>
</div>