<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

<?php 
$images = get_sub_field('gallery');
$size = 'large'; // (thumbnail, medium, large, full or custom size)						
if( $images ): ?>
	<div class="gallery-grid">
		<?php foreach( $images as $image ): ?>
			<div class="gallery-item image">
					<a href="<?php echo wp_get_attachment_image_url( $image['ID'], 'full' ); ?>" data-toggle="lightbox" data-gallery="powehi-gallery">
						<?php echo wp_get_attachment_image( $image['ID'], $size ); ?>
					</a>				
			</div>
		<?php endforeach; ?>
	</div>
<?php endif; ?>
					
<script>
jQuery(document).ready(function($) {
	var $rowHeight = 300;
	$(".gallery-grid").justifiedGallery({
		lastRow:			'justify',
		margins:			10,
		//maxRowsCount:	2,
		rel:					'gallery',
		rowHeight: 		$rowHeight,
		maxRowHeight:	2 * $rowHeight,
	});
});
</script>					
					
</div>