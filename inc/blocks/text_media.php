<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<div class="container">

		<div class="row">
			
			<div class="col-12 col-md-<?php echo get_sub_field( 'text_width' ); ?> col-text<?php if ( !get_sub_field( 'text' )) echo ' no-text'; ?> <?php echo get_sub_field( 'text_alignment' );?>" >
				
				<?php include( get_stylesheet_directory() . '/inc/blocks/headings.php' ); ?>				
				
				<?php if ( get_sub_field( 'text' )): ?>
					<div class="text" style="color: <?php echo $text_color; ?>">
						<?php echo apply_filters( 'the_content', the_sub_field( 'text' )); ?>
					</div>
				<?php endif; ?>
				
				<?php if ( get_sub_field( 'button_link' )) {
					$link = get_sub_field( 'button_link' );?>
					<div class="buttons">
				 		<a class="btn <?php echo $theme_palette['btn_class']; ?>" href="<?php echo $link['url']?>" target="<?php echo $link['target']?>"><?php echo $link['title']; ?></a>
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
					elseif ( get_sub_field( 'video' )): ?>				
						<div class="video-wrapper">
							<?php echo get_sub_field( 'video' ); ?>
						</div>
						<?php	
					else:	?>
						<?php $image_mask = get_sub_field( 'image_mask' );
						$image_mask = $image_mask['image_mask'];
						if ( $image_mask ): ?>
							<div class="image-mask" style="-webkit-mask-image: url(<?php echo get_stylesheet_directory_uri();?>/img/masks/<?php echo $image_mask; ?>);
								mask-image: url(<?php echo get_stylesheet_directory_uri();?>/img/masks/<?php echo $image_mask; ?>);">
								<img src="<?php $image = get_sub_field( 'image' ); echo $image['sizes']['large']; ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
							</div>
							<?php
						else: ?>
							<img src="<?php $image = get_sub_field( 'image' ); echo $image['sizes']['large']; ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
							<?php 
						endif;?>					
						
					<?php 
					endif; ?>
				</div>
			</div>
										
		</div>
		
	</div>
</div>