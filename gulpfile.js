'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var gulpSequence = require('gulp-sequence');
var isProduction = process.env.NODE_ENV === 'production'; 
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');

// var browserSync = require('browser-sync').create();
// var jshint = require('gulp-jshint');

// gulp.task('lint', function() {
//   return gulp.src('./src/scripts/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
// });

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

//will check the style of code
gulp.task('lint', function(){
  gulp.src('./src/scripts/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

//will copy all js files
gulp.task('scripts', function(){
  gulp.src('./src/scripts/*.js')
  .pipe(gulp.dest('./dist/scripts'));
});

//will copy all css files
gulp.task('styles', function(){
  gulp.src('./src/styles/*.scss')
  .pipe(sass({outputStyle: isProduction ? 'compressed' : "expanded"}).on('error', sass.logError))
  .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false}))
  .pipe(gulp.dest('./dist/styles'));
});

//will copy all images
gulp.task('images', function(){
  gulp.src('./src/images/*.png')
  .pipe(gulp.dest('./dist/images'));
});

//will run the build proces
gulp.task('build', gulpSequence('lint', 'clean', ['views', 'scripts', 'styles', 'images']));

//the default action
gulp.task('default', ['build']);