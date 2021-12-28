<div id="<?php echo $block_id;?>" class="block statistics" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?><?php if ( get_sub_field( 'background_color_section' ) ): echo ' background-color: ' . get_sub_field( 'background_color_section' ). '; '; endif; ?>">

	<div class="heading-wrapper" style="<?php echo ' background-color: ' . get_sub_field( 'background_color_heading' ). '; '?>">
		<div class="container">
			<div class="row">		
							
				<div class="col-12">
					<<?php the_sub_field( 'heading_level' );?> class="heading"><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
				</div>
				
			</div>
		</div>
	</div>		
	
	<div class="statistics-wrapper"> 	
		<div class="container">
			<div class="row">
				
				<?php 
				if ( get_sub_field( 'statistics' )) {
					$items = get_sub_field( 'statistics' );
					foreach ( $items AS $item ) {?>
						<div class="col-12 col-md-4">
							<div class="statistic">
								<div class="number">
									<h4><?php echo $item['heading'];?></h4>
								</div>
								<div class="text">
									<?php echo $item['text'];?>
								</div>
							</div>
						</div>
						<?php
					}
				}
				?>
				
			</div>
		</div>
	</div>
</div>