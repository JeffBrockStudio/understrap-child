<?php
if(have_rows('layout_settings')):
	$layout_settings = array();
	while(have_rows('layout_settings')): the_row();

		$layout_settings['padding_top'] = get_sub_field('padding_top');
		$layout_settings['padding_bottom'] = get_sub_field('padding_bottom');
		$layout_settings['background_color'] = get_sub_field('background_color');

	endwhile;
endif;
?>

<div 	
	id="<?php echo $block_id;?>" 
	class="block <?php echo $layout;?> <?php echo ($is_preview) ? 'is-preview' : ''; ?>" 
	style="<?php 
		if ( $layout_settings['padding_top'] ):
			echo 'padding-top: ' .  $layout_settings['padding_top']. 'rem; '; 
		endif;
		if ( $layout_settings['padding_bottom'] ):
			echo 'padding-bottom: ' . $layout_settings['padding_bottom']. 'rem; '; 
		endif;
		if ( $layout_settings['background_color'] ): 
			echo 'background-color: ' . $layout_settings['background_color']. '; '; 
		endif; 
		?>">