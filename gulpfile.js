const {src, dest, parallel, series, watch } = require('gulp'); //connection to gulp
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const sass         = require('sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss     = require('gulp-clean-css');
const express      = require('express');
const  fs          = require('fs');
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
function styles(){
return src('app/sass/main.scss')
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({overrideBrowserslist:['last 10 versions']}))
    .pipe(cleancss(({level:{1:{specialComments:0}},format:'beautify'})))
    .pipe(dest('app/css/'))
}
function buildcopy(){ //build function
    return src(['app/js/**/*.min.js',
    'app/**/*.html'
    ])
        .pipe(dest('dist'))
}

function start_watch(){ //function for watching & reloading
    watch(['app/**/*.js','!app/**/*.min.js'],scripts) //to prevent recursion
    watch('app/**/*.html').on('change', browserSync.reload)
    watch('app/sass/main.scss').on('change',browserSync.reload)
}
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function (req, res) {
    res.sendFile(__dirname+ '/app/index.html');
})
app.get('/getChartData', (req, res)=>{
fs.readFile('data.json','utf-8',(err,data)=>{
    console.log(data);
    res.send(data);
})
})
app.listen(3000)
console.log('Run')

exports.browser_sync = browser_sync;
exports.scripts = scripts;
exports.styles = styles;

exports.build = series(scripts, buildcopy);
exports.default = parallel(scripts, browser_sync, start_watch );