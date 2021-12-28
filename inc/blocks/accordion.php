<?php $accordion_block_id = generateRandomString();?>
<div class="block accordion" id="accordion-block-<?php echo $accordion_block_id; ?>">
	<div class="container">
		<div class="row">
			<div class="col-12">
				<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
				<hr />
				
				<div class="text intro">
					<?php echo apply_filters( 'the_content', the_sub_field( 'text' )); ?>
				</div>
	
		
				<?php 
				$posts = get_sub_field('items');
				if( $posts ): 
					$i = 1;
					foreach( $posts as $post):
						setup_postdata($post); ?>
						<div class="accordion">
							<a class="question collapsed" role="button" data-toggle="collapse" data-target="#accordion-block-<?php echo $accordion_block_id; ?> #accordion-<?php echo $i; ?>">
								<i class="fas fa-plus"></i>
								<i class="fas fa-minus"></i>
								<?php the_title(); ?>
								<?php if ( get_field('subheading')): ?>
									<div class="subheading"><?php echo $item['subheading']; ?></div>
								<?php endif; ?>
							</a>
							<div class="answer collapse text" id="accordion-<?php echo $i; ?>">
								<?php the_content(); ?>
							</div>
						</div>
						<?php 
						$i++;
					endforeach;
					wp_reset_postdata();
				endif; ?>
	
			</div>						
		</div>
	</div>
</div>		    