<div id="<?php echo $block_id; ?>" class="block job-listings" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?><?php if ( get_sub_field( 'background_color' ) ): echo ' background-color: ' . get_sub_field( 'background_color' ). '; '; endif; ?>">

	<div class="container">							
	
		<div class="row row-jobs">
			<?php $args = array( 
				'post_type' => 'job',
				'posts_per_page' => '-1',
				'post_status' => 'publish',
				'orderby' => 'title',
				'order' => 'ASC'
			);
			$the_query = new WP_Query( $args );
			if ( $the_query->have_posts() ) {
				while ( $the_query->have_posts() ) {
					$the_query->the_post();?>
					<div class="col-12 col-md-4 col-lg-3 col-job">
						<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					</div>
					<?php
				}
			};
			wp_reset_postdata();
		 ?>
			
		</div>
		
		<?php if ( get_sub_field( 'closing_text' )): ?>
			<div class="row">
				<div class="col-12">
					<h3 class="closing-text"><?php echo get_sub_field( 'closing_text' ); ?></h3>
				</div>
			</div>
		<?php endif; ?>
			
	</div>
		
</div>