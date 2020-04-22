import connect from 'gulp-connect';
import gulp from 'gulp';
import gulpPug from 'gulp-pug';

import { paths } from './paths';

export function pug() {
  return gulp.src(paths.pug.index)
    .pipe(gulpPug({
      pretty: true
    }))
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
}
