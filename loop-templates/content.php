<?php
/**
 * Post rendering content according to caller of get_template_part
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
	
	<div class="entry-content">		
		<div class="row">
			
			<div class="col-12 col-md-4">
				<?php if ( get_the_post_thumbnail( $post->ID )): ?>
					<a href="<?php echo esc_url( get_permalink()); ?>">
						<div class="featured-image">
							<?php echo get_the_post_thumbnail( $post->ID, 'thumbnail_4_3' ); ?>
						</div>
					</a>
				<?php endif; ?>
			</div>
			
			<div class="col-12 col-md-8">
				
				<header class="entry-header">
					
					<?php if ( 'post' === get_post_type() ) : ?>
					
						<div class="type">
							<?php 
							$news_types = get_the_terms( $post->ID, 'category' );
							if( $news_types ):
								$news_types_array = array();
								foreach ( $news_types AS $news_type ) {
									$news_types_array[] = '<span>' .  $news_type->name . '</span>';
								}
							endif;
							echo implode( ' &#8226; ', $news_types_array ); ?>										
						</div>
					
						<div class="entry-meta">
							<?php understrap_posted_on(); ?>
						</div>
					
					<?php endif; ?>
				
					<?php
					the_title(
						sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ),
						'</a></h2>'
					);
					?>
				
				</header><!-- .entry-header -->	
				
				<div class="excerpt">
					<?php				
					if ( $post->post_excerpt ):						
						echo strip_tags( $post->post_excerpt );
					else:
						// $content = apply_filters('the_content', $content);
						// $content = str_replace(']]>', ']]&gt;', $content);
						// echo understrap_limit_text( $content, 50 );
					endif;
					?>
				</div>
								
				<?php 
				$taxonomy = get_the_terms( $post->ID, 'focus_areas' );					
				if( $taxonomy ):
					$taxonomy_array = array();
					foreach ( $taxonomy AS $term ) {
						$taxonomy_array[] = '<span>' .  $term->name . '</span>';
					}?>
					<div class="focus-areas">
						<?php echo implode( ' &#8226; ', $taxonomy_array );?>
					</div>
					<?php
				endif;
			  ?>				
				
			</div>
		
		</div>	
	</div>

</article><!-- #post-## -->
