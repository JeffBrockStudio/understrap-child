<?php
/**
 * The header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$bootstrap_version = get_theme_mod( 'understrap_bootstrap_version', 'bootstrap4' );
$navbar_type       = get_theme_mod( 'understrap_navbar_type', 'collapse' );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body
<?php if ( POWEHI_ENABLE_PAGE_TRANSITIONS ):
	body_class( 'animate-in' );
else:
	body_class();
endif; ?>
<?php understrap_body_attributes(); ?>>
<?php do_action( 'wp_body_open' ); ?>

<div id="wrapper-search" aria-hidden="true">
	<div class="container">
		<div class="row">
			<div class="col-8 offset-1 col-md-8 offset-md-2">
					<?php get_search_form(); ?>
					<div class="close"><img src="<?php echo get_stylesheet_directory_uri();?>/img/icon-close.svg"></div>
			</div>
		</div>
	</div>
</div>

<div class="site" id="page">

	<!-- ******************* The Navbar Area ******************* -->
	<header id="wrapper-navbar">

		<a class="skip-link sr-only sr-only-focusable" href="#content"><?php esc_html_e( 'Skip to content', 'understrap' ); ?></a>

		<?php get_template_part( 'global-templates/navbar', $navbar_type . '-' . $bootstrap_version ); ?>

	</header><!-- #wrapper-navbar end -->
