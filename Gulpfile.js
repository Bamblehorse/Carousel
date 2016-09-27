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
    browserSync = require('browser-sync').create();

//Default Gulp Task
gulp.task('default', ['images', 'watch','browserSync', 'sass', 'useref']);

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
    .pipe(browserSync.reload({stream: true}))
    .pipe(notify({message: 'Css Injected, Server Reloaded'}))
});

gulp.task('refresh', function() {
  return gulp
    .src('src')
    .pipe(plumber({errorHandler: onError}))
    .pipe(browserSync.reload({stream: true}))
    .pipe(notify({message: 'Changes Detected, Server Reloaded'}))
  });

gulp.task('cleanCSS', function() {
  del(['src/css/**/*']);
});

gulp.task('images', function(){
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'))
});

gulp.task('useref', function(){
  del(['dist/js/**/*']);
  del(['dist/**/*.html']);
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Watch folders and files for changes
gulp.task('watch', function() {
  // Watch Sass
  gulp.watch(['src/scss/**/*.scss'], ['cleanCSS', 'sass']);
  // Watch html
  gulp.watch('src/**/*.html', ['refresh']);
  //watch js
  gulp.watch('src/js/**/*.js', ['refresh']);
});
