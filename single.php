<?php
/**
 * The template for displaying all single posts
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

<div class="wrapper" id="page-wrapper">
		
			<main class="site-main" id="main">

				<?php
				while ( have_posts() ) {
					the_post(); ?>
					
					<header>
						<div class="<?php echo esc_attr( $container ); ?>">				
							<div class="row">				
								<div class="col-12">
									<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

									<div class="entry-meta">									
										<?php understrap_posted_on(); ?>								
									</div><!-- .entry-meta -->
									
								</div>
							</div>
						</div>
					</header>		
						
						<?php if ( !get_field( 'hide_featured_image' )): ?>
							<div class="featured-image">
								<?php echo get_the_post_thumbnail( $post->ID, 'large' ); ?>
							</div>
						<?php endif; ?>						
					
						<div class="entry-content">
					
							<?php if( !post_password_required( $post )): ?>
								<?php require( 'inc/blocks.php' ); ?>
							<?php endif; ?>
							
							<?php
							the_content();
							?>
							
							<?php understrap_link_pages(); ?>
					
					
						</div><!-- .entry-content -->
					</article><!-- #post-## -->
					
						<?php /* ?>
						<footer class="entry-footer">
					
							<?php understrap_entry_footer(); ?>
					
						</footer><!-- .entry-footer -->
						<?php */ ?>
					
					
					<?php
					
					understrap_post_nav();

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

</div><!-- #single-wrapper -->

<?php
get_footer();
