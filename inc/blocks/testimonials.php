<style>
	#<?php echo $block_id ?> {
		background: linear-gradient(to bottom, <?php the_sub_field( 'background_color_top' ); ?> 0%,<?php the_sub_field( 'background_color_bottom' ); ?> 100%);
	}
</style>

<div id="<?php echo $block_id; ?>" class="block wrapper testimonials" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?>">
	<div class="container">
		<div class="row">		
				
			<div class="col-12 col-md-10 offset-md-1">
				<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
				
				<div class="carousel-wrapper">
					<div id="carousel-<?php echo $block_id; ?>" class="carousel slide" data-ride="carousel">
						<div class="carousel-inner">				
						<?php 
						if ( get_sub_field( 'stories' )) {
							$items = get_sub_field( 'stories' );
							$i = 1;
							foreach ( $items AS $item ) {
							?>
								<div class="carousel-item<?php if ( $i == 1 ) { echo ' active'; }; ?>" data-interval="7500">
									<div class="row">
										
										<div class="col-12 col-md-4">
											<div class="image">
												<img src="<?php $image = $item['image']; echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
											</div>											
										</div>
										
										<div class="col-12 col-md-7 offset-md-1">												
											<div class="text">
												<div class="quote">
													<img src="<?php echo get_stylesheet_directory_uri();?>/img/open-quote.png" alt="" height="42" width="36" aria-hidden="true">
												</div>
												<?php echo apply_filters( 'the_content', $item['text']); ?>
												<div class="author">
													<?php echo $item['author']; ?>
												</div>
												<?php if ( $item['title'] ):?>
													<div class="title">
														<?php echo $item['title'];?>
													</div>
													<?php
													endif; ?>
											</div>					
											<?php $button = $item['button'];
											if ( $button ): ?>
												<div class="buttons">
													<a class="btn btn-secondary" href="<?php $link = $button['link']; echo $button['url'];?>" target="<?php echo $button['target']; ?>"><span><?php echo $button['title']; ?></span></a>
												</div>
												<?php
											endif;?>
										</div>
			
									</div>
								</div>
								<?php
								$i++;
							}
						}
						?>	  
					</div>
						
						<ol class="carousel-indicators">
							<?php
							$i = 0;
							foreach ( $items AS $item ) {?>
								<li data-target="#carousel-<?php echo $block_id; ?>" data-slide-to="<?php echo $i; ?>" <?php if ( $i == 0 ) { echo ' class="active"'; }; ?>></li>
							<?php 
								$i++;
							}?>			
						</ol>
					
					</div>
				</div>
			</div>
				
		</div>
	</div>
	
	
	
</div>