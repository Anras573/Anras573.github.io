var gulp = require('gulp');
var sequence = require('run-sequence');

require('require-all')(__dirname + '/gulp/tasks');

gulp.task('dev', (done) => {
  sequence('clean', 'minify', 'server', 'watch', done);
});

gulp.task('default', (done) => {
  sequence('dev', done);
});