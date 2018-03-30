var gulp        = require('gulp'),
	sass        = require('gulp-sass'),
	browserSync = require('browser-sync'),
	uglifyjs    = require('gulp-uglifyjs'),
	cssnano     = require('gulp-cssnano'),
	rename      = require('gulp-rename'),
	del         = require('del'),
	imagemin    = require('gulp-imagemin'),
	pngquant    = require('imagemin-pngquant'),
	autopref    = require('gulp-autoprefixer'),
	htmlPartial = require('gulp-html-partial')

gulp.task('sass', function(){
  return gulp.src('app/stylesheets/*.scss')
    .pipe(sass())
    .pipe(autopref(
      [
        'last 10 versions',
        '>1%'
      ],
      { cascade: true }
    ))
    .pipe(gulp.dest('app/css'));
    //.pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function(){
  return gulp.src('app/css/*')
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function(){
  return gulp.src('app/js/script.js')
    .pipe(uglifyjs())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/js'));
});

gulp.task('css-nano', ['sass'], function(){
	return gulp.src('app/css/style.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'));
});

gulp.task('html', function () {
	gulp.src('app/components/*.html')
		.pipe(htmlPartial({
			basePath: 'app/components/template/'
		}))
		.pipe(gulp.dest('app'));
		//browserSync.reload();
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		}
	})
});

gulp.task('clean', function(){
  return del.sync('dist');
});

gulp.task('img', function(){
  return gulp.src('app/images/**/*')
    .pipe(imagemin({
			interlaced: true,
			progressive: true,
			svg0Plugin: [{removeViewBox: false}],
			use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('media', function(){
  return gulp.src('app/media/**/*')
    .pipe(imagemin({
			interlaced: true,
			progressive: true,
			svg0Plugin: [{removeViewBox: false}],
			use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/media'));
});

gulp.task('watch', ['browser-sync'], function(){
	gulp.watch('app/stylesheets/*.scss', ['sass']);
	gulp.watch('app/components/**/*.html', ['html']);
	gulp.watch('app/js/*.js', browserSync.reload);
	gulp.watch('app/images/**/*', browserSync.reload);
	gulp.watch('app/media/**/*', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/svg/*', browserSync.reload);
	gulp.watch('app/css/*', ['css']);
});

gulp.task('build', ['clean', 'img', 'media', 'sass', 'css-nano', 'scripts'], function(){
	var buildCss = gulp.src('app/css/*.css')
	.pipe(gulp.dest('dist/css'));

	var buildSCSS = gulp.src('app/stylesheets/*.scss')
	.pipe(gulp.dest('dist/scss'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildScript = gulp.src('app/js/*.js')
	.pipe(gulp.dest('dist/js'));

	var buildLib = gulp.src('app/lib/**/*')
	.pipe(gulp.dest('dist/lib'));

	var buildLib = gulp.src('app/svg/*')
	.pipe(gulp.dest('dist/svg'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch']);