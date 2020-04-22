import connect from 'gulp-connect';

export function server() {
  return connect.server({
    root: './',
    livereload: true
  });
}
