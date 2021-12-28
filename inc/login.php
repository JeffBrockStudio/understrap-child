<?php
/**
 * Custom login logo
 */
function custom_login_logo() { ?>
  <style type="text/css">
    .login h1 a {
      background-image: url( <?php $image = get_field( 'login_logo', 'options' ); echo $image['url']; ?> );
      height: 84px;
      width: 100%;
      background-size: contain;
    }
  </style>
<?php }
add_action( 'login_head', 'custom_login_logo' );

function custom_login_logo_url() {
  return get_bloginfo( 'url' );
}
add_filter( 'login_headerurl', 'custom_login_logo_url' );

function custom_login_logo_url_title() {
  return get_bloginfo( 'name' );
}
add_filter( 'login_headertitle', 'custom_login_logo_url_title' );
	