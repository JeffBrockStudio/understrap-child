<?php
// Get block-level settings
if ( have_rows('layout_settings') ):
	$layout_settings = array();
	while(have_rows('layout_settings')): the_row();

		$layout_settings['padding_top'] = get_sub_field('padding_top');
		$layout_settings['padding_bottom'] = get_sub_field('padding_bottom');
		$layout_settings['background_color'] = get_sub_field('background_color');
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
	switch( $layout_settings['background_color'] ):
		case '#555392':
			$accent_class = 'accent-primary';
			$svg_bg_color = '#555392';
			$svg_line_color = '#ffffff';
			$button_class = 'btn-light';
			break;
		case '#FFFFFF':
		case '#ffffff':
			$svg_bg_color = '#ffffff';						
			$accent_color = $layout_settings['accent_color'];
			$svg_line_color = $accent_color;						
			break;		
	endswitch;	
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
		echo ($is_preview) ? 'is-preview' : ''; ?>" 
	style="
		<?php if ( $layout_settings['padding_top'] != '' ):
			echo 'padding-top: ' .  $layout_settings['padding_top']. 'rem; '; 
		endif;
		if ( $layout_settings['padding_bottom'] != '' ):
			echo 'padding-bottom: ' . $layout_settings['padding_bottom']. 'rem; '; 
		endif;
		if ( $layout_settings['background_color'] ): 
			echo 'background-color: ' . $layout_settings['background_color']. '; '; 
		endif; 
		if ( get_sub_field('background_image')): 
			$image = get_sub_field('background_image');
			echo 'background-image: url(' . $image['url'] . '); '; 
		endif; 
		?>
">