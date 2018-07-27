var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  stylelint = require('gulp-stylelint'),
  autoprefixer = require('gulp-autoprefixer');

// Function that catch errors and will therefore prevent gulp to exit the watch task as long as an on listener is set.
function swallowError(error) {
  console.log(error.messageFormatted);
}

gulp.task('watch', function () {
  gulp.watch('resources/assets/stylesheets/**/*.scss', ['stylelint', 'css']);
  gulp.watch('resources/assets/javascripts/**/*.js', ['eslint', 'uglify']);
});

gulp.task('eslint', function () {
  return gulp.src(['resources/assets/javascripts/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('uglify', function () {
  gulp
    .src([
      'node_modules/pusher-js/dist/web/pusher.min.js',
      'node_modules/laravel-echo/dist/echo.js',
      'node_modules/jquery/dist/jquery.js',
      'resources/assets/javascripts/**/*.js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify({
      mangle: true,
      compress: true
    }))
    .on('error', swallowError)
    .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('stylelint', function () {
  return gulp
    .src('resources/assets/stylesheets/**/*.scss')
    .pipe(stylelint({
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }));
});

gulp.task('css', function () {
  gulp
    .src('resources/assets/stylesheets/app.scss')
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

gulp.task('default', [
  'eslint', 'uglify', 'stylelint', 'css'
]);
