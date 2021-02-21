const {src, dest, parallel, series, watch } = require('gulp'); //connection to gulp
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const autoprefixer=require('gulp-autoprefixer')

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

function buildcopy(){
    return src(['app/js/**/*.min.js',
    'app/**/*.html'
    ])
        .pipe(dest('dist'))
}

function start_watch(){
    watch(['app/**/*.js','!app/**/*.min.js'],scripts) //to prevent recursion
}

exports.browser_sync = browser_sync;
exports.scripts = scripts;
exports.build = series(scripts, buildcopy);
exports.default = parallel(scripts, browser_sync, start_watch );