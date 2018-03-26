// all the node modules we need
const gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel'),
	eslint = require('gulp-eslint'),
	stylish = require('jshint-stylish'),
	newer = require('gulp-newer'),
	imagemin = require('gulp-imagemin'),
	htmllint = require('gulp-htmllint'),
	fancyLog = require('fancy-log'),
	colors = require('ansi-colors'),
	browserSync = require('browser-sync').create()



gulp.task('html-check', function() {
	return gulp.src(['!./node_modules/**/*.html', './**/*.html'])
		.pipe(htmllint({}, htmllintReporter));
});



var htmllintReporter = function (filepath, issues) {
	var filepathSplit = filepath.split("/");
	filename = filepathSplit[filepathSplit.length - 1];
	if (issues.length > 0) {
		// fancyLog(colors.cyan('[gulp-htmllint] '));
		issues.forEach(function (issue) {
			fancyLog("HTML Issue: " + colors.white(filename + ', line ' + issue.line + ': ') + colors.red(issue.msg));
		});
 
		process.exitCode = 1;
	}
}
	

// this task takes sass files and compiles them
gulp.task('sass-compile', function () {
	return gulp.src(['./src/scss/**/_*.scss', './src/scss/**/*.scss']) // run over these files
		.pipe(sourcemaps.init()) // make sourcemaps for chrome devtools
		.pipe(sass({ // convert the sass into plain css
			outputStyle: 'expanded',  // change to 'expanded' to make it readable
			indentType: "tab", 
			indentWidth: 1,
		}).on('error', sass.logError)) // on errors, show them
		.pipe(sourcemaps.write('./')) // put the sourcemaps with the css files
		.pipe(gulp.dest('./dist/css')) // put the css files here.
		.pipe(browserSync.stream()) // tell browsersync to send over the changes
});



// this task looks through js files for errors
gulp.task('js-compile', function () {
	return gulp.src('./src/js/**/*.js') // watch these files
		.pipe(sourcemaps.init()) // make sourcemaps for chrome devtools
		.pipe(babel({ // run the js through babel to convert ES6 to ES5
			presets: ['env'],
		}))
		.on('error', function (err) {
			console.warn(err.message);
			this.emit('end');
		})		
		// .pipe(concat('./app.js')) // join all the js files into one // uncomment this line if you want to concatenate all JS files into one.
		.pipe(sourcemaps.write('./')) // put the sourcemaps with the js files
		.pipe(gulp.dest('./dist/js')) // put the js files here.
		.pipe(browserSync.stream()) // tell browsersync to send over the changes
});

// this task looks through js files for errors
gulp.task('image-compress', function () {
	var imgDest = './dist/img';
	return gulp.src('./src/img/**/*') // watch these files
		.pipe(newer(imgDest))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDest))
})


// this task looks through js files for errors
gulp.task('js-check', function () {
	return gulp.src(['!./dist/js/app.js', './src/js/**/*.js', './dist/js/**/*.js']) // watch these files
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
})


gulp.task('default', function() { // running `gulp` runs this task. this task sort of branches off into the others as needed

	browserSync.init({ // start the browsersync mini-server
		server: "./", // on the root of the project
	});

	gulp.watch(['!./node_modules/*.*', './**/*.html'], ['html-check']); // watch sass files. if they change, run the task called sass-compile
	gulp.watch('./src/img/**/', ['image-compress']); // watch sass files. if they change, run the task called sass-compile
	gulp.watch('./src/scss/**/*.scss', ['sass-compile']); // watch sass files. if they change, run the task called sass-compile
	gulp.watch('./src/js/**/*.js', ['js-compile']); // watch js files. if they change, run the tasks called js-check and js-compile
	gulp.watch('./dist/js/**/*.js', ['js-check']); // watch js files. if they change, run the tasks called js-check
	gulp.watch('./**/*.html').on('change', browserSync.reload); // watch all top level files and reload if they change
});
