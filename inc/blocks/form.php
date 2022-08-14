<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<div class="container">
		
		<?php if ( get_sub_field( 'heading' )): ?>
			<div class="row">
				<div class="col-12 col-lg-8 offset-lg-2">					
					<?php include( get_stylesheet_directory() . '/inc/blocks/headings.php' ); ?>
				</div>
			</div>
		<?php endif; ?>
		
		<div class="row">		
		
			<div class="col-12 col-lg-8 offset-lg-2">
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
