var gulp = require('gulp'),
    rename = require('gulp-rename'),
    //fs = require('fs'),
    gutil = require('gulp-util'),
    gulpJsdoc2md = require('gulp-jsdoc-to-markdown'),
    uglify = require('gulp-uglify'),
    paths = {
      js: ['./src/$array.js']
    };

gulp.task('default', ['docs','js']);

gulp.task('js', function(){
  return gulp.src(paths.js)
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify({output: {comments: /^!|@preserve|@license|@cc_on/i}}))
    .pipe(rename({extname:'.min.js'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('docs', function () {
 return gulp.src(paths.js)
   .pipe(gulpJsdoc2md({
		 private:true
	 }))
   .pipe(rename('DOCS.md'))
   .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
  gulp.watch(paths.js, ['docs','uglify']);
});
