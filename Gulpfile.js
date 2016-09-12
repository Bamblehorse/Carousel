"use strict";

// Required packages
var gulp = require('gulp');
var notify = require('gulp-notify');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var del = require('del');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

//Default Gulp Task
gulp.task('default', ['watch']);

// Loads local server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});

// Sass Variables
var sassFolder = 'src/scss/**/*.scss';
var cssFolder = 'src/dist/css';
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

// Clean CSS folders ready for compiling SASS
gulp.task('clean', function () {
    return del([
      'src/css/**/*'
      ]);
});

// Watch folders and files for changes
gulp.task('watch', ['browserSync', 'sass'], function() {
  // Watch Sass
  gulp.watch(['src/scss/**/*.scss', 'node_modules/inuit/**/*.scss'], ['clean','sass']);
  // Watch html
  gulp.watch('src/**/*.html', ['refresh']);
  //watch js
  gulp.watch('app/js/**/*.js', ['refresh']);
});
