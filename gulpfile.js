const gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  stylelint = require('gulp-stylelint'),
  autoprefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel');

// Function that catch errors and will therefore prevent gulp to exit the watch task as long as an on listener is set.
function swallowError(error) {
  console.log(error.messageFormatted);
};

gulp.task('lintJavaScripts', () => {
  gulp.src([
    'resources/assets/javascripts/custom/**/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .on('error', swallowError);
});

gulp.task('processJavaScripts', () => {
  gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'resources/assets/javascripts/global/**/*.js',
    'resources/assets/javascripts/custom/**/*.js'
  ])
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(concat('app.min.js'))
  .pipe(uglify({
    mangle: true,
    compress: true
  }))
  .on('error', swallowError)
  .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('lintStyleSheets', () => {
  gulp.src([
    'resources/assets/stylesheets/**/*.scss'
  ])
  .pipe(stylelint({
    reporters: [{
      formatter: 'string',
      console: true
    }]
  }))
  .on('error', swallowError);
});

gulp.task('processStyleSheets', () => {
  gulp.src([
    'resources/assets/stylesheets/app.scss'
  ])
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .on('error', swallowError)
  .pipe(autoprefixer({
    browsers: ['last 4 versions', '> 5%']
  }))
  .pipe(rename('app.min.css'))
  .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('default', gulp.parallel('lintJavaScripts', 'processJavaScripts', 'lintStyleSheets', 'processStyleSheets'));

gulp.task('watch', () => {
  gulp.watch('resources/assets/stylesheets/**/*.scss', [
    'lintStyleSheets',
    'processStyleSheets'
  ]);
  gulp.watch('resources/assets/javascripts/**/*.js', [
    'lintJavaScripts',
    'processJavaScripts'
  ]);
});

