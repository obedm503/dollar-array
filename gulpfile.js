const gulp = require('gulp');
const rename = require('gulp-rename');
const gulpJsdoc2md = require('gulp-jsdoc-to-markdown');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const paths = {
        js: ['./src/$array.js']
      };

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
     //'name-format': 'backtick'
   }))
   .pipe(rename('DOCS.md'))
   .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
  gulp.watch(paths.js, ['docs','js']);
});
