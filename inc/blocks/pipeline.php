<?php include( get_stylesheet_directory() . '/inc/blocks/block-settings.php' ); ?>

<?php
$band_heading = get_sub_field( 'band_heading' );
$discovery_programs_heading = get_sub_field( 'discovery_programs_heading' );
$discovery_programs = get_sub_field( 'discovery_programs' );
$footnote_text = get_sub_field( 'footnote_text' );
?>

<div class="container">

	<div class="row">
		<div class="col-12">
			<<?php the_sub_field( 'heading_level' );?>><?php the_sub_field( 'heading' );?></<?php the_sub_field( 'heading_level' );?>>
		</div>
	</div>
	
	<div class="row">
		<div class="col-12">
				
			<div class="table pipeline-table">
				
					<div class="table-heading">
						
						<?php if( have_rows('pipeline_headings') ): ?>
							<div class="main-heading">
								<?php
								$counter = 0;
								while ( have_rows( 'pipeline_headings' ) ): the_row();
									$heading = get_sub_field( 'heading' );
									$counter++;
									?>
									<div class="col<?php echo $counter; ?>"><?php echo $heading; ?></div>
								<?php endwhile; ?>
							</div>
						<?php endif; ?>
						
						<?php if( have_rows('pipeline_subheadings') ):
							$sub_headings = array(); ?>
							<div class="sub-heading">
								<?php
								$counter = 0;
								while ( have_rows( 'pipeline_subheadings' ) ): the_row();
									$sub_heading = get_sub_field( 'sub_heading' );
									$sub_headings[] = $sub_heading;
									$counter++;
									?>
									<div class="col<?php echo $counter; ?>"><?php echo $sub_heading; ?></div>
								<?php endwhile; ?>
							</div>
						<?php endif; ?>
					</div>
					
					<?php if( have_rows('programs') ): ?>
						<div class="table-body" id="accordion">
							<?php
							$counter = 0;
							while ( have_rows( 'programs' ) ): the_row();
								$program_name = get_sub_field( 'program_name' );
								$program_code = get_sub_field( 'program_code' );
								$program_modality = get_sub_field( 'program_modality' );
								$program_description = get_sub_field( 'program_description' );
								$program_button = get_sub_field( 'program_button' );
			
								$counter++;
								?>
								<div class="card">
									<div class="card-header" id="heading-<?php echo $counter; ?>">
										<a 
											data-bs-toggle="collapse"
											data-bs-target="#<?php echo $block_id; ?> #collapse-<?php echo $counter; ?>" 
											aria-expanded="true" 
											aria-controls="collapse-<?php echo $counter; ?>" 
											role="button"
											class="collapsed" >
											
												<?php 
												if( have_rows('program_indication_with_stage') ):		
													while ( have_rows( 'program_indication_with_stage' ) ): the_row();		
														$indication = get_sub_field( 'indication' );
														$progress = get_sub_field( 'progress' );
														$pipeline_text = get_sub_field( 'pipeline_text' );
														$in_progress = get_sub_field( 'in_progress' );
														?>
														<div class="card-row">
															<div class="col1">
																<div class="program-name"><?php echo $program_name; ?></div>
																<?php if( $program_code ) { ?>
																	<div class="program-code"><?php echo $program_code; ?></div>
																<?php } ?>
																<?php if( $program_modality ) { ?>
																	<div class="program-modality"><?php echo $program_modality; ?></div>
																<?php } ?>
																<?php if( $indication ) { ?>
																	<div class="indication">
																		<?php echo $indication; ?>
																	</div>
																<?php } ?>
															</div>
															
															<div class="col2">
																<div class="row-out">
																	<div class="lrg-col">
																		
																		<?php 
																		$i = 0; 
																		foreach( $sub_headings AS $sub_heading ):
																			if ( $i > 0 ):?>
																				<div class="sub-col<?php echo $i ?>"><?php // echo $sub_heading; ?></div>
																				<?php
																			endif;
																			$i++;
																		endforeach;	?>
																		<?php if( $progress || $pipeline_text ) { ?>
																			<div class="track-bar" style="width: calc( <?php echo $progress; ?>% - 1px);">
																				<?php if( $in_progress ) { ?>
																					<span class="bar-gray">
																				<?php } ?>
																				<?php echo $pipeline_text; ?>
																				<?php if( $in_progress ) { ?>
																					</span>
																				<?php } ?>
																				<div class="arrowhead"></div>
																			</div>
																		<?php } ?>
																	</div>
																</div>
															</div>
														</div>
														
													<?php endwhile; ?>
												<?php endif; ?>											
											
										</a>
									</div>
									<?php if( $program_description ) { ?>
										<div class="card-body-wrapper collapse" id="collapse-<?php echo $counter; ?>" aria-labelledby="heading-<?php echo $counter; ?>" data-parent="#accordion">
											<div class="card-body">
												<div class="text"> 
													<h2><?php echo $program_name; ?></h2>
													<?php echo $program_description; ?> 
												</div>
												<?php if ( $program_button ): ?>
													<div class="buttons">
														<a class="btn btn-light" href="<?php $link = $program_button; echo $link['url'];?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></a>
													</div>
												<?php endif; ?>
											</div>
										</div>
									<?php } ?>
								</div>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
					
					<?php if( $discovery_programs ) { ?>
						<div class="bottom-cont">
							<?php if($discovery_programs_heading) { ?>
							<div class="title-bar"><?php echo $discovery_programs_heading; ?></div>
							<?php } ?>
							<?php if( have_rows('discovery_programs') ): ?>
							<?php
							$counter = 0;
							while ( have_rows( 'discovery_programs' ) ): the_row();
		
							$discovery_program_name = get_sub_field( 'discovery_program_name' );
							$discovery_program_description = get_sub_field( 'discovery_program_description' );
		
							?>
							<div class="aside-out">
								<?php if($discovery_program_name) { ?>
								<div class="left-col"><?php echo $discovery_program_name; ?></div>
								<?php } ?>
								<div class="right-col"> <?php echo $discovery_program_description; ?> </div>
							</div>
							<?php endwhile; ?>
							<?php endif; ?>
						</div>
					<?php } ?>
					
				
			</div>
			<?php if( $footnote_text ) { ?>
				<div class="footnote">
					<?php echo apply_filters( 'the_content', $footnote_text ); ?>
				</div>
			<?php } ?>
			
		</div>
	</div>

</div>

</div>
