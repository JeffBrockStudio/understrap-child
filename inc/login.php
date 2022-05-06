<?php
/**
 * Add header and footer to login screen
 */
add_action( 'login_head', 'custom_login_header' );
function custom_login_header() {
  echo '<link rel="stylesheet" href="' . get_bloginfo('stylesheet_directory') . '/css/wp-custom-login.css" type="text/css" />';
  do_action('wp_custom_login_header_before');
  get_header();
  do_action('wp_custom_login_header_after');
}

add_action( 'login_footer', 'custom_login_footer' );
function custom_login_footer() {
  do_action('wp_custom_login_footer_before');
  get_footer('login');
  do_action('wp_custom_login_footer_after');
}	