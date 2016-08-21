var gulp = require('gulp'),
    rename = require('gulp-rename'),
    fs = require('fs'),
    gutil = require('gulp-util'),
    gulpJsdoc2md = require('gulp-jsdoc-to-markdown'),
    uglify = require('gulp-uglify'),
    paths = {
      js: ['./src/$array.js']
    };

gulp.task('default', ['docs','uglify']);

gulp.task('uglify', function(){
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(rename({extname:'.min.js'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('docs', function () {
 return gulp.src('./src/$array.js')
   .pipe(gulpJsdoc2md(/*{ template: fs.readFileSync('./readme.hbs', 'utf8') }*/))
   .pipe(rename({
      basename: "DOCS",
      extname: ".md"
    }))
   .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
  gulp.watch(paths.js, ['uglify']);
});
