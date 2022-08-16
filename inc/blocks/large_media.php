<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

<?php 
if ( get_sub_field( 'width' ) == 'narrow' ):	
	if ( get_sub_field( 'alignment' ) == 'right' ):
		$columns = 'col-12 col-md-10 offset-md-2';
	elseif ( get_sub_field( 'alignment' ) == 'left' ):
		$columns = 'col-12 col-md-10';
	else:				
		$columns = 'col-12 offset-md-1 col-md-10';
	endif;
else:
	$columns = 'col-12';
endif;?>

	<div class="container">
		<div class="row">
			
			<div class="<?php echo $columns; ?>">				
			
				<?php if ( get_sub_field( 'text' )): ?>
					<div class="wp-caption">
				<?php endif; ?>	
					
				<?php if ( get_sub_field( 'video' )): ?>				
					<div class="video-wrapper">
						<?php echo get_sub_field( 'video' ); ?>
					</div>					
					<?php	
				else:	?>
					<div class="image">
						<img src="<?php $image = get_sub_field( 'image' ); echo $image['sizes']['large']; ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
					</div>
				<?php 
				endif; ?>
				
				<?php if ( get_sub_field( 'text' )): ?>
						<div class="wp-caption-text"><?php echo apply_filters( 'the_content', get_sub_field( 'text' )); ?></div>						
					</div>
				<?php endif; ?>	
				
			</div>
			
		</div>
	</div>
		
</div>