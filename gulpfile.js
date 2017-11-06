'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var less = require('gulp-less');
// var browserSync = require('browser-sync').create();
// var jshint = require('gulp-jshint');

// gulp.task('lint', function() {
//   return gulp.src('./src/scripts/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
// });

gulp.task('less', function(){
  return gulp.src('./src/styles/*.less')
  .pipe(less())
  .pipe(gulp.dest('./src/styles'))
  // .pipe(browserSync.stream())
})

// gulp.task('serve', ['less'], function(){
//   browserSync.init({
//     server: './'
//   });

//   gulp.watch('styles/*.less', ['less']);
//   gulp.watch('*.html').on('change', browserSync.reload);

// })

//will clean the dist directory
gulp.task('clean', function(){
  return gulp.src('./dist/**/*', {read: false})
  .pipe(clean());
});

//will copy all html files
gulp.task('views', function(){
  gulp.src('./src/*.html')
  .pipe(gulp.dest('./dist/'));
});

//will copy all js files
gulp.task('scripts', function(){
  gulp.src('./src/scripts/*.js')
  .pipe(gulp.dest('./dist/scripts'));
});

//will copy all css files
gulp.task('styles', function(){
  gulp.src('./src/styles/*.css')
  .pipe(gulp.dest('./dist/styles'));
});

//will copy all images
gulp.task('images', function(){
  gulp.src('./src/images/*.png')
  .pipe(gulp.dest('./dist/images'));
});

//will run the build proces
gulp.task('build', ['clean', 'views', 'scripts', 'styles', 'images']);

//the default action
gulp.task('default', ['build']);