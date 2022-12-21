<?php
//
// Enable Fixed Navbar
// --------------------------------------------------
define( 'POWEHI_ENABLE_FIXED_NAVBAR', TRUE );


//
// Enable Page Transitions
// --------------------------------------------------
define( 'POWEHI_ENABLE_PAGE_TRANSITIONS', FALSE );


//
// Brand Palette
// --------------------------------------------------

// List for ACF color picker settings
#0d6efd
#10caf0
#6d757d
#212529
#f8f9fa
#ffffff


$theme_palette = array();

// Blue
$theme_palette['#0d6efd']['name'] 				= 'blue';
$theme_palette['#0d6efd']['hex'] 					= '#0d6efd';
$theme_palette['#0d6efd']['bs_class'] 		= 'primary';
$theme_palette['#0d6efd']['btn_class'] 		= 'btn-light';
$theme_palette['#0d6efd']['level'] 				= 'dark';
$theme_palette['#0d6efd']['text_color'] 	= '#ffffff';

// Gray
$theme_palette['#6d757d']['name'] 				= 'gray';
$theme_palette['#6d757d']['hex'] 					= '#6d757d';
$theme_palette['#6d757d']['bs_class'] 		= 'secondary';
$theme_palette['#6d757d']['btn_class'] 		= 'btn-light';
$theme_palette['#6d757d']['level'] 				= 'dark';
$theme_palette['#6d757d']['text_color'] 	= '#ffffff';

// Green
$theme_palette['#198754']['name'] 				= 'green';
$theme_palette['#198754']['hex'] 					= '#198754';
$theme_palette['#198754']['bs_class'] 		= 'success';
$theme_palette['#198754']['btn_class'] 		= 'btn-light';
$theme_palette['#198754']['level'] 				= 'dark';
$theme_palette['#198754']['text_color'] 	= '#ffffff';

// Cyan
$theme_palette['#10caf0']['name'] 				= 'cyan';
$theme_palette['#10caf0']['hex'] 					= '#10caf0';
$theme_palette['#10caf0']['bs_class'] 		= 'success';
$theme_palette['#10caf0']['btn_class'] 		= 'btn-light';
$theme_palette['#10caf0']['level'] 				= 'dark';
$theme_palette['#10caf0']['text_color'] 	= '#ffffff';

// Light Gray
$theme_palette['#f8f9fa']['name'] 				= 'gray-light';
$theme_palette['#f8f9fa']['hex'] 					= '#f8f9fa';
$theme_palette['#f8f9fa']['bs_class'] 		= 'light';
$theme_palette['#f8f9fa']['btn_class'] 		= 'btn-primary';
$theme_palette['#f8f9fa']['level'] 				= 'light';
$theme_palette['#f8f9fa']['text_color'] 	= '#000000';

// Black
$theme_palette['#212529']['name'] 				= 'black';
$theme_palette['#212529']['hex'] 					= '#212529';
$theme_palette['#212529']['bs_class'] 		= 'dark';
$theme_palette['#212529']['btn_class'] 		= 'btn-light';
$theme_palette['#212529']['level'] 				= 'dark';
$theme_palette['#212529']['text_color'] 	= '#ffffff';

// White
$theme_palette['#ffffff']['name'] 				= 'white';
$theme_palette['#ffffff']['hex'] 					= '#ffffff';
$theme_palette['#ffffff']['bs_class'] 		= 'light';
$theme_palette['#ffffff']['btn_class'] 		= 'btn-primary';
$theme_palette['#ffffff']['level'] 				= 'light';
$theme_palette['#ffffff']['text_color'] 	= '#000000';

define( 'POWEHI_THEME_PALETTE', $theme_palette );