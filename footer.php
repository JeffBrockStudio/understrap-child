<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

$container = get_theme_mod('understrap_container_type');
?>

<?php get_template_part('sidebar-templates/sidebar', 'footerfull'); ?>

<div class="wrapper" id="wrapper-footer">

	<div class="<?php echo esc_attr($container); ?>">

		<div class="row">

			<div class="col-md-12">

				<footer class="site-footer" id="colophon">

					<div class="row">

						<div class="col-12 col-md-6">
							<?php if (get_field('logo_footer', 'options')) : ?>
								<div class="logo">
									<a href="<?php echo get_site_url(); ?>">
										<img src="<?php $image = get_field('logo_footer', 'options');
															echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
									</a>
								</div>
							<?php endif; ?>

							<?php if (get_field('footer_newsletter_form', 'options')) : ?>
								<div class="newsletter">
									<h3 class="newsletter-heading"><?php echo get_field('footer_newsletter_heading', 'options'); ?></h3>
									<?php
									echo FrmFormsController::get_form_shortcode(array(
										'id' => get_field('footer_newsletter_form', 'options'),
										'title' => false,
										'description' => false
									));
									?>
								</div>
							<?php endif; ?>

						</div>

						<div class="col-12 col-md-6">
							<?php if (has_nav_menu('footer-menu')) : ?>
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

							<?php
							if (get_field('footer_affiliations_partners', 'options')) :
								$items = get_field('footer_affiliations_partners', 'options'); ?>
								<div class="affiliations-partners">

									<div class="row">
										<div class="col-12">
											<h3 class="heading"><?php echo get_field('footer_affiliations_partners_heading', 'options'); ?></h3>
										</div>
									</div>

									<div class="row row">
										<div class="col-12">
											<div class="icons">
												<?php
												foreach ($items as $item) { ?>
													<div class="item">
														<a href="<?php $link = $item['link'];
																			echo $link['url']; ?>" target="<?php echo $link['target']; ?>">
															<img src="<?php $image = $item['image'];
																				echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" width="<?php echo $image['width']; ?>" height="<?php echo $image['height']; ?>" />
														</a>
													</div>
												<?php
												} ?>
											</div>
										</div>
									</div>

								</div>
							<?php
							endif;
							?>

						</div>

					</div>

					<div class="row">

						<div class="col-12 col-md-6">
							<?php if (get_field('legal', 'options')) : ?>
								<div class="legal">
									<?php echo apply_filters('the_content', get_field('legal', 'options')); ?>
								</div>
							<?php endif; ?>
						</div>

						<div class="col-12 col-md-6">
							<?php if (has_nav_menu('legal-menu')) : ?>
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

							<div class="contact">

								<?php if (get_field('footer_contact_heading', 'options')) : ?>
									<h3 class="contact-heading"><?php echo get_field('footer_contact_heading', 'options'); ?></h3>
								<?php endif; ?>

								<?php if (get_field('contact_address', 'options')) : ?>
									<div class="address">
										<?php echo get_field('contact_address', 'options'); ?>
									</div>
								<?php endif; ?>
								<?php if (get_field('contact_city', 'options') or get_field('contact_state',  'options') or get_field('contact_zip',  'options')) : ?>
									<div class="city-state-zip">
										<?php echo get_field('contact_city', 'options'); ?>
										<?php echo get_field('contact_state', 'options'); ?>
										<?php echo get_field('contact_zip', 'options'); ?>
									</div>
									<div class="map-link">
										<?php if (get_field('contact_google_map_link', 'options')) :
											$map_link = get_field('contact_google_map_link', 'options');
										else :
											$map_link = 'https://www.google.com/maps?q=' .
												urlencode(get_field('contact_address', 'options')) . ',' .
												urlencode(get_field('contact_city', 'options')) . ',' .
												urlencode(get_field('contact_state', 'options')) . ',' .
												urlencode(get_field('contact_zip', 'options'));
										endif;
										?>
										[<a href="<?php echo $map_link ?>" target="_blank">Map</a>]
									</div>
								<?php endif; ?>

								<?php if (get_field('contact_phone', 'options')) :
									$phone = get_field('contact_phone', 'options'); ?>
									<div class="phone">
										<a aria-label="Call us at <?php echo display_phone($phone); ?>" href="<?php echo format_phone($phone); ?>" /><?php echo display_phone($phone); ?></a>
									</div>
								<?php
								endif;
								?>

								<?php if (get_field('contact_email', 'options')) :
									$email = get_field('contact_email', 'options'); ?>
									<div class="email">
										<a aria-label="Email us at <?php echo $email; ?>" href="mailto:<?php echo $email; ?>" /><?php echo $email; ?></a>
									</div>
								<?php
								endif;
								?>

							</div>

							<?php
							if (get_field('social_media', 'options')) { ?>
								<div class="social-media">
									<?php
									$social_media = get_field('social_media', 'options');
									foreach ($social_media as $social_media_item) { ?>
										<a href="<?php echo $social_media_item['url']; ?>" target="_blank"><?php echo $social_media_item['icon']; ?><span class="sr-only"><?php echo $social_media_item['title']; ?></span>
										</a>
									<?php
									} ?>
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

<?php if (get_field('scripts', 'options')) {
	global $script_code;
	echo $script_code['footer'];
} ?>

<?php wp_footer(); ?>

</body>

</html>