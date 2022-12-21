<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

<div class="container">
	<div class="row">
		
		<div class="col-10 offset-1 col-md-8 offset-md-2">
			<div class="text">				
				<?php echo apply_filters( 'the_content', get_sub_field( 'quote' )); ?>
			</div>
			<?php 
			$name = get_sub_field( 'name' );
			$title = get_sub_field( 'title' );
			if ( $name ): ?>  
				<div class="author">
					<?php echo '&mdash; ' . $name; ?>
				</div>
			<?php endif;
			if ( $title ): ?>  
			<div class="title">		
				<?php echo $title; ?>						    	
			</div>
			<?php endif; ?>
		</div>

	</div>	
</div>

</div>