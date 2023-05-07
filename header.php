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
	
	<link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_stylesheet_directory_uri(); ?>/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon-16x16.png">
	<link rel="manifest" href="<?php echo get_stylesheet_directory_uri(); ?>/site.webmanifest">
	<link rel="mask-icon" href="<?php echo get_stylesheet_directory_uri(); ?>/safari-pinned-tab.svg" color="#5bbad5">
	<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico">
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="msapplication-config" content="<?php echo get_stylesheet_directory_uri(); ?>/wp-content/themes/r2ak/browserconfig.xml">
	<meta name="theme-color" content="#ffffff">

	<?php 
	// External scripts
	$script_code = array();
	$script_code['header'] = '';
	$script_code['body'] = '';
	$script_code['footer'] = '';
	
	if ( get_field( 'scripts', 'options' )) {
		$scripts = get_field( 'scripts', 'options' );
		global $script_code;
		
		foreach ( $scripts AS $script ) {
			
			if ( $script['script_location'] == 'header' && $script['script_enabled'] ) {
				$script_code['header'] .= $script['script_code'] . '
	
	';
			}
	
			if ( $script['script_location'] == 'body' && $script['script_enabled'] ) {
				$script_code['body'] .= $script['script_code'] . '
	
	';			
			}
	
			if ( $script['script_location'] == 'footer' && $script['script_enabled'] ) {
				$script_code['footer'] .= $script['script_code'] . '
	
	';						
			}
			
		}
	}

	echo $script_code['header']; ?>
	
	<?php wp_head(); ?>
</head>

<body
<?php if ( POWEHI_ENABLE_PAGE_TRANSITIONS ):
	body_class( 'animate-in' );
else:
	body_class();
endif; ?>
<?php understrap_body_attributes(); ?>>

<?php 
if ( get_field( 'scripts', 'options' )) {
	echo $script_code['body'];
}; ?>	

<?php do_action( 'wp_body_open' ); ?>


<div id="wrapper-search" class="modal fade" tabindex="-1" aria-hidden="true" aria-label="Search popup">
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
	
			<!-- Modal Header -->
			<div class="modal-header">
				<?php get_search_form(); ?>
				<button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><img src="<?php echo get_stylesheet_directory_uri();?>/img/icon-close.svg" alt=""></button>
			</div>

		</div>
	</div>
</div>


<div class="site" id="page">

	<!-- ******************* The Navbar Area ******************* -->
	<header id="wrapper-navbar">

		<a class="skip-link <?php echo understrap_get_screen_reader_class( true ); ?>" href="#content">
			<?php esc_html_e( 'Skip to content', 'understrap' ); ?>
		</a>

		<?php get_template_part( 'global-templates/navbar', $navbar_type . '-' . $bootstrap_version ); ?>

	</header><!-- #wrapper-navbar -->
