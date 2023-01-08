<?php 
$flourish = get_sub_field( 'flourish' );
$flourish_option = '';
if ( $flourish != '' ):
	$flourish_option = $flourish; ?>
	<style>
		#<?php echo $block_id;?> .heading.flourish::after {
			background-image: url( '<?php echo get_stylesheet_directory_uri();?>/img/flourishes/<?php echo $flourish_option; ?>' );
		}
	</style>
	<?php
endif; ?>

</style>
<div class="row">
	<?php 
	if ( $columns == '' ):
		$columns = 'col-12';
	endif; ?>
	
	<div class="<?php echo $columns; ?>">		
		
		<div class="headings">
			<?php if ( get_sub_field( 'superheading' )): ?>
				<div role="doc-subtitle" class="superheading" style="color: <?php echo $text_color; ?>"><?php the_sub_field( 'superheading' );?></div>
			<?php endif; ?>
			
			<<?php the_sub_field( 'heading_level' );?> class="heading<?php // if ( $flourish != '' ) echo ' flourish '; ?>" style="color: <?php echo $text_color; ?>"><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
			
			<?php $flourish = get_sub_field( 'flourish' );
			if ( $flourish != '' ):?>
				<div class="flourish">
					<?php
					$flourish_url = get_stylesheet_directory_uri() . '/img/flourishes/' . $flourish_option;
					//$size = getimagesize( $flourish_url );
					
					// $raw = getImg($flourish_url);
					// $im = imagecreatefromstring($raw);
					// $width = imagesx($im);
					// $height = imagesy($im);
					// echo $width." x ".$height;					
					?>
					<img src="<?php echo $flourish_url?>" alt="">
				</div>
				<?php
			endif;?>
			
			<?php if ( get_sub_field( 'subheading' )): ?>
				<div role="doc-subtitle" class="subheading" style="color: <?php echo $text_color; ?>"><?php the_sub_field( 'subheading' );?></div>
			<?php endif; ?>
		</div>
	
	</div>
</div>