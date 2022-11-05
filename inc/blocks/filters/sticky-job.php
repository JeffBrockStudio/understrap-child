<?php
$permalink = esc_url( get_field( 'job_link', $post->ID ));
$target = '_blank';
$resource_id = $post->ID;
?>

<div class="sticky-article <?php echo $post_type; ?>" id="sticky-<?php echo $post_type; ?>">
	<div class="container" tabindex="-1">
		<div class="row">
						
			<div class="col-12">
				<p class="superheading"><?php _e('Featured', 'powehi') ?> <?php echo $post_type_labels->singular_name; ?></p>
			</div>
			
		</div>
		<div class="row">
			
			<div class="col-12"> 								
				<div class="title">
					<h3><a href="<?php echo $permalink; ?>" target="<?php echo $target; ?>"><?php echo get_the_title( $resource_id ); ?></a></h3>
				</div>				
			</div>	
			
		</div>
		
		<div class="row">
			
			<div class="col-12 col-lg-9">		
										
				<?php
				if ( get_field( $post_type . '_short_description', $post->ID )): ?>
					<div class="excerpt">
						<?php echo apply_filters( 'the_content', get_field( $post_type . '_short_description', $post->ID ));  ?>
					</div>
					<?php
				endif;
				?>
				
				<div class="buttons">
					<a href="<?php echo $permalink; ?>" target="<?php echo $target; ?>" class="btn btn-primary"><?php echo $post_type_labels->view_item; ?></a>						
				</div>

			</div>
			
			<div class="col-12 col-lg-3">
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
	</div>
</div>		