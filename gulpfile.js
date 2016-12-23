const gulp = require('gulp');
const rename = require('gulp-rename');
// const fs = require('fs'),
const gutil = require('gulp-util');
const gulpJsdoc2md = require('gulp-jsdoc-to-markdown');
const uglify = require('gulp-uglify');
const paths = {
        js: ['./src/$array.js']
      };
const babel = require('gulp-babel');
const run = require('gulp-run');

gulp.task('default', ['docs','js']);

gulp.task('js', function(){
  return gulp.src(paths.js)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify({
      output: {
        comments: /^!|@preserve|@license|@cc_on/i
      }
    }))
    .pipe(rename({
      extname:'.min.js'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('docs', function () {
 return gulp.src(paths.js)
   .pipe(gulpJsdoc2md({
     //private:true,
     'name-format': 'dklvnnsl'
   }))
   .pipe(rename('DOCS.md'))
   .pipe(gulp.dest('./'));
});

gulp.task('serve', function(){
  //run('http-server').exec();
  gulp.watch(paths.js, ['js']);
});
