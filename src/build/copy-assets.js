const { promises: fs } = require("fs")
const path = require("path")

async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    let entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ?
            await copyDir(srcPath, destPath) :
            await fs.copyFile(srcPath, destPath);
    }
}

// Copy all Bootstrap SCSS files.
copyDir('./node_modules/bootstrap/scss', './src/sass/assets/bootstrap5');
// Copy all Font Awesome SCSS files.
copyDir('./node_modules/font-awesome/scss', './src/sass/assets/fontawesome');
// Copy all Understrap SCSS files.
copyDir('./node_modules/understrap/src/sass/theme', './src/sass/assets/understrap/theme');


// Copy custom JS & SCSS files.
fs.copyFile('./node_modules/bootstrap-select/dist/js/bootstrap-select.min.js', './src/js/bootstrap-select.min.js');
copyDir('./node_modules/@fortawesome/fontawesome-pro/scss', './src/sass/assets/fontawesome-pro');
copyDir('./node_modules/bootstrap-select/sass', './src/sass/assets/bootstrap-select');
copyDir('./node_modules/@fortawesome/fontawesome-pro/webfonts', './fonts');
fs.copyFile('./node_modules/imagesloaded/imagesloaded.pkgd.min.js', './src/js/imagesloaded.pkgd.min.js');
fs.copyFile('./node_modules/lazysizes/lazysizes.min.js', './src/js/lazysizes.min.js');
fs.copyFile('./node_modules/jquery-match-height/dist/jquery.matchHeight-min.js', './src/js/jquery.matchHeight-min.js');
fs.copyFile('./node_modules/jquery-parallax.js/parallax.min.js', './src/js/parallax.min.js');
fs.copyFile('./node_modules/slick-carousel/slick/slick.min.js', './src/js/slick.min.js');
copyDir('./node_modules/slick-carousel/slick', './src/sass/assets/slick/theme');
fs.copyFile('./node_modules/smooth-scroll/dist/smooth-scroll.min.js', './src/js/smooth-scroll.min.js');
fs.copyFile('./node_modules/jquery-sticky/jquery.sticky.js', './src/js/jquery.sticky.js');
fs.copyFile('./node_modules/jquery-touchswipe/jquery.touchSwipe.min.js', './src/js/jquery.touchSwipe.min.js');

// Generate custom Modernizr build, including only the mediaquery detect
var modernizr = require("modernizr");
modernizr.build({
    "options": [ 
        "mq"
    ]
}, function (result) {
    fs.writeFile('./src/js/modernizer-custom.js', result ); 
});

// Download Gridder from GitHub
const fs2 = require('fs');
const https = require('https');
const url = 'https://raw.githubusercontent.com/oriongunning/gridder/master/dist/js/jquery.gridder.min.js';
  
https.get(url,(res) => {
    const path = './src/js/jquery.gridder.min.js'; 
    const filePath = fs2.createWriteStream(path);
    res.pipe(filePath);
    filePath.on('finish',() => {
        filePath.close();
        console.log('Download Completed'); 
    })
})
