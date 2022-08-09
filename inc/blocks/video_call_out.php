<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

<div class="container">
	<div class="row">
		
		<!-- <div class="block featured-story" style="background-image: url(<?php $image = get_sub_field( 'f_image' ); echo $image['url']; ?>);"> -->
		
		<div class="col-12 col-md-6">
			<div class="text">
				<h2><?php the_sub_field('heading');?></h2>
				<?php echo apply_filters( 'the_content', get_sub_field( 'text' )); ?>
				<button class="btn btn-primary" href="<?php $link = get_sub_field( 'button' ); echo $link['url'];?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></button>
			</div>
		</div>
		<div class="col-12 col-md-6">
			<?php if ( get_sub_field( 'video')) { ?>
				<div class="overlay">
					<a href="<?php echo get_sub_field( 'video', false, false );?>">
						<div class="overlay-play"><img src="<?php echo get_stylesheet_directory_uri();?>/img/icon-play-button.svg"></div>
					</a>
				</div>
			<?php } ?>
		</div>
	</div>	
</div>