var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var sequence = require('run-sequence');

gulp.task('minify', (done) => {
  sequence('minify-css', 'fonts', done);
});

gulp.task('minify-css', () => {
  gulp.src('src/css/**/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie10'
    }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('dist/assets/css'))
});

gulp.task('fonts', () => {
  gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('dist/assets/css/fonts'))
})
