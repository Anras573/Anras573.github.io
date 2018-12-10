import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import connect from 'gulp-connect';
import gulp from 'gulp';

import { paths } from './paths';

export function minifyCss() {
  return gulp.src([paths.bootstrap.css, paths.styles.src])
    .pipe(cleanCSS({
      compatibility: 'ie10'
    }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(connect.reload());
}

export function minifyJs() {
  return gulp.src([paths.jQuery.src, paths.popperJS.src, paths.bootstrap.js, paths.scripts.src])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(connect.reload());
}
