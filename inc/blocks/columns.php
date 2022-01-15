<div id="<?php echo $block_id;?>" class="block columns <?php echo ($is_preview) ? 'is-preview' : ''; ?>" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?>">

	<div class="container">							
		<?php if ( get_sub_field( 'heading' )): ?>
			<div class="row">
				<div class="col-12">
					<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
				</div>
			</div>
		<?php endif; ?>
	
		<?php 
		if ( get_sub_field( 'columns' )) {?>
			<div class="row"><?php
			$items = get_sub_field( 'columns' );
			$count = count(get_sub_field( 'columns' ));
			if ( $count == 4 ):
				$md_columns = 3;
			elseif ( $count == 3 ):
				$md_columns = 4;
			else:
				$md_columns = 6;
			endif;
			
				foreach ( $items AS $item ) {?>
					
					<div class="col-12 col-md-<?php echo $md_columns; ?> col-column">
						<div class="column">
							<?php $link = $item['link'];
							if ( $link ): ?>
								<a href="<?php echo $link['url'];?>" target="<?php echo $link['target']; ?>">
								<?php
							endif;?>
								<?php if ( $item['image'] ): ?>
									<div class="image">
										<img src="<?php $image =  $item['image']; echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
									</div>
								<?php
									endif;
								?>
								
								<div class="text">
									<h3><?php echo $item['heading']; ?></h3>
									<?php echo apply_filters( 'the_content', $item['text']); ?>							
								</div>
								<?php
							if ( $link ): ?>
								</a>
								<?php
							endif;
							?>
						</div>
					</div>
					
					<?php
				}?>
			</div><?php
		}
		?>
	</div>
		
</div>