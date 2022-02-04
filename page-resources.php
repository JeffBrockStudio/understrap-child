<?php
/* Template Name: Resources */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );

?>

<div class="wrapper" id="page-wrapper">
	
	<?php
	if( have_rows('blocks') ): ?>
	
		<main class="site-main" id="content">
			
			<?php while ( have_posts() ) : the_post(); ?>
				
				<?php if( !post_password_required( $post )): ?>
					<?php require( 'inc/blocks.php' ); ?>
				<?php endif; ?>
	
			<?php endwhile; ?>
	
		</main>
		
		<?php	
	endif;
	?>

	<?php 
	$post_type = 'resource';
	require( 'inc/resources.php' ); ?>
	
</div><!-- #page-wrapper -->

<?php
get_footer();
