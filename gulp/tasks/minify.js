var gulp = require('gulp');
var uglifyJS = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var sequence = require('run-sequence');

gulp.task('minify', (done) => {
  sequence('minify-js', 'minify-css', 'fonts', done);
});

gulp.task('minify-js', () => {
  gulp.src('src/js/**/*.js')
    .pipe(uglifyJS())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('minify-css', () => {
  gulp.src('src/css/**/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('dist/assets/css'))
});

gulp.task('fonts', () => {
  gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('dist/assets/css/fonts'))
})
