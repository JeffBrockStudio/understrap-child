<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );

?>

<div class="wrapper" id="page-wrapper">
	
	<?php
	// Check if any blocks are present
	if ( is_home()) {
		$post_id = get_option( 'page_for_posts' );
	} else {
		$post_id = $post->ID;
	}
		
	if( have_rows('blocks', $post_id) ): ?>
	
		<main class="site-main" id="content">
			
			<?php while ( have_posts() ) : the_post(); ?>
				
				<?php if( !post_password_required( $post )): ?>
					<?php require( 'inc/blocks.php' ); ?>
				<?php endif; ?>
	
			<?php endwhile; ?>
	
		</main>
		
		<?php	
	else:
	?>
	
	<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">

		<div class="row">

			<!-- Do the left sidebar check -->
			<?php get_template_part( 'global-templates/left-sidebar-check' ); ?>

			<main class="site-main" id="main">

				<?php
				while ( have_posts() ) {
					the_post();
					get_template_part( 'loop-templates/content', 'page' );

					// If comments are open or we have at least one comment, load up the comment template.
					if ( comments_open() || get_comments_number() ) {
						comments_template();
					}
				}
				?>

			</main><!-- #main -->

			<!-- Do the right sidebar check -->
			<?php get_template_part( 'global-templates/right-sidebar-check' ); ?>

		</div><!-- .row -->

	</div><!-- #content -->
	
	<?php
	endif;
	?>

</div><!-- #page-wrapper -->

<?php
get_footer();
