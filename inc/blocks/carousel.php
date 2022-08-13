<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

<?php 
print ( '<pre>' );
print_r( POWEHI_THEME_PALETTE );
print ( '</pre> ');

$autoplay = get_sub_field( 'autoplay' );
if ( $autoplay ):
	
	if ( get_sub_field( 'slide_speed' )):
		$interval = 1000 * get_sub_field( 'slide_speed' );
	else:
		$interval = '5000';
	endif;
	
else:
	$interval = 'false';
endif;
?>

	<div 
		id="<?php echo $block_id; ?>-carousel" 
		class="carousel slide 
		<?php if ( get_sub_field( 'transition_style' ) == 'fade'): ?>carousel-fade<?php endif; ?>		
		" 
		<?php if ( get_sub_field( 'loop' ) == FALSE ): ?>
			data-bs-wrap="false"
		<?php endif; ?>
		<?php if ( $autoplay ): ?>
			data-bs-ride="carousel"
		<?php endif; ?>
		>
		<div class="carousel-inner">				
			<?php 
			if ( get_sub_field( 'slides' )) {
				$items = get_sub_field( 'slides' );
				$i = 1;
				foreach ( $items AS $item ) {?>
					<?php if ( $block_layout == 'wide' ): ?>
					
						<div class="carousel-item<?php if ( $i == 1 ) { echo ' active'; }; ?>" data-bs-interval="<?php echo $interval; ?>" style="background-image: url( <?php $image = $item['image']; echo $image['url'] ?>); background-color: <?php echo $layout_settings['background_color']; ?>">
							<div class="container">
								<div class="row">
									
									<div class="col-12 col-md-9 col-lg-8">
										<div class="text" style="color: <?php echo $item['text_color']; ?>">
											<h2 class="heading"><?php echo $item['heading']; ?></h2>
											<?php echo apply_filters( 'the_content', $item['text']); ?>
											<?php $button = $item['button'];
											if ( $button ): ?>
												<div class="buttons">
													<?php if ( $item['text_color'] == '#000000' ):
														$button_style = 'btn-outline-dark';
													else:
														$button_style = 'btn-outline-light';
													endif;?>
													<a class="btn <?php echo $button_style; ?>" href="<?php echo $button['url'];?>" target="<?php echo $button['target']; ?>"><span><?php echo $button['title']; ?></span></a>
												</div>
												<?php
											endif;?>										
										</div>					
									</div>
									
								</div>
							</div>
						</div>
					
					<?php else: ?>
					
						<div class="carousel-item<?php if ( $i == 1 ) { echo ' active'; }; ?>" data-bs-interval="<?php echo $interval; ?>">
							<div class="container">
								<div class="row">
									
									<div class="col-12 col-md-6">
										<div class="text">
											<h3 class="heading"><?php echo $item['heading']; ?></h3>
											<?php echo apply_filters( 'the_content', $item['text']); ?>
											<?php $button = $item['button'];
											if ( $button ): ?>
												<div class="buttons">
													<a class="btn btn-primary" href="<?php echo $button['url'];?>" target="<?php echo $button['target']; ?>"><span><?php echo $button['title']; ?></span></a>
												</div>
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
						
					<?php endif; ?>
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

	<script>
	jQuery(document).ready(function($) {
		var totalItems = $('#<?php echo $block_id; ?>-carousel .carousel-item').length;
		var currentIndex = $('#<?php echo $block_id; ?>-carousel div.active').index() + 1;
		$('#<?php echo $block_id; ?>-carousel').bind('slid', function() {
				currentIndex = $('#<?php echo $block_id; ?>-carouseldiv.active').index() + 1;
			 $('#<?php echo $block_id; ?>-carousel .num').html(''+currentIndex+'/'+totalItems+'');
		});
		console.log( totalItems );
		console.log( currentIndex );
		
	});
	</script>
	
</div>