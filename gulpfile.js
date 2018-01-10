// all the node modules we need
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var babel = require('gulp-babel');
var stylish = require('jshint-stylish');
var browserSync = require('browser-sync').create();



// this task takes sass files and compiles them
gulp.task('sass', function () {
	return gulp.src('./src/scss/**/*.scss') // run over these files
		.pipe(sourcemaps.init()) // make sourcemaps for chrome devtools
		.pipe(sass({ // convert the sass into plain css
				outputStyle: 'compressed',  // change to 'expanded' to make it readable
				indentType: "tab", 
				indentWidth: 1
			}).on('error', sass.logError)) // on errors, show them
		.pipe(sourcemaps.write('./')) // put the sourcemaps with the css files
		.pipe(gulp.dest('./dist/css')) // put the css files here.
        .pipe(browserSync.stream()) // tell browsersync to send over the changes
});



// this task looks through js files for errors
gulp.task('js', function () {
	return gulp.src('./src/js/**/*.js') // watch these files
		.pipe(sourcemaps.init()) // make sourcemaps for chrome devtools
		.pipe(jshint(".jshintrc")) // error check the files
		.pipe(jshint.reporter('jshint-stylish', {beep: true})) // if there are errors, show them
		.pipe(babel({ // run the js through babel to convert ES6 to ES5
            presets: ['env']
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



gulp.task('default', function() { // running `gulp` runs this task. this task sort of branches off into the others as needed

	browserSync.init({ // start the browsersync mini-server
        server: "./" // on the root of the project
    });

	gulp.watch('./src/scss/**/*.scss', ['sass']); // watch sass files. if they change, run the task called "sass"
	gulp.watch('./src/js/**/*.js', ['js']); // watch js files. if they change, run the task called "lint"
    gulp.watch("./**/*.html").on('change', browserSync.reload); // watch all top level files and reload if they change
});
