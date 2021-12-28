<div class="block hero">
	<div class="container">

		<div class="row">
			<div class="col-12 col-md-6">
				
			 	<h1><?php the_sub_field( 'heading' );?></h1>
				 
			 	<?php if ( is_single() ): ?>
				 <div class="meta-data">
					 <?php echo get_the_date(get_option('date_format'), $post->ID); ?>
				 </div>
			 	<?php endif; ?>

				<div class="text">
					<?php echo apply_filters( 'the_content', the_sub_field( 'text' )); ?>																	
				</div>								
				
				<div class="buttons">
					<?php if ( get_sub_field( 'button_1' )) {					
						$link = get_sub_field( 'button_1' );?>
					 	<a class="btn btn-blue-lighter" href="<?php echo $link['url']?>" target="<?php echo $link['target']?>"><?php echo $link['title']; ?></a>
					<?php } ?>	
					
					<?php if ( get_sub_field( 'button_2' )) {					
						$link = get_sub_field( 'button_2' );?>
					 	<a class="btn btn-green" href="<?php echo $link['url']?>" target="<?php echo $link['target']?>"><?php echo $link['title']; ?></a>
					<?php } ?>	
				</div>
								
			</div>														
			
			<div class="col-12 col-md-6">
				<?php if ( get_sub_field( 'video' )): ?>
					<div class="video-wrapper">
						<?php echo get_sub_field( 'video' ); ?>
					</div>
				<?php else: ?>
					<img src="<?php $image = get_sub_field( 'image' ); echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" height="<?php echo $image['height']; ?>" width="<?php echo $image['width']; ?>" />
				<?php endif; ?>	 
			</div>
										
		</div>
		
	</div>
</div>