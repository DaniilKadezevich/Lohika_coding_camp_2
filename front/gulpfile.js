const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');''
const plumber = require('gulp-plumber');

gulp.task('style',() => {
    gulp.src('./app/assets/scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./app/assets/css'))
});

gulp.task('webserver', () => {
    gulp.src('app')
    .pipe(plumber())
    .pipe(webserver({
        directoryListing: {
            enable: true,
            path: './app/index'
        },
        livereload: true,
        fallback: false, 
        open: true,
        port: 9000,
    }));
});

gulp.task('watcher', () => {
    gulp.watch('./app/assets/scss/*.scss',['style']);
});

gulp.task('default', ['style', 'webserver', 'watcher']);