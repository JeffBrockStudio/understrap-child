<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<div class="container">
		<div class="row">
			<?php if ( get_sub_field( 'width' ) == 'narrow'):
				$columns = 'col-12 col-md-8 offset-md-2';
			else:
				$columns = 'col-12';
			endif; ?>
			<div class="<?php echo $columns;?>">
					
				<div class="text">
					<?php echo apply_filters( 'the_content', get_sub_field( 'wysiwyg' )); ?>
				</div>
	
			</div>
		</div>
	</div>
</div>