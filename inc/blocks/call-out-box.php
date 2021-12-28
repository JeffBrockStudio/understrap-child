<div class="block call-out-box">

	<div class="row">
		<div class="inner">
			<div class="col-12 col-md-7 col-lg-5">
				<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
				<hr />
			</div>

			<div class="col-12 col-md-10">
				
				<div class="text">
					<?php echo apply_filters( 'the_content', the_sub_field( 'text' )); ?>
				</div>
				
				<?php $link = get_sub_field( 'button' );
				if ($link): ?>
					<div class="button">
						<a class="btn btn-secondary" href="<?php echo $link['url'];?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></a>
					</div>
					<?php
				endif;?>
				
			</div>														
		</div>
	</div>

</div>