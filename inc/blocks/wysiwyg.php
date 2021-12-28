<div id="<?php echo $block_id; ?>" class="block wrapper wysiwyg" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?><?php if ( get_sub_field( 'background_color' ) ): echo ' background-color: ' . get_sub_field( 'background_color' ). '; '; endif; ?>">
	<div class="container">
		<div class="row row-wysiwyg">
			<div class="col-12 col-md-<?php echo get_sub_field( 'columns' );?>">
					
				<div class="text">
					<?php echo apply_filters( 'the_content', get_sub_field( 'wysiwyg' )); ?>
				</div>
	
			</div>
		</div>
	</div>
</div>