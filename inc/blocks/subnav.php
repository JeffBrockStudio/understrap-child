<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

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

	<script>
	jQuery(document).ready(function($) {
		
		var $inView = $('#page-wrapper');
		var $sticky = $('.block.subnav');
			
		var inview = new Waypoint.Inview({
			element: $inView[0],
			enter: function(direction) {
				// Add stickiness when parent container comes onscreen from scrolling up
				if (direction === 'up' && !$sticky.hasClass('stuck')) {
					$sticky.addClass('stuck');
				}				
			},
			exited: function(direction) {
				// Remove element's stickiness when it moves offscreen
				
				$sticky.removeClass('stuck');				
			},
			offset: {
				top: 300, // 300px
				bottom: 200 // 200px
			}
		});
		
		var sticky = new Waypoint.Sticky({
			element: $sticky[0],
			offset: 0,
		});
			
	});
	</script>