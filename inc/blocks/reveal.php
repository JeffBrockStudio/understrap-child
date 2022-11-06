<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

<div class="sticky">
	<div class="wipe-stack">
	
		<div class="layer top">
			<div class="container">
				<div class="row">
					
					<div class="col-12">
						
						<?php if ( get_sub_field( 'top_layer_heading_superheading' )): ?>
							<div role="doc-subtitle" class="superheading" style="color: <?php echo $text_color; ?>"><?php the_sub_field( 'top_layer_heading_superheading' );?></div>
						<?php endif; ?>
						
						<<?php the_sub_field( 'top_layer_heading_heading_level' );?> class="heading" style="color: <?php // echo $text_color; ?>"><?php the_sub_field( 'top_layer_heading_heading' );?></<?php the_sub_field( 'top_layer_heading_heading_level' );?>>
						
						<?php if ( get_sub_field( 'top_layer_heading_subheading' )): ?>
							<div role="doc-subtitle" class="subheading" style="color: <?php echo $text_color; ?>"><?php the_sub_field( 'top_layer_heading_subheading' );?></div>
						<?php endif; ?>
						
					</div>																	
				</div>
				
			</div>
			
			<?php if ( get_sub_field( 'top_layer_background_video' )):?>
					<div class="background video" style="background-image:url(<?php $image = get_sub_field( 'top_layer_background_image'); echo $image['url']; ?>)";>
							<video id="home-featured-video" src="<?php $video_file = get_sub_field( 'top_layer_background_video' ); echo $video_file['url']; ?>" playsinline autoplay loop muted style="background: url(<?php echo $image['url'];  ?>); background-size: cover;" /></video>						
							<!-- <div class="video-controls"><i class="fas fa-pause"></i></div> -->
					</div>
				<?php
			else: ?>
					<div class="background image" style="background-image:url(<?php $image = get_sub_field( 'top_layer_background_image'); echo $image['url'];?>)"></div>		
			<?php
			endif;
			?>
		</div>
		
		<div class="layer bottom" aria-hidden="true">
			<div class="container"> 
				<div class="row">
					
					<div class="col-12">
						
						<?php if ( get_sub_field( 'bottom_layer_heading_superheading' )): ?>
							<div role="doc-subtitle" class="superheading" style="color: <?php echo $text_color; ?>"><?php the_sub_field( 'bottom_layer_heading_superheading' );?></div>
						<?php endif; ?>
						
						<<?php the_sub_field( 'bottom_layer_heading_heading_level' );?> class="heading" style="color: <?php // echo $text_color; ?>"><?php the_sub_field( 'bottom_layer_heading_heading' );?></<?php the_sub_field( 'bottom_layer_heading_heading_level' );?>>
						
						<?php if ( get_sub_field( 'bottom_layer_heading_subheading' )): ?>
							<div role="doc-subtitle" class="subheading" style="color: <?php echo $text_color; ?>"><?php the_sub_field( 'bottom_layer_heading_subheading' );?></div>
						<?php endif; ?>
						
					</div>																	
				</div>
				
			</div>
			
			<?php if ( get_sub_field( 'bottom_layer_background_video' )):?>
					<div class="background video" style="background-image:url(<?php $image = get_sub_field( 'bottom_layer_background_image'); echo $image['url']; ?>)";>
							<video id="home-featured-video" src="<?php $video_file = get_sub_field( 'bottom_layer_background_video' ); echo $video_file['url']; ?>" playsinline autoplay loop muted style="background: url(<?php echo $image['url'];  ?>); background-size: cover;" /></video>						
							<!-- <div class="video-controls"><i class="fas fa-pause"></i></div> -->
					</div>
				<?php
			else: ?>
					<div class="background image" style="background-image:url(<?php $image = get_sub_field( 'bottom_layer_background_image'); echo $image['url'];?>)"></div>		
			<?php
			endif;
			?>
		</div>		
		
	</div>
</div>
	
</div>

<script>
jQuery(document).ready(function($) {
	console.log( 'reveal2' );
	
	gsap.to(".bottom", {
		scrollTrigger: {
			trigger: ".block.reveal",
			scrub: true,
			start: "top top",
			end: "+=100%"
		},
		//clipPath: "inset(50% 0px 0px)",		
		clipPath: "circle(100vw at bottom)",
	//	mask: "radial-gradient(circle at 70%, black 25%, transparent 0)",
		//clipPath: "circle(100vw)",
		ease: "power1.inOut"
	});
});
</script>