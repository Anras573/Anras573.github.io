var gulp = require("gulp");
var gutil = require("gulp-util");
var path = require("path");
var fs = require('fs');
var source = require('vinyl-source-stream');
var es = require('event-stream');
var exorcist = require('exorcist');
var _ = require('lodash');

var handleErrors = require("../util/handleErrors");
var config = require('../config');

var watchStream = null;
var compileError = false;

// Setup options
var opts = {
	debug: false,
	extensions: [".js"],
	fullPaths: false // Set fullpaths to false - Otherwise the files full path is used as the index.
};

/**
 * @returns {*|Stream}
 */
gulp.task('browserify', function() {
	var watch = require('gulp-watch');

	var streams = [];

	if (_.isArray(config.js.src)) {
		// If src is an array of files, package each.
		_.forEach(config.js.src, function(file, index) {
			streams.push(packageApplication(file));
		});
	} else {
		streams.push(packageApplication());
	}

	return es.merge.apply(null, streams);
});

/**
 * Compile the main app.js file.
 * @returns {*}
 */
function packageApplication(file) {
	file = file || config.js.src;

	//Require Browserify
	var browserify = require('browserify');
	var watchify = require('watchify');

	var bundler = watchify(browserify(_.assign(watchify.args, opts)));

	// Get the name, so it can be passed to the bundler
	var name = path.basename(file, '.js');

	// Add the assets - e.g. app.js
	bundler.add(path.resolve(file));

	bundler.transform("babelify");
	bundler.transform("envify");
	bundler.transform("partialify");

	// Add transforms
	bundler.transform({
		global: false,
		mangle: true,
		sourcemap: opts.debug,
		exts: [".js"], //Only uglify .js files. Would break if .html or .json are required.
		ignore: []
	}, 'uglifyify');

	// Start watching
	if (config.logChanges) bundler.on('update', logFiles);
	bundler.on('update', function() {
		// On updates, rebundle the app.
		bundle(bundler, name);
	});

	return bundle(bundler, name);
}

/**
 * Bundle all the JS files.
 */
function bundle(bundler, name) {
	return bundler.bundle()
		.on('error', function(error) {
      console.log(error);
			handleErrors(error); //Break the pipe by placing error handler outside
			compileError = true;
			this.emit('end');
		})

		// Output the .js file
		.pipe(source(name + '.min.js'))
		.pipe(gulp.dest(config.dist + 'assets/js'))

		// Notify the user on successful compile, after an error
		.pipe(compileError ? es.map(function(file, cb) {
			if (compileError) gutil.log(gutil.colors.green("JS compiled"));
			compileError = false;
		}) : gutil.noop());
}

/**
 * Console log all files in the array.
 * @param files {Array}
 */
function logFiles(files) {
	if (files) {
		for (var i = 0; i < files.length; i++) {
			gutil.log("Changed: " + gutil.colors.magenta(path.relative(config.src, files[i])));
		}
	}
}
