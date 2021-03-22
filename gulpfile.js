const {src, dest, parallel, series, watch } = require('gulp'); //connection to gulp
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const sass         = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');

function browser_sync(){ //function for connection to gulp
    browserSync.init({
        server:{baseDir:'app/'},
        notify: false,
    })
}

function  scripts(){
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'app/js/app.js'
        ]
    )
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js/'))
        .pipe(browserSync.stream())
}

function buildcopy(){ //build function
    return src(['app/js/**/*.min.js',
    'app/**/*.html'
    ])
        .pipe(dest('dist'))
}

function start_watch(){ //function for watching & reloading
    watch(['app/**/*.js','!app/**/*.min.js'],scripts) //to prevent recursion
    watch('/**/*.html').on('change', browserSync.reload)
    watch('/**/*/*.main.css').on('change',browserSync.reload)
}

exports.browser_sync = browser_sync;
exports.scripts = scripts;


exports.build = series(scripts, buildcopy);
exports.default = parallel(scripts, browser_sync, start_watch );