var gulp = require('gulp');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minify = require('gulp-cssmin');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

gulp.task('minify', function() {
    gulp.src('sass/main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('css'))
        .pipe(notify('Minify css is completed'));
});

gulp.task('uglify', function() {
    gulp.src('js/src/*.js')
        .pipe(plumber())
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/prod'))
        .pipe(notify('Minify js is completed'));
});

gulp.task('watch', function() {
    gulp.watch('js/src/*.js', ['uglify']);
    gulp.watch('sass/*.sass', ['minify']);
});