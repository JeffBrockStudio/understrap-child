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
?>
	<style>			
		.menu-vertical-accordion-container li {
			width: <?php echo $menu_item_width; ?>rem;
		}
		.container {
			transform: translateX( -<?php echo $menu_width/2; ?>rem );
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
		$i = 1;
		$vertical_accordion_menu_items = wp_get_nav_menu_items( $vertical_accordion_menu_id );
		foreach ( $vertical_accordion_menu_items AS $vertical_accordion_menu_item ):?>					
			#menu-item-<?php echo $vertical_accordion_menu_item->ID;?> {
				background-color: <?php echo get_field('menu_item_background_color', $vertical_accordion_menu_item->ID); ?>;
				right: <?php echo $menu_item_width * ( $vertical_accordion_menu_count - $i); ?>rem;
			}
			<?php
			$i++;		 
		endforeach;
		?>
	</style>
<?php	