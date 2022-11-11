<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<div class="container">

		<div class="row">
			
			<div class="col-12 col-md-10 offset-md-1">
				<?php if ( get_sub_field( 'heading' )): ?>
					<?php include( get_stylesheet_directory() . '/inc/blocks/headings.php' ); ?>
				<?php endif; ?>
			</div>

			<div class="col-12 col-md-10 offset-md-1">
				
				<?php if ( get_sub_field( 'text' )): ?>
					<div class="text">
						<?php echo apply_filters( 'the_content', the_sub_field( 'text' )); ?>
					</div>
				<?php endif; ?>
				
				<?php $link = get_sub_field( 'button' );
				if ($link): ?>
					<div class="buttons">
						<a class="btn btn-primary" href="<?php echo $link['url'];?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></a>
					</div>
					<?php
				endif;?>
				
			</div>														
		
		</div>
		
	</div>

</div>