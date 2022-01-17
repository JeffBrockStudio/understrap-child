<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

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
			
				foreach ( $items AS $item ):?>
					
					<div class="col-12 col-md-<?php echo $md_columns; ?> col-column">
						<div class="column">						
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
								<?php
								if ( $item['link'] ): ?>
									<a class="btn btn-primary" href="<?php $link = $item['link']; echo $link['url'];?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></a>
									<?php
								endif;?>
										
							</div>
						</div>
					</div>
					
					<?php
				endforeach;?>
			</div><?php
		}
		?>
		
		<?php if ( get_sub_field( 'button' )): ?>
			<div class="row">
				<div class="col-12">
					<div class="buttons">
						<a class="btn btn-outline-primary" href="<?php $link = get_sub_field( 'button' ); echo $link['url'];?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></a>
					</div>
				</div>
			</div>
		<?php endif; ?>	
		
		
	</div>
		
</div>