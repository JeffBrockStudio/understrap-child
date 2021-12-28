<div id="<?php echo $block_id;?>" class="block carousel-block" style="<?php if ( get_sub_field( 'padding_top' ) ): echo 'padding-top: ' . get_sub_field( 'padding_top' ). 'rem; '; endif; ?><?php if ( get_sub_field( 'padding_bottom' ) ): echo 'padding-bottom: ' . get_sub_field( 'padding_bottom' ). 'rem;'; endif; ?><?php if ( get_sub_field( 'background_color' ) ): echo ' background-color: ' . get_sub_field( 'background_color' ). '; '; endif; ?>">

	<div id="carousel" class="carousel slide" data-ride="carousel">
		<div class="carousel-inner">				
			<?php 
			if ( get_sub_field( 'slides' )) {
				$items = get_sub_field( 'slides' );
				$i = 1;
				foreach ( $items AS $item ) {
				?>
					<div class="carousel-item<?php if ( $i == 1 ) { echo ' active'; }; ?>" data-interval="7500">
						<div class="container">
							<div class="row">
								
								<div class="col-12 col-md-9">
									<div class="text">
										<h3><?php echo $item['heading']; ?></h3>
										<?php echo apply_filters( 'the_content', $item['text']); ?>
									</div>					
								</div>
								
								<div class="col-12 col-md-3">												
									<?php $button = $item['button'];
									if ( $button ): ?>
										<a class="btn btn-secondary" href="<?php $link = $button['link']; echo $button['url'];?>" target="<?php echo $button['target']; ?>"><span><?php echo $button['title']; ?></span></a>
										<?php
									endif;?>
								</div>

							</div>
						</div>
					</div>
					<?php
					$i++;
				}
			}
			?>	  
		</div>
		
		<ol class="carousel-indicators">
			<?php
			$i = 0;
			foreach ( $items AS $item ) {?>
				<li data-target="#carousel" data-slide-to="<?php echo $i; ?>" <?php if ( $i == 0 ) { echo ' class="active"'; }; ?>></li>
			<?php 
				$i++;
			}?>			
		</ol>
		
	</div>

</div>