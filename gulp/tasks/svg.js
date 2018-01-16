var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('svg', () => {
  gulp.src('src/svg/**/*.svg')
    .pipe(concat('sprites.svg'))
    .pipe(gulp.dest('dist/assets/svg'))
});
