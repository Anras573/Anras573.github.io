export const paths = {
    bootstrap: {
        js: 'node_modules/bootstrap/dist/js/bootstrap.min.js',
        css: 'node_modules/bootstrap/dist/css/bootstrap.min.css'
    },
    jQuery: {
        src: 'node_modules/jquery/dist/jquery.slim.min.js'
    },
    popperJS: {
        src: 'node_modules/popper.js/dist/umd/popper.min.js'
    },
    pug: {
        src: 'src/pug/*.pug',
        index: 'src/pug/index.pug'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/assets/js'
    },
    styles: {
        src: 'src/css/**/*.css',
        dest: 'dist/assets/css'
    },
    svgs: {
        src: 'src/svg/**/*.svg',
        dest: 'dist/assets/svg'
    }
}
