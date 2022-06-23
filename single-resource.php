<?php
/**
 * The template for single resources. 
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );

?>

<div class="wrapper" id="page-wrapper">
	<main class="site-main" id="content">
		
		<header>
			<div class="<?php echo esc_attr( $container ); ?>">				
				<div class="row">				
					<div class="col-12">
						<h1>Resources</h1>
					</div>
				</div>
			</div>
		</header>		
	
	<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">

		<div class="row">

			<!-- Do the left sidebar check -->
			<?php get_template_part( 'global-templates/left-sidebar-check' ); ?>

				<?php
				while ( have_posts() ) {
					the_post();?>
					
					<div class="date">
						<?php echo get_the_date( get_option('date_format'), $post->ID ); ?>
					</div>
					
					<div class="row">
						<div class="col-12 col-md-9">
							<h2><?php the_title(); ?></h2>	
						</div>				
						<div class="col-12 col-md-3 col-top-button">
							<?php  
							$file = get_field( 'resource_pdf' );
							if ( $file ): ?>
								<div class="button">
									<a class="btn btn-primary" href="<?php echo $file['url']; ?>" target="_blank" download>Download</a>
								</div>
								<?php
							endif;?>
						</div>
					</div>
					
					<div class="topic">
						<?php 
						$resource_topics = get_the_terms( $post->ID, 'resource_topics'); ?>
						<?php 
						if( $resource_topics ):
								$resource_topics_array = array();
							foreach ( $resource_topics AS $resource_topic_name ) {
								$resource_topics_array[] = $resource_topic_name->name;
							}
						endif;
						echo implode( ', ', $resource_topics_array );
						//$related_topic = implode( $resource_topics_array, ', ' );
						 ?>
					</div>
					
					<div class="entry">
						<?php the_content(); ?>
					</div>
					
					<div class="col-12 col-md-9">		
						
						<?php if ( $file ): ?>																	
							<?php echo do_shortcode( '[pdf-embedder url="'. $file['url'] .'"]' ); ?>
							
							<div class="button bottom-button">
								<a class="btn btn-primary" href="<?php $file = get_field( 'resource_pdf' ); echo $file['url']; ?>" target="_blank" download>Download</a>
							</div>
						<?php endif; ?>
						
						<?php $website = get_field( 'resource_website_url' );
						if ( $website ):?>
							<div class="website">
								<a href="<?php echo $website; ?>" target="_blank"><?php echo $website; ?></a>								
							</div>
							<?php
						endif; ?>
												
						<?php $video = get_field( 'resource_url' );
						if ( $video ):?>
							<div class="video-wrapper">
								<?php echo $video; ?>
							</div>
							<?php
						endif; ?>
						
					</div>
					
					<?php
				}
				?>

			</main><!-- #main -->

			<!-- Do the right sidebar check -->
			<?php get_template_part( 'global-templates/right-sidebar-check' ); ?>

		</div><!-- .row -->

	</div><!-- #content -->
	
</div><!-- #page-wrapper -->

<?php
get_footer();
