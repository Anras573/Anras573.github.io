import concat from 'gulp-concat';
import gulp from 'gulp';

import { paths } from './paths';

export function svg() {
  return gulp.src(paths.svgs.src)
    .pipe(concat('sprites.svg'))
    .pipe(gulp.dest(paths.svgs.dest));
}
