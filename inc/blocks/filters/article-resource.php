<?php
$permalink = esc_url( get_permalink( $resource_id ));
$target = '';
?>

<div class="col-12 col-md-6 col-lg-4 item">
	<article <?php post_class(); ?>>									
										
		<div class="row">
				
			<div class="col-12">
				<?php if ( $show['thumbnails'] ): ?>
					<div class="image">
						<?php 
						$resource_types = get_the_terms( $resource_id, 'resource_types');
						if( $resource_types ):
							foreach ( $resource_types AS $resource_type_name ) {
								$term_id = $resource_type_name->term_id;
								$publication_type_featured_image = get_field( 'publication_type_featured_image', 'term_' . $term_id);
							}
						endif;
				 	?>				
						<?php if ( $publication_type_featured_image ): ?>		
							<a href="<?php echo $permalink; ?>" target="<?php echo $target; ?>">
						 		<img src="<?php $image = $publication_type_featured_image; echo $publication_type_featured_image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />			
							</a>
						<?php endif; ?>									 
					</div>
				<?php endif; ?>
				
				<div class="inner">												
					<div class="title">
						<h3><a href="<?php echo $permalink; ?>" target="<?php echo $target; ?>"><?php echo get_the_title( $resource_id ); ?></a></h3>
					</div>

					<?php if ( $show['date'] ): ?>
						<div class="entry-meta">
							<?php echo ( get_the_date( get_option('date_format'), $resource_id )); ?>																
						</div>
					<?php endif; ?>						
										
					<?php if ( $show['excerpt'] ): ?>
						<div class="text">
							<?php echo apply_filters( 'the_content', get_field( 'resource_short_description_text', $resource_id )); ?>	
						</div>
					<?php endif; ?>
					
					<?php if ( $show['button'] ): ?>
						<div class="buttons">
							<a class="btn btn-primary" href="<?php echo $permalink; ?>" target="<?php echo $target; ?>"><?php _e('Read More', 'powehi') ?></a>
						</div>
					<?php endif; ?>
					
				</div>
				
			</div>
							
		</div>

	</article>
</div>