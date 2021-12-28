<div id="<?php echo $block_id;?>" class="block locations" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?><?php if ( get_sub_field( 'background_color' ) ): echo ' background-color: ' . get_sub_field( 'background_color' ). '; '; endif; ?>">
	<div class="container">
		<div class="row">
			
			<div class="col-12">
				<<?php the_sub_field( 'heading_level' );?> class="heading"><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
				<div class="text">
					<?php echo apply_filters( 'the_content', the_sub_field( 'text' )); ?>
				</div>
			</div>
		
		</div>
			
		<?php 
		if ( get_sub_field( 'locations' )) {?>
			<div class="row row-locations">
				<?php
				$items = get_sub_field( 'locations' );
				foreach ( $items AS $item ) {?>
					<div class="col-12 col-md-6">
						<div class="location">
							
							<div class="map-embed">
								<?php echo $item['map_embed']; ?>
							</div>
															
							<h3><?php echo $item['heading'];?></h3>
							
							<div class="address">
								<?php echo $item['address'];?>
							</div>
							
							<div class="phone">
								<a href="<?php echo format_phone( $item['phone'] ); ?>"><?php echo $item['phone'];?></a>
							</div>
													
						</div>
					</div>
					<?php
				}?>
			</div>
			<?php
		}
		?>
		
	</div>
</div>