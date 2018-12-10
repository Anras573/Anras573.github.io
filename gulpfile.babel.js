import gulp from 'gulp';

import { clean } from './gulp/tasks/clean.js';
import { minifyCss, minifyJs } from './gulp/tasks/minify';
import { pug } from './gulp/tasks/pug';
import { server } from './gulp/tasks/server';
import { svg } from'./gulp/tasks/svg';
import { watch } from './gulp/tasks/watch';

const build = gulp.series(clean, gulp.parallel(minifyCss, minifyJs, pug), svg);
const dev = gulp.series(clean, gulp.parallel(minifyCss, minifyJs, pug), svg, gulp.parallel(server, watch));

gulp.task('build', build);
gulp.task('dev', dev);

export default dev;
