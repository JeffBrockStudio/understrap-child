'use strict'

const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
import commonjs from '@rollup/plugin-commonjs'
import multi from '@rollup/plugin-multi-entry'
const replace = require('@rollup/plugin-replace')
const banner = require('./banner.js')

let fileDest = 'child-theme.js'
const external = ['jquery']
const plugins = [
  babel({
    // Only transpile our source code
    exclude: 'node_modules/**',
    // Include the helpers in the bundle, at most one copy of each
    babelHelpers: 'bundled'
  }),
  replace({
      'process.env.NODE_ENV': '"production"',
      preventAssignment: true
  }),
  nodeResolve(),
  commonjs(),
  multi()
]
const globals = {
  jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
}


module.exports = {
  input: [
    path.resolve(__dirname, '../js/bootstrap.js'), 
    path.resolve(__dirname, '../js/skip-link-focus-fix.js'), 
    path.resolve(__dirname, '../js/bootstrap-select.min.js'),     // Bootstrap Select
    path.resolve(__dirname, '../js/jquery.gridder.min.js'),       // Gridder
    path.resolve(__dirname, '../js/imagesloaded.pkgd.min.js'),    // Imagesloaded
    path.resolve(__dirname, '../js/lazysizes.min.js'),            // Lazysizes
    path.resolve(__dirname, '../js/jquery.matchHeight-min.js'),   // MatchHeight
    path.resolve(__dirname, '../js/modernizer-custom.js'),        // Modernizr
    path.resolve(__dirname, '../js/parallax.min.js'),             // Parallax
    path.resolve(__dirname, '../js/slick.min.js'),                // Slick Carousel
    path.resolve(__dirname, '../js/smooth-scroll.min.js'),        // Smooth Scroll    
    path.resolve(__dirname, '../js/jquery.sticky.js'),            // Sticky
    path.resolve(__dirname, '../js/jquery.touchSwipe.min.js')     // Touchswipe
  ],
  output: {
    banner,
    file: path.resolve(__dirname, `../../js/${fileDest}`),
    format: 'umd',
    globals,
    name: 'understrap'
  },
  external,
  plugins
}