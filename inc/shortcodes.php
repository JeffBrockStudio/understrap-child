<?php
/**
 * Current year shortcode
 */
function custom_current_year() {
	ob_start();
	echo date( 'Y' );
  return ob_get_clean();
}
add_shortcode('current_year', 'custom_current_year');

	
/**
 * Pullquote shortcode
 */
function custom_insert_pullquote($atts) {
	
	extract(shortcode_atts(array(
      'quote' => '',
      'alignment' => 'left'
   ), $atts));	
  $html = '<div class="pullquote ' . $alignment . '">' . $quote . '</div>';
  return $html;
}
add_shortcode('pullquote', 'custom_insert_pullquote');
