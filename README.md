# [CLIENT]
Custom WordPress theme for [CLIENT].

## How it works
The [CLIENT] theme shares with the parent theme all PHP files and adds its own functions.php on top of the UnderStrap parent theme's functions.php, as well as other custom templates.

**IT DOES NOT LOAD THE PARENT THEME'S CSS FILE(S)!** Instead it uses the UnderStrap Parent Theme as a dependency via npm and compiles its own CSS file from it.

The [CLIENT] theme uses the Enqueue method to load and sort the CSS file the right way instead of the old @import method.

## Installation
1. Install the parent theme UnderStrap first: `https://github.com/understrap/understrap`
   - IMPORTANT: If you download UnderStrap from GitHub make sure you rename the "understrap-master.zip" file to "understrap.zip" or you might have problems using this child theme!
1. Upload the [GITHUB_NAME] folder to your wp-content/themes directory
1. Go into your WP admin backend 
1. Go to "Appearance -> Themes"
1. Activate the [GITHUB_NAME] theme

## Editing
Add your own CSS styles to `/sass/theme/_child_theme.scss`

To overwrite Bootstrap's or UnderStrap's base variables just add your own value to:
`/sass/theme/_child_theme_variables.scss`

For example, the "$brand-primary" variable is used by both Bootstrap and UnderStrap.

Add your own color like: `$brand-primary: #ff6600;` in `/sass/theme/_child_theme_variables.scss` to overwrite it. This change will automatically apply to all elements that use the $brand-primary variable.

It will be outputted into:
`/css/child-theme.min.css` and `/css/child-theme.css`

So you have one clean CSS file at the end and just one request.

## Developing With NPM, Gulp and SASS

### Installing Dependencies
- Make sure you have installed Node.js and Gulp on your computer globally
- Open your terminal and browse to the location of the [CLIENT] theme
- Run: `$ npm install`
- Run: `$ gulp scripts`
- Run: `$ gulp styles`

### Running
To work and compile your Sass files on the fly start:

- `$ gulp watch`

## Advanced Custom Fields changes
If you add, edit or delete any Advanced Custom Fields through the WordPress admin, the field definitions will automatically update at `/acf-json/`. You'll need to download any updated files from this folder and commit to the repo.