// all the node modules we need
const gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel'),
	eslint = require('gulp-eslint'),
	changed = require('gulp-changed'),
	imagemin = require('gulp-imagemin'),
	htmllint = require('gulp-htmllint'),
	fancyLog = require('fancy-log'),
	colors = require('colors'),
	plumber = require('gulp-plumber'),
	gulpFn  = require('gulp-fn'),
	browserSync = require('browser-sync').create()


const genericErrorHandler = function (err) {
	fancyLog("SCSS Issue: " + err.toString().red);
	// console.log(err.toString());
	this.emit('end');
}

gulp.task('html-refresh', function() {
	gulp.watch(['src/js/**/*.js', 'dist/js/**/*.js', '*.html']).on("change", browserSync.reload);
});
	

gulp.task('html-check', function() {
	return watch('*.html', { ignoreInitial: false })
		.pipe(plumber())
		.pipe(htmllint({}, htmllintReporter))
});

var htmllintReporter = function (filepath, issues) {
	var filepathSplit = filepath.split("/");
	filename = filepathSplit[filepathSplit.length - 1];
	if (issues.length > 0) {
		issues.forEach(function (issue) {
			fancyLog("HTML Issue: " + filename + ', line ' + issue.line + ': '.white + issue.msg.red);
		});
 
		process.exitCode = 1;
	} else {
		console.log("HTML checked for errors: ".cyan);
		console.log(filepath);
	}
}
	


// this task takes sass files and compiles them
gulp.task('sass-compile', function () {
	return watch('src/scss/**/*.scss') // run over these files
		.pipe(plumber())
		.pipe(sourcemaps.init()) // make sourcemaps for chrome devtools
		.pipe(sass({ // convert the sass into plain css
			outputStyle: 'expanded',  // change to 'expanded' to make it readable
			indentType: 'tab', 
			indentWidth: 1,
		}))
		.pipe(sourcemaps.write('./')) // put the sourcemaps with the css files
		.pipe(gulp.dest((file) => file.base.replace('src', 'dist').replace('scss', 'css'))) // put the css files here.
		.pipe(browserSync.stream()) // tell browsersync to send over the changes
		.pipe(gulpFn(function(file) {
			if (file.path.indexOf('.css.map') === -1) {
				console.log("SCSS converted to CSS: ".cyan);
				console.log(file.path.replace('src', 'dist').replace('scss', 'css'))
			}
		}))
});


// this task looks through js files for errors
gulp.task('js-check', function () {
	// if eslint complains about a certain error, and you want to turn it off, or change it
	// go here for the rules https://eslint.org/docs/rules/
	// and you'll need to change them in the .eslintrc file in the root of the project.
	return watch(['src/js/**/*.js', 'dist/js/**/*.js'], function() {
		return gulp.src(['src/js/**/*.js', 'dist/js/**/*.js'])
			.pipe(plumber())
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError())	
	})
})



// this task looks through js files for errors
gulp.task('js-compile', function () {
	return watch('src/js/**/*.js') // watch these files
		.pipe(plumber())
		.pipe(sourcemaps.init()) // make sourcemaps for chrome devtools
		.pipe(babel({ // run the js through babel to convert ES6 to ES5
			presets: ['env'],
		}))
		.on('error', function (err) {
			console.warn('[JS Babel Error] '.red + err.message);
		})
		// .pipe(concat('./app.js')) // join all the js files into one // uncomment this line if you want to concatenate all JS files into one.
		.pipe(sourcemaps.write('./')) // put the sourcemaps with the js files
		.pipe(gulp.dest((file) => file.base.replace('src', 'dist'))) // put the js files here.
		.pipe(gulpFn(function(file) {
			if (file.path.indexOf('.js.map') === -1) {
				console.log("JS generated: ".cyan);
				console.log(file.path.replace('src', 'dist'));
			}
		}))
		
});

// this task looks through js files for errors
gulp.task('image-compress', function () {
	let imgDest = 'dist/img/';
	return watch('src/img/*.*') // watch these files
		.pipe(plumber())
		.pipe(changed(imgDest))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDest)) // put the image files here.
		.pipe(browserSync.stream()) // tell browsersync to send over the changes
		.pipe(gulpFn(function(file) {
			console.log("Image compressed and copied to: ".cyan);
			console.log(file.history[1])
		}))
})

gulp.task('welcome', function () {
	console.log(colors.red('Starting Circus Starter template gulpfile! Wizz, whirrrrr, bang, pop!'));
})

gulp.task('make-cool-shit', function () {
	setTimeout(() => {
		console.log(' ');
		console.log(' ================================================ '.red);
		console.log('  Welcome to the Circus Starter template.         '.white.bold);
		console.log('  You\'re good to go.                              '.white.bold);
		console.log('  Make cool 💩.                                     '.white.bold);
		console.log('                                - Chris Silich    '.white.dim);
		console.log(' ================================================ '.red);
		console.log(' ');
	}, 500)
})



gulp.task('start-browsersync', function() {
	browserSync.init({ // start the browsersync mini-server
		server: "./", // on the root of the project
	});
})


// running `gulp` runs this task. this task sort of branches off into the others as needed
gulp.task('default', [
	'welcome', 
	'start-browsersync', 
	'html-refresh', 
	'html-check', 
	'image-compress', 
	'js-check', 
	'js-compile', 
	'sass-compile', 
	'make-cool-shit'
]);

gulp.task('no-browser-sync', [
	'welcome', 
	'html-refresh', 
	'html-check', 
	'image-compress', 
	'js-check', 
	'js-compile', 
	'sass-compile', 
	'make-cool-shit'
]);