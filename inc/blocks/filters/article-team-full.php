<div id="content<?php echo $i; ?>" class="gridder-content col-12">
	<div class="row">												
		<div class="col-12 col-md-7">																				
			<?php if ( get_field( 'team_position', $resource_id )) { ?>
				<h3 style="color: <?php echo $accent_color; ?>" class="title"><?php echo get_field( 'team_position', $resource_id ); ?></h3>
			<?php } ?>		
			<h2 style="color: <?php echo $accent_color; ?>"><?php echo get_the_title( $resource_id ); ?> </h2>
			<?php if ( get_field( 'team_pronouns', $resource_id )) { ?>
				<div class="pronouns">Pronouns: <?php echo get_field( 'team_pronouns', $resource_id ); ?></div>
			<?php } ?>
									
			<div class="description">
				<?php echo apply_filters( 'the_content', get_post_field( 'post_content', $resource_id )); ?>
			</div>
			
			<?php					
			if ( get_field( 'team_social_media', $resource_id )) {?>
				<div class="social-media">
					<?php
					$social_media = get_field( 'team_social_media', $resource_id );
					foreach ( $social_media AS $social_media_item ) {?>
						<a href="<?php echo $social_media_item['url']; ?>" style="color: <?php echo $accent_color; ?>" target="_blank"><?php echo $social_media_item['icon']; ?><span class="sr-only"><?php echo $social_media_item['title'];?></span>
						</a>
					<?php 
					}?>
				</div><?php 
			}
			?>			

		</div>
		<div class="col-12 col-md-4 offset-md-1">
			<?php echo get_the_post_thumbnail( $resource_id, 'large' ); ?>
		</div>
	</div>
</div>