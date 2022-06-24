<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

<div class="container">
	<div class="row">
		
		<div class="col-10 offset-1 col-md-8 offset-md-2">
			<div class="text">				
				<?php echo apply_filters( 'the_content', get_sub_field( 'quote' )); ?>
			</div>
			<div class="author">
				&ndash; <?php the_sub_field( 'name' ); ?>
			</div>
			<div class="title">		
				<?php the_sub_field( 'title' ); ?>							    	
			</div>
		</div>

	</div>	
</div>