<?php
// Get block-level settings
if ( have_rows('layout_settings') ):
	$layout_settings = array();
	while(have_rows('layout_settings')): the_row();

		$layout_settings['padding_top'] = get_sub_field('padding_top');
		$layout_settings['padding_bottom'] = get_sub_field('padding_bottom');
		$layout_settings['overlap_bottom'] = get_sub_field('overlap_bottom');
		$layout_settings['background_color'] = get_sub_field('background_color');
		if ( get_sub_field( 'block_background_image' )):
			$image = get_sub_field( 'block_background_image' );
			$layout_settings['background_image_url'] = $image;
		endif;		
		$layout_settings['accent_color'] = get_sub_field('accent_color');
		$layout_settings['background_color_gradient_start'] = get_sub_field('background_color_gradient_start');
		$layout_settings['background_color_gradient_end'] = get_sub_field('background_color_gradient_end');
		$layout_settings['anchor_id'] = get_sub_field('anchor_id');

	endwhile;
endif;

// Set a unique block ID
if ( $layout_settings['anchor_id'] ):
	$block_id = $layout_settings['anchor_id'];
else:
	$block_id = 'block-' . generateRandomString();
endif;


// Get layout if one is set
if ( get_sub_field( 'block_layout' ) == 'wide' ):
	$block_layout = 'wide';
elseif ( get_sub_field( 'block_layout' ) == 'narrow' ):
	$block_layout = 'narrow';
else:
	$block_layout = '';
endif;


// Defaults
$accent_class = '';
$svg_bg_color = '#555392';
$svg_line_color = '#ffffff';
$button_class = '';
$accent_color = '';

if ( $layout_settings['background_color']):
	$theme_palette = POWEHI_THEME_PALETTE[$layout_settings['background_color']];	
else:	
	$theme_palette = POWEHI_THEME_PALETTE['#ffffff'];
endif;
 
$text_color = $theme_palette['text_color'];

if ( $theme_palette['level'] == 'dark' ):
	$accent_class = 'accent-' . $theme_palette['bs_class'];
	$button_class = 'btn-light';
	$svg_line_color = '#ffffff';
	$svg_bg_color = $theme_palette['hex'];
else:
	$accent_color = $layout_settings['accent_color'];
	$svg_bg_color = '#ffffff';
	$svg_line_color = $accent_color;
endif;	

?>
<div 	
	id="<?php echo $block_id;?>" 
	class="block 
		<?php 
		echo $accent_class . ' ';
		echo $layout . ' ';
		echo $block_layout . ' ';
		if ( get_sub_field( 'text_placement' )): echo get_sub_field( 'text_placement' ) . ' '; endif;
		echo ($is_preview) ? 'is-preview' : ''; 
		if ( get_sub_field( 'add_overlay_reveal' )): echo ' hero-overlay-reveal sticky-wrapper'; endif;
		if ( get_sub_field( 'add_rotating_headlines' )): echo ' hero-rotating-headlines'; endif;
		?>" 
	style="
		<?php
		if ( $layout_settings['overlap_bottom'] != '' ):
			echo 'margin-bottom: ' .  $layout_settings['overlap_bottom']. 'rem; '; 
		endif; 
		if ( $layout_settings['padding_top'] != '' ):
			echo 'padding-top: ' .  $layout_settings['padding_top']. 'rem; '; 
		endif;
		if ( $layout_settings['padding_bottom'] != '' ):
			echo 'padding-bottom: ' . $layout_settings['padding_bottom']. 'rem; '; 
		endif;
		if ( $layout_settings['background_color'] != '' ): 
			echo 'background-color: ' . $layout_settings['background_color']. '; '; 
		endif; 
		if ( isset( $layout_settings['background_image_url']) ):
			$image = $layout_settings['background_image_url'];
			//echo $layout_settings['background_image_url'];
			// echo 'URL ' .  $layout_settings['background_image_url'];
			echo 'background-image: url(' . $image['url'] . '); ';
		elseif ( get_sub_field('background_image') != ''): 
			$image = get_sub_field('background_image');
			echo 'background-image: url(' . $image['url'] . '); '; 
		endif;	
		?>
">
