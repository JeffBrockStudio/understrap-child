<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<div class="container">
		
		<?php if ( get_sub_field( 'heading' )): ?>
			<div class="row heading">			
				<div class="col-12">
					<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
				</div>			
			</div>
		<?php endif; ?>
		
		<div class="row">
		
			<?php
			if ( get_sub_field( 'number_of_posts' )):
				$number_of_posts = get_sub_field( 'number_of_posts' );
			else:
				$number_of_posts = '-1';
			endif;
			
			$args = array( 
				'post_type' => 'post',
				'posts_per_page' => $number_of_posts,
				'post_status' => 'publish'
			);

			$category = get_sub_field( 'category' );
			if ( $category ):
				$args['category__in'] = $category;
			endif;
			
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
			wp_reset_postdata();
			?>
		</div><!-- .row -->
				
	</div>
</div>