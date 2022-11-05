<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );

$post_id = get_option( 'page_for_posts' );
$post_type = 'post';

// Get labels for post type
$post_type_object = get_post_type_object( $post_type ); 
$post_type_labels = $post_type_object->labels;

?>

<div class="wrapper" id="page-wrapper">
	
	<?php require( 'inc/blocks.php' ); ?>
	
</div><!-- #index-wrapper -->

<?php
get_footer();
