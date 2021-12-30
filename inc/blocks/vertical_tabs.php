<div id="<?php echo $block_id; ?>" class="block vertical-tabs" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?><?php if ( get_sub_field( 'background_color' ) ): echo ' background-color: ' . get_sub_field( 'background_color' ). '; '; endif; ?>">
	<div class="container">
		<div class="row">		
			
			<div class="col-12">
				<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
			</div>
			
		</div>
		
		<div class="row">
			
			<div class="col-12 col-md-6">
				<div class="nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
					
					<?php 
					if ( get_sub_field( 'tabs' )):
						$items = get_sub_field( 'tabs' );
						$i = 1;
						foreach ( $items AS $item ) {?>
							<a class="nav-link<?php if ( $i == 1 ) echo ' active'; ?>" id="vertical-tabs-<?php echo $block_id; ?> v-pills-<?php echo $i ?>-tab" data-toggle="pill" href="#<?php echo $block_id; ?> #v-pills-<?php echo $i ?>" role="tab" aria-controls="<?php echo $block_id; ?> v-pills-<?php echo $i ?>" aria-selected="<?php if ( $i == 1 ) { echo 'true'; } else { echo 'false'; }?>">
								<h3><?php echo $item['heading'];?></h3>
							</a>
							<?php
							$i++;
						}
					endif;
					?>
					
				</div>	
				
				<?php $button = get_sub_field( 'button' );
				if ( $button ): ?>
					<div class="buttons">
						<a class="btn btn-secondary" href="<?php $link = $button['link']; echo $button['url'];?>" target="<?php echo $button['target']; ?>"><span><?php echo $button['title']; ?></span></a>
					</div>
					<?php
				endif;?>
				
			</div>
			
			<div class="col-12 col-md-6">
				<div class="tab-content" id="v-pills-tabContent">
					<?php $i = 1;
					foreach ( $items AS $item ) {?>				
						<div class="tab-pane fade<?php if ( $i == 1 ) echo ' show active'; ?>" id="v-pills-<?php echo $i ?>" role="tabpanel" aria-labelledby="vertical-tabs-<?php echo $block_id; ?> v-pills-<?php echo $i ?>-tab">
							<?php if ( $item['image'] ): ?>
								<div class="image">
									<img src="<?php $image = $item['image']; echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" height="<?php echo $image['height'] ?>" width="<?php echo $image['width'] ?>" />
								</div>					
							<?php endif; ?>
							<?php if ( $item['text'] ): ?>
								<div class="text">
									<?php echo apply_filters( 'the_content', $item['text'] ); ?>
								</div>
							<?php endif; ?>														
						</div>
						<?php
						$i++;
					} ?>
				</div>
			</div>
			
		</div>
	</div>
</div>