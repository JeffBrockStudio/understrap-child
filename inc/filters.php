<?php
/**
 * Wrap video embeds in responsive div.
 */
function custom_video_wrapper($content) {
  // match any iframes
  $pattern = '~<iframe.*</iframe>|<embed.*</embed>~';
  preg_match_all($pattern, $content, $matches);

  foreach ($matches[0] as $match) {
    // wrap matched iframe with div
    $wrappedframe = '<div class="video-container">' . $match . '</div>';

    //replace original iframe with new in content
    $content = str_replace($match, $wrappedframe, $content);
  }

  return $content;    
}
add_filter('the_content', 'custom_video_wrapper');


/**
 * Change default "from" email address and sender name
 */
function custom_sender_email( $original_email_address ) {
    return get_field( 'email_sender_address', 'options' );
}
function custom_sender_name( $original_email_from ) {
    return get_field( 'email_sender_name', 'options' );
}
add_filter( 'wp_mail_from', 'custom_sender_email' );
add_filter( 'wp_mail_from_name', 'custom_sender_name' );


/**
 * Change class and ID on next posts button.
 */
function custom_posts_link_attributes( $var ) {
    return 'class="btn btn-primary" id="pagination-ajax"';
}
add_filter('next_posts_link_attributes', 'custom_posts_link_attributes');
add_filter('previous_posts_link_attributes', 'custom_posts_link_attributes');


/**
 * Scale up thumbnails if source image is too small
 */
function custom_image_crop_dimensions($default, $orig_w, $orig_h, $new_w, $new_h, $crop){
    if ( !$crop ) return null; // let the wordpress default function handle this

    $aspect_ratio = $orig_w / $orig_h;
    $size_ratio = max($new_w / $orig_w, $new_h / $orig_h);

    $crop_w = round($new_w / $size_ratio);
    $crop_h = round($new_h / $size_ratio);

    $s_x = floor( ($orig_w - $crop_w) / 2 );
    $s_y = floor( ($orig_h - $crop_h) / 2 );

    return array( 0, 0, (int) $s_x, (int) $s_y, (int) $new_w, (int) $new_h, (int) $crop_w, (int) $crop_h );
}
add_filter('image_resize_dimensions', 'custom_image_crop_dimensions', 10, 6);


/**
 * Remove "Read More" button from excerpts.
 */
function custom_all_excerpts_get_more_link( $post_excerpt ) {
	return $post_excerpt;
}
add_filter( 'wp_trim_excerpt', 'custom_all_excerpts_get_more_link' );
	
  
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
if ( ! function_exists( 'understrap_posted_on' ) ) {
  function understrap_posted_on() {
    $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
    if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
      $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time>';
    }
    $time_string = sprintf( $time_string,
      esc_attr( get_the_date( 'c' ) ),
      esc_html( get_the_date() ),
      esc_attr( get_the_modified_date( 'c' ) ),
      esc_html( get_the_modified_date() )
    );
    $posted_on   = apply_filters(
      'understrap_posted_on', sprintf(
        '<span class="posted-on">%1$s %3$s</span>',
        esc_html_x( '', 'post date', 'understrap' ),
        esc_url( get_permalink() ),
        apply_filters( 'understrap_posted_on_time', $time_string )
      )
    );
    $byline      = apply_filters(
      'understrap_posted_by', sprintf(
        '<span class="byline"> %1$s<span class="author vcard"> <a class="url fn n" href="%2$s">%3$s</a></span></span>',
        $posted_on ? esc_html_x( 'by', 'post author', 'understrap' ) : esc_html_x( 'Posted by', 'post author', 'understrap' ),
        esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
        esc_html( get_the_author() )
      )
    );
    echo $posted_on . $byline; // WPCS: XSS OK.
  }
}  


/**
 * Enable Search WP behind password protection.
 */
function custom_searchwp_basic_auth_creds() {
  
  // NOTE: this needs to be your HTTP BASIC AUTH login
  //
  //                 *** NOT *** your WordPress login
  //
  //
  $credentials = array( 
    'username' => '', // the HTTP BASIC AUTH username
    'password' => ''  // the HTTP BASIC AUTH password
  );
  
  return $credentials;
}
//add_filter( 'searchwp_basic_auth_creds', 'my_searchwp_basic_auth_creds' );


/**
 * Formidable Pro offset scroll
 */
add_filter('frm_scroll_offset', 'frm_scroll_offset');
function frm_scroll_offset(){
  return 92; //adjust this as needed
}