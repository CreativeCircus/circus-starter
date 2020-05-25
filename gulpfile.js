// all the node modules we need
const gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	changed = require('gulp-changed'),
	imagemin = require('gulp-imagemin'),
	htmllint = require('gulp-htmllint'),
	fancyLog = require('fancy-log'),
	colors = require('colors'),
	plumber = require('gulp-plumber'),
	gulpFn = require('gulp-fn'),
	axios = require('axios'),
	fs = require('fs'),
	browserSync = require('browser-sync').create()


const errorHandler = function (err) {
	notify.onError({
		title: 'Gulp error in ' + err.plugin,
		message: err.toString()
	})(err);
	return this.emit('end');
};


// This task refreshes the browser if an HTML file changes
const filesForHtmlRefresh = ['src/js/**/*.js', 'dist/js/**/*.js', '*.html', '!node_modules/*.*']
gulp.task('html-refresh', function (done) {
	return gulp.src(filesForHtmlRefresh, {
			ignoreInitial: false
		})
		.pipe(gulpFn(function (file) {
			browserSync.reload();
		}))
	//done();
});



// This task checks HTML files for errors
const filesForHtmlCheck = ['*.html', '!node_modules/*.*']
gulp.task('html-check', function (done) {
	return gulp.src(filesForHtmlCheck, {
			ignoreInitial: false
		})
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



// This task takes SASS files in src and compiles them into CSS in dist
const filesForSassCompilation = ['src/scss/**/*.scss']
gulp.task('sass-compile', (done) => {
	return gulp.src(filesForSassCompilation) // run over these files
		.pipe(plumber())
		.pipe(sourcemaps.init()) // make sourcemaps for chrome devtools
		.pipe(sass({ // convert the sass into plain css
			outputStyle: 'expanded', // change to 'expanded' to make it readable
			indentType: 'tab',
			indentWidth: 1,
		}))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('./')) // put the sourcemaps with the css files
		.pipe(gulp.dest((file) => file.base.replace('/src', '/dist').replace('/scss', '/css'))) // put the css files here.
		.pipe(browserSync.stream()) // tell browsersync to send over the changes
		.pipe(gulpFn(function (file) {
			if (file.path.indexOf('.css.map') === -1) {
				console.log("SCSS converted to CSS: ".cyan);
				console.log(file.path.replace('/src', '/dist').replace('/scss', '/css'))
			}
		}))
});





// this task compiles modern (es6+/es2015+) JavaScript files in src and recompiles them
// into older, more broadly compatible (ES5) JavaScript files in dist
const filesForJsCompilation = ['src/js/**/*.js']
gulp.task('js-compile', (done) => {
	return gulp.src(filesForJsCompilation) // watch these files
		// .pipe(eslint()) // uncomment for full JS styleguide/error checking
		// .pipe(eslint.formatEach('pretty')) // uncomment for full JS styleguide/error checking
		.pipe(plumber())
		.pipe(sourcemaps.init()) // make sourcemaps for chrome devtools
		.pipe(babel())
		.on('error', function (err) {
			console.warn('[JS Babel Error] '.red + err.message);
		})
		// .pipe(concat('./app.js')) // join all the js files into one // uncomment this line if you want to concatenate all JS files into one.
		.pipe(sourcemaps.write('./')) // put the sourcemaps with the js files
		.pipe(gulp.dest((file) => file.base.replace('/src', '/dist'))) // put the js files here.
		.pipe(gulpFn(function (file) {
			if (file.path.indexOf('.js.map') === -1) {
				console.log("JS generated: ".cyan);
				console.log(file.path.replace('/src', '/dist'));
			}
		}))
});








// This task takes all images dropped in src and recompresses them, and puts them in dist
const filesForImageCompression = ['src/img/**/*.*']
gulp.task('image-compress', (done) => {
	let imgDest = 'dist/img/';
	return gulp.src(filesForImageCompression) // watch these files
		.pipe(plumber())
		.pipe(changed((file) => file.base.replace('/src', '/dist')))
		.pipe(imagemin())
		.pipe(gulp.dest((file) => file.base.replace('/src', '/dist'))) // put the image files here.
		.pipe(browserSync.stream()) // tell browsersync to send over the changes
		.pipe(gulpFn(function (file) {
			console.log("Image compressed and copied to: ".cyan);
			console.log(file.path.replace('/src', '/dist'));
		}))
})


// This task initializes the BrowserSync thing, which is what refreshes your page when you save a file
gulp.task('start-browsersync', function (done) {
	browserSync.init({ // start the browsersync mini-server
		server: "./", // on the root of the project
	});
	done()
})


// This task says hi.
gulp.task('welcome', (done) => {
	console.log(colors.red('Starting Circus Starter template gulpfile! Wizz, whirrrrr, bang, pop!'));
	done();
})

// This task says make cool shit.
gulp.task('make-cool-shit', (done) => {
	setTimeout(() => {
		console.log(' ');
		console.log(' ================================================ '.red);
		console.log('  Welcome to the Circus Starter template.         '.blue.bold);
		console.log('  You\'re good to go.                              '.blue.bold);
		console.log('  Make cool 💩.                                     '.blue.bold);
		console.log('                                - Chris Silich    '.blue.dim);
		console.log(' ================================================ '.red);
		console.log(' ');
		done()
	}, 500)
})



// This task checks what version of Circus Starter is on Github, and warns you if your version doesn't match.
gulp.task('version', (done) => {
	// pay no attention to the man behind the curtain.
	fs.readFile('package.json', 'utf8', function (err, data) {
		if (err) {
			console.warn(`Where's package.json?!?!?!`.red.bold.inverse);
			done();
			return false;
		}
		let parsedPackage = JSON.parse(data);
		let packagefileURL = 'https://raw.githubusercontent.com/CreativeCircus/circus-starter/master/package.json';
		axios.get(packagefileURL, {
				responseType: 'json'
			})
			.then(response => {
				if (parsedPackage.version === response.data.version) {
					console.log(`Circus Starter template appears to be up to date.`)
				} else {
					console.warn(`Local version is ${parsedPackage.version}.`.red.bold)
					console.warn(`Remote version is ${response.data.version}.`.red.bold)
					console.warn(`Circus Starter template appears to be out of date.`.red.bold.inverse)
					console.warn(`If this is a new project, get a new copy. If it's an old project, consider updating for new gulpy goodness.`.red.bold.inverse)
				}
				done();
			})
			.catch(error => {
				console.log(`Couldn't fetch circus-starter mod date`, error);
				done();
			});
	});
})

gulp.task('build', gulp.parallel('html-refresh', 'html-check', 'image-compress', 'js-compile', 'sass-compile'))
gulp.task('watch', function () {
	const opts = {}
	gulp.watch(filesForHtmlRefresh, opts, gulp.series(['html-refresh']))
	gulp.watch(filesForHtmlCheck, opts, gulp.series(['html-check']))
	gulp.watch(filesForJsCompilation, opts, gulp.series(['js-compile']))
	gulp.watch(filesForSassCompilation, opts, gulp.series(['sass-compile']))
	gulp.watch(filesForImageCompression, opts, gulp.series(['image-compress']))
})

// Running `gulp` runs this task. This task sort of branches off into the others as needed.
gulp.task('default', gulp.series(
	'welcome',
	'start-browsersync',
	'build',
	'watch',
	'make-cool-shit',
	'version'
));


// Running `gulp` runs this task. This task sort of branches off into the others as needed.
// This version is just missing the BrowserSync stuff, for projects where that wouldn't work, like
// PHP and Wordpress projects.
gulp.task('no-browser-sync', gulp.series(
	'welcome',
	gulp.parallel(
		'html-refresh',
		'html-check',
		'image-compress',
		'js-compile',
		'sass-compile'
	),
	'make-cool-shit',
	'version'
));