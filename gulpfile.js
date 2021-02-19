var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');

sass.compiler = require('node-sass');

var paths = {
    sass: {
        source: './src/scss/main.scss',
        destination: './public/css',
        filename: 'style.css'
    }
};

gulp.task('sass', () => {
    return gulp.src(paths.sass.source)
    .pipe(rename(paths.sass.filename))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
    }))
    .pipe(gulp.dest(paths.sass.destination));
});