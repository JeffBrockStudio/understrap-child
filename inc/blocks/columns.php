<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<div class="container">
		
		<?php if ( get_sub_field( 'heading' )): ?>
			<?php include( get_stylesheet_directory() . '/inc/blocks/headings.php' ); ?>
		<?php endif; ?>
	
		<?php 
		if ( get_sub_field( 'columns' )): ?>
			<div class="row"><?php
				$items = get_sub_field( 'columns' );
				$count = count(get_sub_field( 'columns' ));
				if ( $count > 4 ):
					$md_columns = 6;
					$lg_columns = 4;
				elseif ( $count == 4 ):
					$md_columns = 6;
					$lg_columns = 3;
				elseif ( $count == 3 ):
					$md_columns = 6;
					$lg_columns = 4;
				else:
					$md_columns = 6;
					$lg_columns = 6;
				endif;
			
				foreach ( $items AS $item ):?>
					
					<?php if ( $item['flippable'] ): ?>
						
						<div class="col-12 col-md-<?php echo $md_columns; ?> col-lg-<?php echo $lg_columns; ?> col-column flippable">
							<div class="column flip-card-wrapper">
								
								<div class="front">								
									<h3 class="heading"><?php echo $item['heading']; ?></h3>								
								</div>
								
								<div class="back">
									<div class="text">
										<?php echo $item['text'];?>
									</div>
								</div>
								
							</div>
						</div>
					
					<?php elseif ( $item['image_layout'] == 'left' ): ?>
					
						<div class="col-12 col-md-<?php echo $md_columns; ?> col-lg-<?php echo $lg_columns; ?> col-column image-layout-left">
							<div class="column">	
								
								<div class="row g-0">
									
									<div class="col-4 col-md-4">
										<?php if ( $item['image'] ): ?>
											<div class="image">
												<img src="<?php $image = $item['image']; echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
											</div>
											<?php
											endif;
										?>
									</div>					
									
									<div class="col-8 col-md-8">										
										<div class="text dont-break-out">
											<h3><?php echo $item['heading']; ?></h3>
											<?php echo apply_filters( 'the_content', $item['text']); ?>					
											<?php
											if ( $item['link'] ): ?>
												<div class="buttons">
													
												</div>
												<?php
											endif;?>													
										</div>
										
										<?php if ( $item['link'] ): ?>
											<a class="btn btn-primary stretched-link" href="<?php $link = $item['link']; echo $link['url'];?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></a>
										<?php endif; ?>
									</div>
									
								</div>								
							
							</div>
						</div>
					
					<?php else: ?>						
					
						<div class="col-12 col-md-<?php echo $md_columns; ?> col-lg-<?php echo $lg_columns; ?> col-column <?php 
							if ( !$item['image'] ):
								echo 'text-only';
							elseif ( $item['image_layout'] == 'bottom' ): 
								echo 'image-layout-bottom'; 
							elseif ( $item['image_layout'] == 'image-only' ):
								echo 'image-layout-image-only'; 
							else:
								echo 'image-layout-top';
							endif; 
							
							$image_mask = $item['image_mask'];
							$image_mask = $image_mask['image_mask'];
							if ( $image_mask != '' ):								
								echo ' image-mask'; 	
							endif;
							?>">
							<div class="column">						
								<?php if ( $item['image'] ):
									if ( $image_mask != '' ): ?>
										<div class="image-mask" style="-webkit-mask-image: url(<?php echo get_stylesheet_directory_uri();?>/img/masks/<?php echo $image_mask; ?>);
											mask-image: url(<?php echo get_stylesheet_directory_uri();?>/img/masks/<?php echo $image_mask; ?>);">
											<img src="<?php $image = $item['image']; echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
										</div>
										<?php
									else: ?>
										<div class="image<?php if ( !$item['heading'] AND !$item['text']) echo ' no-text'; ?>">
											<img src="<?php $image = $item['image']; echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
										</div>
										<?php									
									endif; ?>
									<?php 
										$image_flourish = $item[ 'image_flourish' ];
										$image_flourish = $image_flourish['image_flourish'];
										if ( $image_flourish != '' ): ?>
										<div class="flourish">
											<?php	$flourish_url = get_stylesheet_directory_uri() . '/img/flourishes/' . $image_flourish; ?>
											<img src="<?php echo $flourish_url?>" alt="" aria-hidden="true">
										</div>
									<?php endif;
								endif; ?>
								
								<?php if ( $item['heading'] OR $item['text'] ): ?>								
									<div class="text dont-break-out">
										<?php if ( $item['heading'] ): ?>
											<h3><?php echo $item['heading']; ?></h3>
										<?php endif; ?>
										<?php echo apply_filters( 'the_content', $item['text']); ?>					
									</div>
								<?php endif; ?>
								
								<?php if ( $item['link'] ): ?>
									<a class="btn btn-primary stretched-link" href="<?php $link = $item['link']; echo $link['url'];?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></a>
								<?php endif; ?>
							</div>
						</div>
						
					<?php endif; ?>
					
					<?php
				endforeach;?>
			</div><?php
		endif;
		?>
		
		<?php if ( get_sub_field( 'button' )): ?>
			<div class="row">
				<div class="col-12">
					<div class="buttons">
						<a class="btn btn-secondary" href="<?php $link = get_sub_field( 'button' ); echo $link['url'];?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></a>
					</div>
				</div>
			</div>
		<?php endif; ?>			
		
	</div>
		
</div>