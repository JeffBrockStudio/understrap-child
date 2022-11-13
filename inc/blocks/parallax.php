<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

<?php 
if ( get_sub_field( 'parallax_images' )):
	$items = get_sub_field( 'parallax_images' );				
	foreach ( $items AS $item ) {?>
		
		<?php if ( get_sub_field('parallax_speed')):
			$parallax_speed = get_sub_field('parallax_speed') / 100;
		else:  
			$parallax_speed = 0.4;
		endif; ?>
		<div 
			class="image image-<?php echo count( $items );?>" 
			data-parallax="scroll" 
			data-image-src="<?php $image = $item['image']; echo $image['sizes']['2048x2048']; ?>"
			data-speed="<?php echo $parallax_speed; ?>"
			data-bleed="2"
			data-natural-width="<?php echo $image['width'] ?>"
			data-natural-height="<?php echo $image['height'] ?>">			 
		</div>	
		<?php						
	} 
endif;
?>
					
</div>
	