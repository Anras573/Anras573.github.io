import gulp from 'gulp';

import { minifyCss, minifyJs } from './minify';
import { paths } from './paths';
import { pug } from './pug';

export function watch() {
    gulp.watch(paths.styles.src, minifyCss);
    gulp.watch(paths.scripts.src, minifyJs);
    gulp.watch(paths.pug.src, pug);
}
