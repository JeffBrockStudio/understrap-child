<div id="<?php echo $block_id; ?>" class="block subnav" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?><?php if ( get_sub_field( 'background_color' ) ): echo ' background-color: ' . get_sub_field( 'background_color' ). '; '; endif; ?>">
	<div class="container">
		<div class="row">		
			<div class="col-12">
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
