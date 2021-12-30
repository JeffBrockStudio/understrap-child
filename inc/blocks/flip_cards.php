<div id="<?php echo $block_id;?>" class="block flip-cards" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?><?php if ( get_sub_field( 'background_color' ) ): echo ' background-color: ' . get_sub_field( 'background_color' ). '; '; endif; ?>">
	<div class="container">
		<div class="row">
			
			<div class="col-12">
				<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
				<div class="text">
					<?php echo apply_filters( 'the_content', the_sub_field( 'text' )); ?>
				</div>
			</div>
		
		</div>
			
		<?php 
		if ( get_sub_field( 'cards' )) {?>
			<div class="row row-flip-cards">
				<?php
				$items = get_sub_field( 'cards' );
				foreach ( $items AS $item ) {?>
					<div class="col-12 col-md-6 col-lg-4">
						<div class="flip-card-wrapper">
							
							<div class="front">
								<div class="image">
									<img src="<?php $image = $item['image']; echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
								</div>
								<div class="heading">
									<h3><?php echo $item['heading'];?></h3>
								</div>
							</div>
							
							<div class="back" style="background-color: <?php echo get_sub_field( 'background_color_flipped_card' ); ?>">
								<div class="heading">
									<h4><?php echo $item['heading'];?></h4>
								</div>
																		
								<div class="text">
									<?php echo $item['text'];?>
								</div>
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