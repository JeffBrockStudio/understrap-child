<div id="<?php echo $block_id; ?>" class="block form" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?><?php if ( get_sub_field( 'background_color' ) ): echo ' background-color: ' . get_sub_field( 'background_color' ). '; '; endif; ?>">
	<div class="container">
		<div class="row">		
			<div class="col-12">
				<?php 
				if ( get_sub_field( 'form' )) {?>
					<div class="form">
						<?php echo FrmFormsController::get_form_shortcode( array( 'id' => get_sub_field( 'form' ), 'title' => false, 'description' => false ) ); ?>
						<?php // echo do_shortcode( '[gravityform id="' .get_sub_field( 'form' ). '" title="false" description="false" ajax="true"]' ); ?>
					</div>		
					<?php
				}
				?>
			</div>
		</div>
	</div>
</div>
