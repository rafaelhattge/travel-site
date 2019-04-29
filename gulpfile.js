var gulp  = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var browserSync = require('browser-sync').create();

gulp.task('default', function(){
    console.log("Hooray - you created a gulp task!");
});

gulp.task('html', function*(){
    console.log("Imagine html function here");
});

gulp.task('styles', function(){
    return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([nested, cssvars, autoprefixer]))
    .on('error', function(errorInfo){
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function()
    {

        browserSync.init({
            server: {
                baseDir: "app"
            }
        });

        watch('./app/index.html', function() {
            browserSync.reload();
        });

        watch('./app/assets/styles/**/*.css', function(){
            gulp.start('cssInject');
        });
});

gulp.task('cssInject', ['styles'], function(){
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});