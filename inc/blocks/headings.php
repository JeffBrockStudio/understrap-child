<div class="row">
	<div class="col-12">		
		
		<div class="headings">
			<?php if ( get_sub_field( 'superheading' )): ?>
				<div role="doc-subtitle" class="superheading"><?php the_sub_field( 'superheading' );?></div>
			<?php endif; ?>
			
			<<?php the_sub_field( 'heading_level' );?> class="heading" style="color: <?php echo $text_color; ?>"><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
			
			<?php if ( get_sub_field( 'subheading' )): ?>
				<div role="doc-subtitle" class="subheading"><?php the_sub_field( 'subheading' );?></div>
			<?php endif; ?>
		</div>
	
	</div>
</div>