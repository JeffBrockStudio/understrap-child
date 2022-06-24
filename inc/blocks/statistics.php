<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

	<div class="container">
		<div class="row">
			
			<?php 
			if ( get_sub_field( 'statistics' )) {
				$items = get_sub_field( 'statistics' );
				foreach ( $items AS $item ) {?>
					<div class="col-12 col-md-4">
						<div class="statistic">
							<h4><?php echo $item['heading'];?></h4>								
							<div class="number">
								<h4><?php echo $item['statistic'];?></h4>
							</div>
							<div class="text">
								<?php echo $item['text'];?>
							</div>
						</div>
					</div>
					<?php
				}
			}
			?>
			
		</div>
	</div>
	
</div>