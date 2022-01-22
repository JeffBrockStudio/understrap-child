<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<div class="container">
		<div class="row">
	
			<div class="col-12 col-md-5">
				<?php if ( get_sub_field( 'image' )): ?>
					<div class="image">
						<img src="<?php $image = get_sub_field( 'image' ); echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
					</div>
				<?php endif; ?>
			</div>
			
			<div class="col-12 col-md-7">	
				<?php if ( get_sub_field( 'text' ) OR get_sub_field( 'heading' )): ?>
					<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
					<div class="text">
						<?php echo apply_filters( 'the_content', the_sub_field( 'text' )); ?>
					</div>
				<?php endif; ?>					
			</div>					
				
		</div>		
	</div>

</div>