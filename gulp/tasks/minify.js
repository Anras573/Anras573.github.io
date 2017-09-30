var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var sequence = require('run-sequence');

gulp.task('minify', (done) => {
  sequence('minify-css', done);
});

gulp.task('minify-css', () => {
  gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', 'src/css/**/*.css'])
    .pipe(cleanCSS({
      compatibility: 'ie10'
    }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('dist/assets/css'))
});
