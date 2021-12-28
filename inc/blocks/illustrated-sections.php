<div 
	id="<?php echo $block_id;?>"	class="block illustrated-sections" 
	style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?><?php if ( get_sub_field( 'background_color' ) ): echo ' background-color: ' . get_sub_field( 'background_color' ). '; '; endif; ?>">
	<div class="container">
		
		<?php $count = count(get_sub_field( 'sections' )); ?>

		<div class="row row-heading<?php if ( $count == 1 ) echo ' single'; ?>">
			
			<div class="col-2">
				<div class="image icon">
					<img src="<?php $image = get_sub_field( 'icon' ); echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
				</div>
			</div>
			
			<div class="col-10">
				<<?php the_sub_field( 'heading_level' );?> class="heading"><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
				<h3 class="subheading"><?php the_sub_field( 'subheading' );?></h3>
			</div>
			
		</div>

		<div class="row row-illustrations">
			
			<?php 
			$items = get_sub_field( 'sections' );
			
			if ( $count == 1 ):
				foreach ( $items AS $item ) {?>
					<div class="col-12 col-md-6 col-image">
						<div class="image">
							<img src="<?php $image = $item['image']; echo $image['sizes']['large']; ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
						</div>
					</div>
					
					<div class="col-12 col-md-6 col-text">
						<div class="text">
							<?php echo apply_filters( 'the_content', $item['text'] ); ?>
						</div>
					</div>
					<?php
				}
			else:
				foreach ( $items AS $item ) {?>
					<div class="col-12 col-md-6">
						<div class="text">
							<?php echo apply_filters( 'the_content', $item['text'] ); ?>
						</div>
						<div class="image">
							<img src="<?php $image = $item['image']; echo $image['sizes']['large']; ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
						</div>
					</div>
					<?php
				}				
			endif; ?>
				
		</div>														
			
	</div>
		
</div>