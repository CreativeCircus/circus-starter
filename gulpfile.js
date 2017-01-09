// all the node modules we need
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var browserSync = require('browser-sync').create();




// this task takes sass files and compiles them
gulp.task('sass', function () {
	return gulp.src('./assets/sass/**/*.scss') // run over these files
		.pipe(sourcemaps.init()) // make sourcemaps for chrome devtools
		.pipe(sass().on('error', sass.logError)) // on errors, show them
		.pipe(sourcemaps.write('./')) // put the sourcemaps with the css files
		.pipe(gulp.dest('./assets/css')) // put the css files here.
        //.pipe(browserSync.stream()); // tell browsersync to send over the changes
});



// this task looks through js files for errors
gulp.task('lint', function () {
	return gulp.src('./assets/js/**/*.js') // watch these files
		.pipe(jshint()) // error ceck the files
		.pipe(jshint.reporter('jshint-stylish'/*, {beep: true}*/)); // if there are errors, show them
});



gulp.task('default', function() { // running `gulp` runs this task. this task sort of branches off into the others as needed

	browserSync.init({ // start the browsersync mini-server
        server: "./" // on the root of the project
    });

	gulp.watch('./assets/sass/**/*.scss', ['sass']); // watch sass files. if they change, run the task called "sass"
	gulp.watch('./assets/js/**/*.js', ['lint']); // watch js files. if they change, run the task called "lint"
    gulp.watch("./**/*.html").on('change', browserSync.reload); // watch all top level files and reload if they change
    gulp.watch("./assets/**/*.*").on('change', browserSync.reload); // watch all assets and reload if they change
});
