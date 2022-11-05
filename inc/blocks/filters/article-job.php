<?php
$permalink = esc_url( get_field( 'job_link', $resource_id ));
$target = '_blank';
?>

<div class="item col-12">
	<article <?php post_class(); ?>>									
						
		<div class="row">
			
			<div class="col-12"> 								
				<div class="title">
					<h3><a href="<?php echo $permalink; ?>" target="<?php echo $target; ?>"><?php echo get_the_title( $resource_id ); ?></a></h3>
				</div>				
			</div>
			
		</div>
										
		<div class="row">
				
			<div class="col-12 col-lg-8">
				
				<?php if ( $show['excerpt'] ): ?>
					<div class="text">
						<?php echo apply_filters( 'the_content', get_field( 'job_short_description', $resource_id )); ?>	
					</div>
				<?php endif; ?>
				
				<?php if ( $show['taxonomies'] ): ?>								
					<div class="taxonomies">										
						<?php 
						$taxonomy = get_the_terms( $resource_id, 'job_categories' );
						if( $taxonomy ):?>											
								<?php
								$taxonomy_array = array();
								foreach ( $taxonomy AS $term ) {
									$taxonomy_array[] = '<a href="' .$permalink_parent. '?job_categories=' .$term->slug.  '"><span>' .  $term->name . '</span></a>';
								}?>
								<div class="taxonomy">
									<?php echo implode( ' &#8226; ', $taxonomy_array );?>
								</div>
							<?php
						endif; ?>																
					</div>									
				<?php endif; ?>
				
				<?php if ( $show['button'] ): ?>
					<div class="buttons">
						<a class="btn btn-primary" href="<?php echo $permalink; ?>" target="<?php echo $target; ?>"><?php _e('Read More', 'powehi') ?></a>
					</div>
				<?php endif; ?>
					
			</div>
			
			<div class="col-12 col-lg-3 offset-lg-1">
				<div class="entry-meta">
					
					<ul>
						<?php if ( get_field( 'job_posting_date', $resource_id )): ?>
							<li class="posted">	
								<strong><?php _e( 'Posted', 'powehi') ?>:</strong>
								<?php echo ( date( get_option('date_format'), strtotime( get_field( 'job_posting_date', $resource_id )))); ?>
							</li>			
						<?php endif; ?>
						
						<?php if ( get_field( 'job_closing_info', $resource_id )): ?>
							<li class="closing">	
								<strong><?php _e( 'Closing', 'powehi') ?>:</strong>
								<?php echo get_field( 'job_closing_info' ); ?>
							</li>			
						<?php endif; ?>
						
						<?php if ( get_field( 'job_department', $resource_id )): ?>
							<li class="closing">	
								<strong><?php _e( 'Filled Department', 'powehi') ?>:</strong>
								<?php echo get_field( 'job_department' ); ?>
							</li>			
						<?php endif; ?>					
					</ul>
																		
				</div>			
			</div>				
			
		</div>

	</article>
</div>