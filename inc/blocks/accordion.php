<div id="<?php echo $block_id;?>" class="block accordion <?php echo ($is_preview) ? 'is-preview' : ''; ?>" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?>">

	<div class="container">
		<div class="row">
			<div class="col-12">
				<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
				
				<?php if ( get_sub_field( 'text' )): ?>
					<div class="text intro">
						<?php echo apply_filters( 'the_content', get_sub_field( 'text' )); ?>
					</div>
				<?php endif; ?>	
		
				<?php 
				$items = get_sub_field('items');
				if( $items ): 
					$i = 1;
					foreach( $items as $item): ?>
						<div class="accordion">
							<a class="question collapsed" role="button" data-bs-toggle="collapse" data-bs-target="#<?php echo $block_id; ?> #accordion-<?php echo $i; ?>" id="question-<?php echo $block_id; ?> #accordion-<?php echo $i; ?>">
								<i class="fas fa-plus"></i>
								<i class="fas fa-minus"></i>
								<?php echo $item['heading']; ?>
								<?php if ( $item['subheading'] ): ?>
									<div class="subheading"><?php echo $item['subheading']; ?></div>
								<?php endif; ?>
							</a>
							<div class="answer collapse text" id="accordion-<?php echo $i; ?>" aria-labelledby="#question-<?php echo $block_id; ?> #accordion-<?php echo $i; ?>">
								<?php echo apply_filters( 'the_content', $item['text'] ); ?>
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