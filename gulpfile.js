var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var jade        = require('gulp-jade');
var reload      = browserSync.reload;

/**
 * Compile jade files into HTML
 */
gulp.task('templates', function() {

    var YOUR_LOCALS = {};

    return gulp.src('./src/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .on('error', swallowError)
        .pipe(gulp.dest('./dist/'));
});

/**
 * Important!!
 * Separate task for the reaction to `.jade` files
 */
gulp.task('jade-watch', ['templates'], reload);

/**
 * Sass task for live injecting into all browsers
 */
gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist'))
        .on('error', swallowError)
        .pipe(reload({stream: true}));
});

gulp.task('images', function() {
  return gulp.src('./src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./dist'))
    .on('error', swallowError)
    .pipe(reload({stream:true}));
});

/**
 * Serve and watch the scss/jade files for changes
 */
gulp.task('default', ['sass', 'templates'], function () {

    browserSync({server: './dist'});

    gulp.watch('./src/scss/*.scss', ['sass']);
    gulp.watch('./src/*.jade',      ['jade-watch']);
    gulp.watch('./src/img/**/*',    ['images']);
});

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}