<style>
	#<?php echo $block_id;?>.block.cards:after {
		background-color: <?php echo get_sub_field( "background_color_top" );?>;
		background-image: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 100' fill='<?php echo urlencode(get_sub_field( "background_color_bottom" )); ?>' preserveAspectRatio='none'%3E%3Cpolygon points='-50,100 100,0 100,100' /%3E%3C/svg%3E");   				
	}
</style>

<div id="<?php echo $block_id;?>" class="block cards" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?>">
	<div class="container">
		<div class="row">
			
			<div class="col-12 col-md-3">
				<<?php the_sub_field( 'heading_level' );?> style="color: <?php the_sub_field( 'heading_color' ); ?>"><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
			</div>
			
			<div class="col-12 col-md-9">
				<?php 
				if ( get_sub_field( 'cards' )) {?>
					<div class="row row-cards">
						<?php
						$items = get_sub_field( 'cards' );
						foreach ( $items AS $item ) {?>
							<div class="col-12 col-md-4 col-lg-3">
								<div class="card-wrapper shadow">
									<div class="image">
										<img src="<?php $image = $item['image']; echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
									</div>
									<div class="entry">
										<div class="heading">
											<h3><?php echo $item['heading'];?></h3>
										</div>
										<div class="text">
											<?php echo $item['text'];?>
										</div>
										<div class="butttons">
											<a class="btn btn-secondary btn-sm" href="<?php $link = $item['button']; echo $link['url'];?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></a>	
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
	</div>
</div>