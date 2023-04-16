<?php
/**
 * Single post partial template
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<header class="entry-header">

		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

		<div class="entry-meta">

			<?php understrap_posted_on(); ?>

		</div><!-- .entry-meta -->

	</header><!-- .entry-header -->
	
	<?php if ( !get_field( 'hide_featured_image' )): ?>
		<div class="featured-image">
			<?php echo get_the_post_thumbnail( $post->ID, 'large' ); ?>
		</div>
	<?php endif; ?>

	<div class="entry-content">

		<?php if( !post_password_required( $post )): ?>
			<?php include( '../inc/blocks.php' ); ?>
		<?php endif; ?>
		
		<?php
		the_content();
		?>
		
		<?php understrap_link_pages(); ?>


	</div><!-- .entry-content -->

	<footer class="entry-footer">

		<?php understrap_entry_footer(); ?>

	</footer><!-- .entry-footer -->

</article><!-- #post-<?php the_ID(); ?> -->
