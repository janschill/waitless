const gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  del = require('del'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  stylelint = require('gulp-stylelint'),
  autoprefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel');

const paths = {
  private: {
    styles: {
      all: 'resources/assets/stylesheets/**/*.scss',
      entryPoint: 'resources/assets/stylesheets/app.scss',
    },
    scripts: [
      'resources/assets/javascripts/global/**/*.js',
      'resources/assets/javascripts/custom/**/*.js'
    ]
  },
  public: {
    styles: 'public/stylesheets/',
    scripts: 'public/javascripts/'
  },
  vendor: {
    scripts: {
      others: [
        'node_modules/chart.js/dist/Chart.bundle.min.js'
      ]
    },
    styles: []
  },
  ignoreLinting: {
    scripts: [
      'resources/assets/javascripts/global/**/*.js'
    ]
  }
};


// Function that catch errors and will therefore prevent gulp to exit the watch task as long as an on listener is set.
function swallowError(error) {
  console.log(error.messageFormatted);
};

// https://github.com/gulpjs/gulp from sample gulpfile.js
function clean() {
  return del(['assets']);
}

function lintStyleSheets() {
  return gulp
    .src(paths.private.styles.all)
    .pipe(stylelint({
      reporters: [{ formatter: 'string', console: true }]
    }));
}

function lintJavaScripts() {
  const scripts = paths.private.scripts.filter(path => {
    return paths.ignoreLinting.scripts.indexOf(path) < 0;
  });

  return gulp
    .src(scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};


function processJavaScripts() {
  let scripts = paths.vendor.scripts.others.concat(paths.private.scripts);

  return gulp
    .src(scripts)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('app.min.js'))
    .pipe(uglify({
      mangle: true,
      compress: true
    }))
    .on('error', swallowError)
    .pipe(gulp.dest(paths.public.scripts));
}

function processStyleSheets() {
  return gulp
    .src(paths.private.styles.entryPoint)
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', swallowError)
    .pipe(autoprefixer('last 4 versions', '> 5%'))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest(paths.public.styles));
}

function watchStyles() {
  gulp.watch(paths.private.styles.all, gulp.series(lintStyleSheets, processStyleSheets))
}

function watchScripts() {
  gulp.watch(paths.private.scripts, gulp.series(lintJavaScripts, processJavaScripts))
}

const buildScripts = gulp.series(clean, gulp.parallel(processJavaScripts));

// Combine to three tasks
const lint = gulp.series(clean, gulp.parallel(lintJavaScripts, lintStyleSheets));
const build = gulp.series(clean, gulp.series(buildScripts, processStyleSheets));
const watch = gulp.series(clean, gulp.parallel(watchStyles, watchScripts));

// Final tasks: `gulp` and `gulp watch`
gulp.task('default', gulp.series(lint, build));
gulp.task('watch', gulp.series(lint, build, watch));