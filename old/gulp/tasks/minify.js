import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import connect from 'gulp-connect';
import gulp from 'gulp';

import { paths } from './paths';

export function minifyCss() {
  return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', paths.styles.src])
    .pipe(cleanCSS({
      compatibility: 'ie10'
    }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(connect.reload());
}
