'use strict';

/**
 * External dependencies
 */
const path = require( 'path' );
const { babel } = require( '@rollup/plugin-babel' );
const { nodeResolve } = require( '@rollup/plugin-node-resolve' );
const commonjs = require( '@rollup/plugin-commonjs' );
const multi = require( '@rollup/plugin-multi-entry' );
const replace = require( '@rollup/plugin-replace' );

/**
 * Internal dependencies
 */
const banner = require( './banner.js' );

// Populate Bootstrap version specific variables.
let bsVersion = 5;
let bsSrcFile = 'bootstrap.js';
let fileDest = 'child-theme';
let globals = {
	jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
	'@popperjs/core': 'Popper',
};

const external = [ 'jquery' ];

const plugins = [
	babel( {
		browserslistEnv: `bs${ bsVersion }`,
		// Include the helpers in the bundle, at most one copy of each.
		babelHelpers: 'bundled',
	} ),
	replace( {
		'process.env.NODE_ENV': '"production"',
		preventAssignment: true,
	} ),
	nodeResolve(),
	commonjs(),
	multi(),
];

module.exports = {
	input: [
    path.resolve( __dirname, `../js/${ bsSrcFile }` ),
    path.resolve( __dirname, '../js/skip-link-focus-fix.js' ),
		path.resolve( __dirname, '../js/custom-javascript.js' ),
    path.resolve( __dirname, '../js/jquery.gridder.min.js' ),       // Gridder
    path.resolve( __dirname, '../js/imagesloaded.pkgd.min.js' ),    // Imagesloaded
    path.resolve( __dirname, '../js/lazysizes.min.js' ),            // Lazysizes
    path.resolve( __dirname, '../js/jquery.matchHeight-min.js' ),   // MatchHeight
    path.resolve( __dirname, '../js/modernizer-custom.js' ),        // Modernizr
    path.resolve( __dirname, '../js/parallax.min.js' ),             // Parallax
    path.resolve( __dirname, '../js/jquery.prettydropdowns.js' ),   // Pretty Dropdowns
    path.resolve( __dirname, '../js/slick.min.js' ),                // Slick Carousel
    path.resolve( __dirname, '../js/smooth-scroll.min.js' ),        // Smooth Scroll    
    path.resolve( __dirname, '../js/jquery.sticky.js' ),            // Sticky
    path.resolve( __dirname, '../js/jquery.touchSwipe.min.js' ),    // Touchswipe
  ],
	output: [
		{
			banner: banner(''),
			file: path.resolve( __dirname, `../../js/${ fileDest }.js` ),
			format: 'umd',
			globals,
			name: 'understrap',
		},
		{
			banner: banner(''),
			file: path.resolve( __dirname, `../../js/${ fileDest }.min.js` ),
			format: 'umd',
			globals,
			name: 'understrap',
		},
	],
	external,
	plugins,
};
