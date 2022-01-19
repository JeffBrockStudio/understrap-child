<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$container = get_theme_mod( 'understrap_container_type' );
?>

<?php get_template_part( 'sidebar-templates/sidebar', 'footerfull' ); ?>

<div class="wrapper" id="wrapper-footer">

	<div class="<?php echo esc_attr( $container ); ?>">

		<div class="row">

			<div class="col-md-12">

				<footer class="site-footer" id="colophon">

					<div class="row">
											
						<div class="col-12 col-md-6">
							<?php if ( get_field( 'logo_footer', 'options' )): ?>
								<div class="logo">
									<a href="">
										<img src="<?php $image = get_field( 'logo_footer', 'options' ); echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
									</a>
								</div>
							<?php endif; ?>
						</div>
						
						<div class="col-12 col-md-6">
							<?php if ( has_nav_menu( 'footer-menu' ) ): ?>
								<?php wp_nav_menu(
									array(
										'theme_location'  => 'footer-menu',
										'fallback_cb'     => '',
										'menu_id'         => 'footer-menu',
										'depth'           => 2,
										'walker'          => new Understrap_WP_Bootstrap_Navwalker(),
									)
								); ?>					
							<?php endif; ?>							
						</div>
					
					</div>					
					
					<div class="row">
						
						<div class="col-12 col-md-6">
							<?php if ( get_field( 'legal', 'options' )): ?>
								<div class="legal">
									<?php echo apply_filters( 'the_content', get_field( 'legal', 'options' )); ?>
								</div>	
							<?php endif; ?>
						</div>
						
						<div class="col-12 col-md-6">
							<?php if ( has_nav_menu( 'legal-menu' ) ): ?>
								<?php wp_nav_menu(
									array(
										'theme_location'  => 'legal-menu',
										'fallback_cb'     => '',
										'menu_id'         => 'legal-menu-footer',
										'depth'           => 2,
										'walker'          => new Understrap_WP_Bootstrap_Navwalker(),
									)
								); ?>				
							<?php endif; ?>
							
							<?php					
							if ( get_field( 'social_media', 'options' )) {?>
								<div class="social-media">
									<?php
									$social_media = get_field( 'social_media', 'options' );
									foreach ( $social_media AS $social_media_item ) {?>
										<a href="<?php echo $social_media_item['url']; ?>" target="_blank"><?php echo $social_media_item['icon']; ?><span class="sr-only"><?php echo $social_media_item['title'];?></span>
										</a>
									<?php 
									}?>
								</div><?php 
							}
							?>			
						</div>
						
					</div>

				</footer><!-- #colophon -->

			</div><!--col end -->

		</div><!-- row end -->

	</div><!-- container end -->

</div><!-- wrapper end -->

</div><!-- #page we need this extra closing tag here -->

<div id="search-overlay"></div>

<?php if ( get_field( 'scripts', 'options' )) {
	echo $script_code['footer'];
} ?>	

<?php wp_footer(); ?>

</body>

</html>

