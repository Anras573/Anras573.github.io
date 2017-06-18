// Root directories for the src and dist directory.

var root = {
  src: 'src/',
  dist: 'dist/',
};

module.exports = {
  // Paths
  src: root.src,
  dist: root.dist,
  // Log out changed files
  logChanges: true,
  server: {
    port: '3000'
  },

  js: {
    // Either a string to a file path, or an array of file paths.
    src: root.src + 'app.js',
    // These node modules will not be included in the vendor file, even if they are present in the package.json dependencies field.
    excludedModules: [],
    // Create a separate vendor file.
    vendor: false
  },

  style: {
    //Supported preprocessors: 'less', 'stylus', 'sass' or null
    preprocessor: 'null',
    src: root.src + '!(_)*.{sass,scss}', //Compile all style files not starting with "_" in the root style directory.
    watch: root.src + '**/*.{css,scss}'
  },

  img: {
    src: root.src + 'assets/gfx/**/{*.png,*.jpg,*.gif,*.svg,*.ico}',
    dir: 'assets/gfx'
  },

  assets: {
    src: [root.src + 'assets/**/*.!(md)']
  },

  components: {
    src: [root.src + 'components/**/*']
  },

  // BrowserSync instance is stored here.
  browserSync: null
};
