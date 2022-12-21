<script>
jQuery(function($) {
	$('body').addClass('has-vertical-accordion-menu');
});
</script>

<?php	
// Get number of items in menu
$vertical_accordion_menu_id = get_field( 'vertical_accordion_menu' );
$vertical_accordion_menu = wp_get_nav_menu_object( $vertical_accordion_menu_id );
$vertical_accordion_menu_count = $vertical_accordion_menu->count;

wp_nav_menu(
	array(
		'theme_location'  => 'footer-menu',
		'fallback_cb'     => '',
		'menu'        		=> $vertical_accordion_menu_id,
		'depth'           => 2,
		'walker'          => new Understrap_WP_Bootstrap_Navwalker(),
	)
);			

// Base font size
$base_font_size = 18;

// Menu item width in rem
$menu_item_width = 3;

// Total menu width in rem
$menu_width = $menu_item_width * $vertical_accordion_menu_count;		

$container_translatex = -($menu_width/2);	
?>
	<style>			
		.menu-vertical-accordion-container li {
			width: <?php echo $menu_item_width; ?>rem;
		}
		.container {
			transform: translateX( <?php echo $container_translatex; ?>rem );
		}
		@media (min-width: 992px) {
			.container {
				max-width: calc( 960px - <?php echo $menu_width; ?>rem );
			}
		}
		@media (min-width: 1200px) {
			.container {
				max-width: calc( 1140px - <?php echo $menu_width; ?>rem );
			}
		}
		@media (min-width: 1400px) {
			.container {
				max-width: calc( 1320px - <?php echo $menu_width; ?>rem );
			}
		}
		<?php		
		$vertical_accordion_menu_items = wp_get_nav_menu_items( $vertical_accordion_menu_id );
		
		// Get the order in the menu where the active item is
		$order_in_menu = 0;
		$i = 1;		
		foreach ( $vertical_accordion_menu_items AS $vertical_accordion_menu_item ):
			if ( $post->ID == $vertical_accordion_menu_item->object_id ):
				$order_in_menu = $i;
			endif;
			$i++;
		endforeach;
		
		$i = 1;		
		$container_translatex = $container_translatex + $menu_item_width;
		foreach ( $vertical_accordion_menu_items AS $vertical_accordion_menu_item ): ?>
			
			#menu-item-<?php echo $vertical_accordion_menu_item->ID;?> {
				right: <?php echo $menu_item_width * ( $vertical_accordion_menu_count - $i); ?>rem;
			}
			#menu-item-<?php echo $vertical_accordion_menu_item->ID;?> a {			
				background-color: <?php echo get_field('menu_item_background_color', $vertical_accordion_menu_item->ID); ?>;
			}
			#menu-item-<?php echo $vertical_accordion_menu_item->ID;?> a:after {
				background-image: url("data:image/svg+xml,%3Csvg width='16' height='34' viewBox='0 0 16 34' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.8285 2L2.17139 16.8295L13.8285 31.6528' stroke='white' stroke-width='3' stroke-miterlimit='10' stroke-linecap='round'/%3E%3C/svg%3E");						
			}
					
			<?php	
			// Is the current menu item earlier or equal to active item?		
			if ( $i <= $order_in_menu ):?>
				#menu-item-<?php echo $vertical_accordion_menu_item->ID;?> {
					left: <?php echo $menu_item_width * ( $i - 1 ); ?>rem;
					right: auto;
				} 
				#menu-item-<?php echo $vertical_accordion_menu_item->ID;?> a:after {
					background-image: url("data:image/svg+xml,%3Csvg width='16' height='34' viewBox='0 0 16 34' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.17147 31.6528L13.8286 16.8234L2.17147 2.00006' stroke='white' stroke-width='3' stroke-miterlimit='10' stroke-linecap='round'/%3E%3C/svg%3E%0A"); 
				}
				.container {
					transform: translateX( <?php echo $container_translatex; ?>rem );
				}
				<?php
			endif;
			$i++;		 
			$container_translatex = $container_translatex + 3;
			
		endforeach;
		?>
	</style>
<?php	