<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<div class="container">

		<div class="row">
			<div class="col-12 col-md-6">
				
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