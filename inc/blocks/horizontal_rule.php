<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<div class="container">
		<div class="row">
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
			<div class="<?php echo $columns;?>">
				<hr />					
			</div>
		</div>
	</div>
</div>