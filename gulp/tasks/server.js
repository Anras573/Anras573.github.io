var gulp = require('gulp');
var server = require('gulp-webserver');

gulp.task('server', () => {
  gulp.src('')
    .pipe(server({
      livereload: true,
      open: true
    }));
});
