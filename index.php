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
?>

<?php if ( is_front_page() && is_home() ) : ?>
	<?php get_template_part( 'global-templates/hero' ); ?>
<?php endif; ?>

<div class="wrapper" id="index-wrapper">
	
	<?php require( 'inc/blocks.php' ); ?>
	
	<?php if ( get_field( 'blog_newsletter_signup_form', $post_id )): ?>
		<div id="newsletter-signup-body">
			<div class="<?php echo esc_attr( $container ); ?>">
				<div class="row">
					
					<div class="col-12">
						<?php if ( get_field( 'blog_newsletter_signup_heading', $post_id )): ?>
							<h3 class="newsletter-heading"><?php echo get_field( 'blog_newsletter_signup_heading', $post_id ); ?></h3>
						<?php endif; ?>
						<?php       
						echo FrmFormsController::get_form_shortcode(array(
							'id' => get_field( 'blog_newsletter_signup_form', $post_id ), 
							'title' => false, 
							'description' => false
						));	          
						?>		
					</div>
				</div>
				
			</div>
		</div>
	<?php endif; ?>
	
	<?php
	$args = array( 
		'post_type' => 'post',
		'posts_per_page' => '1',
		'post__in' => get_option( 'sticky_posts' ),
		'post_status' => 'publish',					
		'ignore_sticky_posts' => 1
	);
	$the_query = new WP_Query( $args );
	if ( $the_query->have_posts() ) {
		while ( $the_query->have_posts() ) {
			$the_query->the_post();?>
				<div id="featured-post">			
					<div class="container" id="content" tabindex="-1">
						<div class="row">
					
							<div class="col-12 col-md-4">
								<?php if ( get_the_post_thumbnail( $post->ID )): ?>
									<div class="featured-image">
										<a href="<?php echo esc_url( get_permalink()); ?>">
											<?php echo get_the_post_thumbnail( $post->ID, 'thumbnail_4_3' ); ?>
										</a>
									</div>
								<?php endif; ?>
							</div>
							
							<div class="col-12 col-md-8">							
									
								<h2><?php	the_title();?></h2>
								
								<div class="excerpt">
									<?php				
									if ( $post->post_excerpt ):						
										echo $post->post_excerpt;
									else:
										// $content = apply_filters('the_content', $content);
										// $content = str_replace(']]>', ']]&gt;', $content);
										// echo understrap_limit_text( $content, 50 );
									endif;
									?>
								</div>
								
								<div class="buttons">
									<a class="btn btn-primary" href="<?php echo esc_url( get_permalink()); ?>">Learn More</a>
								</div>
										
							</div>
							
						</div>
					</div>
				</div>
			<?php						
		}
	};
	wp_reset_postdata();?>

	<div class="<?php echo esc_attr( $container ); ?>">

		<div class="row">

			<!-- Do the left sidebar check and opens the primary div -->
			<?php get_template_part( 'global-templates/left-sidebar-check' ); ?>

			<main class="site-main" id="main">
			
				<?php
				$args = array( 
					'post_type' => 'post',
					'posts_per_page' => '10',
					'post__not_in' => get_option( 'sticky_posts' ),
					'post_status' => 'publish',					
				);
				$the_query = new WP_Query( $args );
				
				if ( $the_query->have_posts() ) {
					// Start the Loop.
					while ( $the_query->have_posts() ) {
						$the_query->the_post();

						/*
						 * Include the Post-Format-specific template for the content.
						 * If you want to override this in a child theme, then include a file
						 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
						 */
						get_template_part( 'loop-templates/content', get_post_format() );
					}
				} else {
					get_template_part( 'loop-templates/content', 'none' );
				}
				?>

			</main><!-- #main -->

			<!-- The pagination component -->
			<?php understrap_pagination(); ?>

			<!-- Do the right sidebar check -->
			<?php get_template_part( 'global-templates/right-sidebar-check' ); ?>

		</div><!-- .row -->

	</div><!-- #content -->

</div><!-- #index-wrapper -->

<?php
get_footer();
