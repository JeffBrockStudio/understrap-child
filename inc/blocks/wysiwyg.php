<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<div class="container">
		
		<?php if ( get_sub_field( 'width' ) == 'narrow'):
			if ( get_sub_field( 'alignment' ) == 'right' ):
				$columns = 'col-10 offset-2 col-md-8 offset-md-4';
			elseif ( get_sub_field( 'alignment' ) == 'left' ):
				$columns = 'col-10 col-md-8';
			else:				
				$columns = 'col-10 offset-1 col-md-8 offset-md-2';
			endif;
		else:
			$columns = 'col-12';
		endif; ?>
		
		<?php if ( get_sub_field( 'heading' )): ?>
			<?php include( get_stylesheet_directory() . '/inc/blocks/headings.php' ); ?>
		<?php endif; ?>
		
		<div class="row">
			
			<div class="<?php echo $columns;?>">
					
				<div class="text columns-<?php echo get_sub_field( 'columns' ); ?>">
					<?php echo apply_filters( 'the_content', get_sub_field( 'wysiwyg' )); ?>
				</div>
	
			</div>
		</div>
	</div>
</div>