<div id="<?php echo $block_id; ?>" class="block people" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?><?php if ( get_sub_field( 'background_color' ) ): echo ' background-color: ' . get_sub_field( 'background_color' ). '; '; endif; ?>">

	<div class="container">							
		<div class="row">
			<div class="col-12">
				<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
			</div>
		</div>
	
			<div class="row row-people">
				<?php
				$items = get_sub_field( 'people' );
				foreach ( $items AS $item ) {?>
					
					<div class="col-12 col-md-3 col-column">
						<div class="person">							
							<?php if ( $item['image'] ): ?>
								<div class="image">
									<img src="<?php $image =  $item['image']; echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
								</div>
								<?php
							endif;
							?>
								
							<div class="text">
								<h3><?php echo $item['name']; ?></h3>
								<div class="title">
									<?php echo $item['title']; ?>							
								</div>
							</div>

						</div>
					</div>
					
					<?php
				}?>
			</div>
			
	</div>
		
</div>