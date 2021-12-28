<style>
	#<?php echo $block_id ?> {
		background: linear-gradient(to bottom, <?php the_sub_field( 'background_color_top' ); ?> 0%,<?php the_sub_field( 'background_color_bottom' ); ?> 100%);
	}
</style>

<div id="<?php echo $block_id; ?>" class="block section-heading" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?>">
	<div class="container">
		<div class="row">		
			<div class="col-12">
				<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
				<?php if ( get_sub_field( 'subheading' )) {?>
					<h3><?php the_sub_field( 'subheading' );?></h3>
				<?php } ?>
				<?php 
				if ( get_sub_field( 'nav_items' )) {?>
					<div class="nav-items">
						<?php
						$items = get_sub_field( 'nav_items' );
						foreach ( $items AS $item ) {?>
							<a class="" href="#<?php echo $item['anchor_id']; ?>"><?php echo $item['text']; ?></a>	
							<?php
						}?>	
					</div>	
					<?php
				}
				?>
			</div>
		</div>
	</div>
</div>
