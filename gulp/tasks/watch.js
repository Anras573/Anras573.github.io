var gulp = require('gulp');

gulp.task('watch', (done) => {
   gulp.watch(['src/js/**/*.js', 'src/css/**/*.css'], ['minify']);
   gulp.watch(['src/pug/*.pug'], ['pug']);
});
