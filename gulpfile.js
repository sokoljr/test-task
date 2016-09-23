var gulp = require('gulp');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minify = require('gulp-cssmin');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

gulp.task('minify', function() {
    gulp.src('src/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('prod/css'))
        .pipe(notify('Minify css is completed'));
});

gulp.task('uglify', function() {
    gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('prod/js'))
        .pipe(notify('Minify js is completed'));
});

gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['uglify']);
    gulp.watch('src/sass/*.sass', ['minify']);
});