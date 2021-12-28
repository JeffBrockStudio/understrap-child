<div class="block embedded-video" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?>">
	<div class="container">
		<div class="row">
			
			<div class="col-12 col-lg-11">
				<div class="video-wrapper">
					<?php echo get_sub_field( 'video_url' ); ?>
				</div>
				
				<?php if ( get_sub_field( 'video_heading' )) {?>
					<h2><?php the_sub_field( 'video_heading' ); ?></h2>
					<hr>									
					<?php
				}?>
	
				<?php if ( get_sub_field( 'video_text' )) {?>
					<div class="text">
						<?php echo apply_filters( 'the_content', get_sub_field( 'video_text' )); ?>
					</div>
				<?php } ?>
			</div>
				
		</div>
	</div>
</div>