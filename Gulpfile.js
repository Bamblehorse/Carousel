"use strict";

// Required packages
var gulp = require('gulp'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    gulpIf = require('gulp-if'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();

//Default Gulp Task
gulp.task('default', function(callback) {
  runSequence('images', 'watch','browserSync','useref',callback);
});
// Loads local server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
});

// Sass Variables
var sassFolder = 'src/scss/**/*.scss';
var cssFolder = 'src/css/';
var sassStyle = {
  outputStyle: 'expanded'
};

//Error handler for Plumber
var onError = function (error) {
  console.log("-- Plumber caught Error, Server still running --")
  console.log(error.message);
  console.log("-- Correct code and server will reset automatically --")
  this.emit('end');
};
// Compile Sass to Css
gulp.task('sass', function() {
  return gulp
    .src(sassFolder)
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass(sassStyle))
    .pipe(gulp.dest(cssFolder))
    .pipe(notify({message: 'Compiled SASS to CSS'}))
});

gulp.task('refresh', function() {
  return gulp
    .src('dist')
    .pipe(plumber({errorHandler: onError}))
    .pipe(browserSync.reload({stream: true}))
    .pipe(notify({message: 'Changes Detected, Server Reloaded'}))
  });

gulp.task('cleanCSS', function() {
  del(['src/css/**/*']);
});

gulp.task('cleanJs', function() {
  del(['dist/js/**/*']);
});

gulp.task('cleanHtml', function() {
  del(['dist/**/*.html']);
});

gulp.task('images', function() {
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'))
});

gulp.task('useref', function() {
  return gulp.src('src/*.html')
    .pipe(plumber({errorHandler: onError}))
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('sassWatch', function(callback) {
  runSequence('cleanCSS','sass','useref', 'refresh', callback);
});

gulp.task('htmlWatch', function(callback) {
  runSequence('cleanHtml','useref', 'refresh', callback);
});

gulp.task('jsWatch', function(callback) {
  runSequence('cleanJs','useref', 'refresh', callback);
});
// Watch folders and files for changes
gulp.task('watch', function() {
  // Watch Sass
  gulp.watch(['src/scss/**/*.scss'],['sassWatch']);
  // Watch html
  gulp.watch('src/**/*.html', ['htmlWatch']);
  //watch js
  gulp.watch('src/js/**/*.js', ['jsWatch']);
});
