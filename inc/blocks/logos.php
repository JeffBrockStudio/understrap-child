<div id="<?php echo $block_id;?>" class="block logos" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?><?php if ( get_sub_field( 'background_color' ) ): echo ' background-color: ' . get_sub_field( 'background_color' ). '; '; endif; ?>">
	<div class="container">
		<div class="row">		
			
			<div class="col-12">
				<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
				<div class="text text-<?php the_sub_field( 'heading_level' );?>">
					<?php echo apply_filters( 'the_content', get_sub_field( 'text' )); ?>
				</div>
			</div>
			
		</div>
		
		<div class="row row-logos">
			
			<?php 
			if ( get_sub_field( 'logos' )) {
				$items = get_sub_field( 'logos' );
				foreach ( $items AS $item ) {?>
					<div class="col-12 col-md-4 col-lg-2">
						<div class="image">
							<a href="<?php echo $item['url']; ?>" target="_blank">
								<img src="<?php $image = $item['image']; echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
							</a>
						</div>
					</div>
					<?php
				}
			}
			?>
			
		</div>
	</div>
</div>