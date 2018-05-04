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
	axios = require('axios'),
	fs = require('fs'),
	util = require('util'),
	browserSync = require('browser-sync').create()



gulp.task('html-refresh', function() {
	return watch(['src/js/**/*.js', 'dist/js/**/*.js', '*.html', '!node_modules/*.*'], { ignoreInitial: false })
		.pipe(gulpFn(function(file) {
			browserSync.reload();
		}))
});
	

gulp.task('html-check', function() {
	return watch(['*.html', '!node_modules/*.*'], { ignoreInitial: false })
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
gulp.task('sass-compile', () => {
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
gulp.task('js-compile', () => {
	return watch('src/js/**/*.js') // watch these files
		.pipe(plumber())
		.pipe(sourcemaps.init()) // make sourcemaps for chrome devtools
		.pipe(babel())
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
gulp.task('image-compress', () => {
	let imgDest = 'dist/img/';
	return watch('src/img/**/*.*') // watch these files
		.pipe(plumber())
		.pipe(changed((file) => file.base.replace('src', 'dist')))
		.pipe(imagemin())
		.pipe(gulp.dest((file) => file.base.replace('src', 'dist'))) // put the image files here.
		.pipe(browserSync.stream()) // tell browsersync to send over the changes
		.pipe(gulpFn(function(file) {
			console.log("Image compressed and copied to: ".cyan);
			console.log(file.path.replace('src', 'dist'));
		}))
})



gulp.task('start-browsersync', function() {
	browserSync.init({ // start the browsersync mini-server
		server: "./", // on the root of the project
	});
})



gulp.task('welcome', () => {
	console.log(colors.red('Starting Circus Starter template gulpfile! Wizz, whirrrrr, bang, pop!'));
})

gulp.task('make-cool-shit', () => {
	setTimeout(() => {
		console.log(' ');
		console.log(' ================================================ '.red);
		console.log('  Welcome to the Circus Starter template.         '.blue.bold);
		console.log('  You\'re good to go.                              '.blue.bold);
		console.log('  Make cool 💩.                                     '.blue.bold);
		console.log('                                - Chris Silich    '.blue.dim);
		console.log(' ================================================ '.red);
		console.log(' ');
	}, 500)
})




gulp.task('version', () => {
	// pay no attention to the man behind the curtain.
	fs.readFile('package.json', 'utf8', function (err, data) {
		if (err) {
			console.warn(`Where's package.json?!?!?!`.red.bold.inverse);
			return false;
		}
		let parsedPackage = JSON.parse(data);	
		let packagefileURL = 'https://raw.githubusercontent.com/CreativeCircus/circus-starter/master/package.json';
		axios.get(packagefileURL, {responseType: 'json'})
			.then(response => {
				if (parsedPackage.version === response.data.version) {
					console.log(`Circus Starter template appears to be up to date.`)
				} else {
					console.warn(`Local version is ${parsedPackage.version}.`.red.bold)	
					console.warn(`Remote version is ${response.data.version}.`.red.bold)	
					console.warn(`Circus Starter template appears to be out of date.`.red.bold.inverse)				
					console.warn(`If this is a new project, get a new copy. If it's an old project, consider updating for new gulpy goodness.`.red.bold.inverse)				
				}
			})
			.catch(error => {
				console.log(`Couldn't fetch circus-starter mod date`, error);
			});
	});
})

// running `gulp` runs this task. this task sort of branches off into the others as needed
gulp.task('default', [
	'welcome', 
	'start-browsersync', 
	'html-refresh', 
	'html-check', 
	'image-compress', 
	'js-compile', 
	'sass-compile', 
	'make-cool-shit',
	'version'
]);

gulp.task('no-browser-sync', [
	'welcome', 
	'html-refresh', 
	'html-check', 
	'image-compress', 
	'js-compile', 
	'sass-compile', 
	'make-cool-shit',
	'version'
]);


