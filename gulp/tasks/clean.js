var gulp = require('gulp');
var del = require('del');

//Delete the dist directory
gulp.task('clean', () => {
  return del('dist/**');
});
