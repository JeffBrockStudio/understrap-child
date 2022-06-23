<?php
/**
 * The template for single events. 
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
						<h1>Events Calendar</h1>
					</div>
				</div>
			</div>
		</header>		
	
		<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">
		
			<?php
			while ( have_posts() ) {
				the_post();?>
				<div class="row">
				
					<div class="col-12 col-md-8 col-lg-9">			
						<h2><?php the_title(); ?></h2>	
						
						<div class="type">
							<?php 
							$event_types = get_the_terms( $post->ID, 'event_types');
							if( $event_types ):
									$event_types_array = array();
									foreach ( $event_types AS $event_type ) {
										$event_types_array[] = '<a href="/calendar/?event_types='. $event_type->slug .'">' .  $event_type->name . '</a>';
									}
							endif;
							echo implode( ' &#8226; ', $event_types_array ); ?>										
						</div>
						
						<div class="entry">
							<?php the_content(); ?>
						</div>
						
					</div>						
					
					<div class="col-12 col-md-4 col-lg-3">			
						<div class="sidebar">
							
							<div class="date">																	
								<h3><?php echo date( get_option('date_format'), strtotime( get_field( 'event_start_date', $post->ID )));	?></h3>
								<?php if ( get_field( 'event_start_time', $post->ID )): ?>
									<div class="time"><?php echo get_field( 'event_start_time', $post->ID );
									if ( get_field( 'event_end_time', $post->ID )):
										echo ' - ' . get_field( 'event_end_time', $post->ID );
									endif;
									?></div>
								<?php endif; ?>																									
							</div>
							
							<div class="location">								
								<?php if ( get_field( 'event_location_text', $post->ID )):?>
									<div class="location-text">
										<?php echo get_field( 'event_location_text', $post->ID ); ?>
									</div>
								<?php endif; ?>
								<?php if ( get_field( 'event_location_address', $post->ID )):?>
									<div class="address">
										<?php echo get_field( 'event_location_address', $post->ID ); ?>
									</div>
								<?php endif; ?>
								<?php if ( get_field( 'event_location_city', $post->ID ) OR get_field( 'event_location_state',  $post->ID ) OR get_field( 'event_location_zip',  $post->ID ) ):?>
									<div class="city-state-zip">
										<?php echo get_field( 'event_location_city', $post->ID ); ?>
										<?php echo get_field( 'event_location_state', $post->ID ); ?> 										
										<?php echo get_field( 'event_location_zip', $post->ID ); ?>
									</div>
									<div class="map-link">
										<?php if ( get_field( 'event_location_google_map_link', $post->ID )):
												$map_link = get_field( 'event_location_google_map_link', $post->ID );												
											else:												
												$map_link = 'https://www.google.com/maps?q=' .
												urlencode(get_field( 'event_location_address', $post->ID )) . ',' .
												urlencode(get_field( 'event_location_city', $post->ID )) . ',' .
												urlencode(get_field( 'event_location_state', $post->ID )) . ',' .
												urlencode(get_field( 'event_location_zip', $post->ID ));												
											endif;
											?>										
										[<a href="<?php echo $map_link ?>" target="_blank">Map</a>]
									</div>
								<?php endif; ?>
							</div>
							
							<?php if ( get_field( 'event_rsvp', $post->ID )): ?>
								<div class="buttons">
									<a class="btn btn-primary" href="<?php $link = get_field( 'event_rsvp_link', $post->ID ); echo $link['url'];?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></a>
							<?php endif; ?>							
							
						</div>
					</div>				
				
				</div>
				
				<?php
			}
			?>

		</div><!-- #content -->
	
	</main><!-- #main -->	
</div><!-- #page-wrapper -->

<?php
get_footer();
