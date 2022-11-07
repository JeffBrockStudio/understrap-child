<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<?php if ( get_sub_field( 'add_overlay_reveal' )):?>
	
		<div class="sticky">
			<div class="wipe-stack">
				
				<div class="sticky-wipe item-1" style="background-image: url(<?php echo $image['url'];?>);">
					<div class="overlay"></div>
					<div class="gradient"></div>
					<div class="top-gradient"></div>
					
					<div class="container">				
						<div class="row">
						
						<?php if ( get_sub_field( 'text' )): 
								$columns = "col-12 col-md-6";
							else:
								$columns = "col-12";					
							endif;			
						?>
									
						<div class="<?php echo $columns; ?>">
							
							<h1 style="color: <?php the_sub_field( 'text_color' );?>"><?php the_sub_field( 'heading' );?></h1>
							 
							<?php if ( get_sub_field( 'subheading' )): ?> 
								<h2 class="subheading" style="color: <?php the_sub_field( 'text_color' );?>"><?php the_sub_field( 'subheading' );?></h2>
							<?php endif; ?> 
							 
							 <?php if ( is_single() ): ?>
							 <div class="meta-data">
								 <?php echo get_the_date(get_option('date_format'), $post->ID); ?>
							 </div>
							 <?php endif; ?>
					
							<?php if ( get_sub_field( 'text' )): ?>
								<div class="text">
									<?php echo apply_filters( 'the_content', the_sub_field( 'text' )); ?>																	
								</div>								
							<?php endif; ?>
							
							<?php if ( get_sub_field( 'button_1' ) OR get_sub_field( 'button_2' )): ?>	
								<div class="buttons">
									<?php if ( get_sub_field( 'button_1' )) {					
										$link = get_sub_field( 'button_1' );?>
										 <a class="btn btn-primary" href="<?php echo $link['url']?>" target="<?php echo $link['target']?>"><?php echo $link['title']; ?></a>
									<?php } ?>	
									
									<?php if ( get_sub_field( 'button_2' )) {					
										$link = get_sub_field( 'button_2' );?>
										 <a class="btn btn-secondary" href="<?php echo $link['url']?>" target="<?php echo $link['target']?>"><?php echo $link['title']; ?></a>
									<?php } ?>	
								</div>
							<?php endif; ?>
											
						</div>																	
					</div>
					</div>	
				</div>	
				
				<div class="sticky-wipe item-2" style="background-image: url(<?php echo $image['url'];?>);"></div>
				
			</div>
		</div>
		
	<?php else: ?>
	
		<div class="container">
		
			<div class="row">
				
				<?php if ( get_sub_field( 'text' )): 
						$columns = "col-12 col-md-6";
					else:
						$columns = "col-12";					
					endif;			
				?>
							
				<div class="<?php echo $columns; ?>">
					
					<h1 style="color: <?php the_sub_field( 'text_color' );?>"><?php the_sub_field( 'heading' );?></h1>
					 
					<?php if ( get_sub_field( 'subheading' )): ?> 
						<h2 class="subheading" style="color: <?php the_sub_field( 'text_color' );?>"><?php the_sub_field( 'subheading' );?></h2>
					<?php endif; ?> 
					 
					 <?php if ( is_single() ): ?>
					 <div class="meta-data">
						 <?php echo get_the_date(get_option('date_format'), $post->ID); ?>
					 </div>
					 <?php endif; ?>
		
					<?php if ( get_sub_field( 'text' )): ?>
						<div class="text">
							<?php echo apply_filters( 'the_content', the_sub_field( 'text' )); ?>																	
						</div>								
					<?php endif; ?>
					
					<?php if ( get_sub_field( 'button_1' ) OR get_sub_field( 'button_2' )): ?>	
						<div class="buttons">
							<?php if ( get_sub_field( 'button_1' )) {					
								$link = get_sub_field( 'button_1' );?>
								 <a class="btn btn-primary" href="<?php echo $link['url']?>" target="<?php echo $link['target']?>"><?php echo $link['title']; ?></a>
							<?php } ?>	
							
							<?php if ( get_sub_field( 'button_2' )) {					
								$link = get_sub_field( 'button_2' );?>
								 <a class="btn btn-secondary" href="<?php echo $link['url']?>" target="<?php echo $link['target']?>"><?php echo $link['title']; ?></a>
							<?php } ?>	
						</div>
					<?php endif; ?>
									
				</div>																	
			</div>
			
		</div>
	
	<?php endif; ?>
	
</div>

<script>
jQuery(document).ready(function($) {
	
	// Animate the opening circle clip path on scroll 
	
	gsap.from(".item-2", {
		scrollTrigger: {
			trigger: ".sticky-wrapper",
			scrub: true,
			start: "top top",
			end: "+=100%"
		},
		clipPath: "inset(100% 0px 0px)",
		ease: "none"	
	});
	
});	
</script>