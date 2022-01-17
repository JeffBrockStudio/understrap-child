<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<div id="<?php echo $block_id; ?>-carousel" class="carousel slide" data-ride="carousel">
		<div class="carousel-inner">				
			<?php 
			if ( get_sub_field( 'slides' )) {
				$items = get_sub_field( 'slides' );
				$i = 1;
				foreach ( $items AS $item ) {
				?>
					<div class="carousel-item<?php if ( $i == 1 ) { echo ' active'; }; ?>" data-interval="7500">
						<div class="container">
							<div class="row">
								
								<div class="col-12 col-md-6">
									<div class="text">
										<h3 class="heading"><?php echo $item['heading']; ?></h3>
										<?php echo apply_filters( 'the_content', $item['text']); ?>
										<?php $button = $item['button'];
										if ( $button ): ?>
											<a class="btn btn-primary" href="<?php echo $button['url'];?>" target="<?php echo $button['target']; ?>"><span><?php echo $button['title']; ?></span></a>
											<?php
										endif;?>										
									</div>					
								</div>
								
								<div class="col-12 col-md-6">
									<?php if ( $item['image'] ): ?>						
										<div class="image">
											<img src="<?php $image = $item['image']; echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
										</div>						
									<?php endif; ?>
								</div>

							</div>
						</div>
					</div>
					<?php
					$i++;
				}
			}
			?>	  
		</div>
		
		<button class="carousel-control-prev" type="button" data-bs-target="#<?php echo $block_id; ?>-carousel" data-bs-slide="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Previous</span>
		</button>
		<button class="carousel-control-next" type="button" data-bs-target="#<?php echo $block_id; ?>-carousel" data-bs-slide="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Next</span>
		</button>
		
		<div class="carousel-indicators">
			<?php
			$i = 0;
			foreach ( $items AS $item ) {?>
				<button data-bs-target="#<?php echo $block_id; ?>-carousel" data-bs-slide-to="<?php echo $i; ?>" <?php 
					if ( $i == 0 ) { 
						echo ' class="active"';
						echo ' aria-current="true"';
					}; ?>></li>
				<?php 
				$i++;
			}?>			
		</div>
		
	</div>

</div>