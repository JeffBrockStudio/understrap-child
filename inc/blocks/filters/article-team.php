<li class="gridder-list <?php echo $post_type ?>" data-griddercontent="#content<?php echo $i; ?>">

	<div class="inner">
		<div class="thumb">
			<?php if ( get_the_post_thumbnail( $resource_id )): ?>
				<?php echo get_the_post_thumbnail( $resource_id, 'medium' ); ?>
			<?php else: ?>	
				<img src="<?php $image = get_field( 'default_image_team', 'options' ); echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
			<?php endif; ?>
			
			<div class="plus"><i class="fas fa-plus"></i></div>
		</div>
		<div class="text">
			<h3 style="color: <?php echo $accent_color; ?>"><?php echo get_the_title( $resource_id ); ?></h3>
			<?php if ( get_field( 'team_position', $resource_id )) { ?>	
				<div class="team-position"><p><?php echo get_field( 'team_position', $resource_id ); ?></p></div>
			<?php } ?>								
			<?php if ( $show['excerpt'] ): ?>
				<div class="excerpt">	    
					<?php $excerpt = apply_filters( 'the_content', get_post_field( 'post_content', $resource_id ));
					echo understrap_limit_text( $excerpt, 45 );
					 ?>
				</div>
			<?php endif; ?>
		</div>
		<?php if ( isset($show['button']) AND $show['button'] ): ?>
			<div class="buttons">
				<a class="btn <?php echo $button_class;?>" style="background-color: <?php echo $accent_color; ?>; border-color: <?php echo $accent_color; ?>; color: <?php echo $svg_bg_color; ?>">Read More</a>
			</div>
		<?php endif; ?>	
	</div>

</li>