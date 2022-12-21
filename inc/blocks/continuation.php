<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<style>
		#<?php echo $block_id ?> {
			/* background: linear-gradient(to right, <?php echo $layout_settings['background_color_gradient_start']; ?> 50%, <?php echo $layout_settings['background_color_gradient_start']; ?> 50%, <?php echo $layout_settings['background_color_gradient_end']; ?> 50%);*/
			margin-top: <?php echo $layout_settings['padding_top'];?>rem;
			margin-bottom: <?php echo $layout_settings['padding_bottom'];?>rem; 
			padding-top: 0 !important;
			padding-bottom: 0 !important;
		}
	</style>
	
	<?php 
	$accent_color = $layout_settings['background_color_gradient_start'];
	 ?>

	<div class="inner">
		<div class="container" <?php if ( get_sub_field( 'image' )): ?>style="background-image: url(<?php $image = get_sub_field( 'image' ); echo $image['url'] ?>);"<?php endif; ?>>
		
			<div class="row">
				<div class="col-12 col-md-7 offset-md-1 col-lg-6 offset-lg-2 col-text">	
					<?php if ( get_sub_field( 'text' ) OR get_sub_field( 'heading' )): ?>
						<?php if ( get_sub_field( 'superheading' )): ?>
							<div class="superheading"><?php echo get_sub_field( 'superheading' ); ?></div>
						<?php endif; ?>
						<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
						<div class="text">
							<div class="row">
								<div class="col-10 col-md-11 col-xl-9 col-xxl-8">
									<?php echo apply_filters( 'the_content', the_sub_field( 'text' )); ?>
								</div>
							</div>
						</div>
					<?php endif; ?>
				</div>
				<div class="col-12 col-md-3 col-lg-2 col-buttons"> 
					<?php $link = get_sub_field( 'button' );
					if ($link): ?>
						<div class="buttons">
							<a class="btn <?php echo $theme_palette['btn_class']; ?>" style="color: <?php echo $accent_color; ?>" href="<?php echo $link['url']?>" target="<?php echo $link['target']?>"><?php echo $link['title']; ?></a>							
						</div>
						<?php
					endif;?>
				</div>										
			</div>		
		</div>
	</div>
</div>