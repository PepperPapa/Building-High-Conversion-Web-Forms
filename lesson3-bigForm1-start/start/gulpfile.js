var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task("default", ['serve', 'lint', 'styles']);

// just write reference code here for later using
// gulp.task('tests', function () {
//   return gulp.src('spec/test.js')
//             .pipe(jasmine());
// });

gulp.task('lint', function () {
  return gulp.src(['js/**/*.js', '!node_modules/**'])
          .pipe(eslint())
          .pipe(eslint.format())
          .pipe(eslint.failAfterError());
});

gulp.task('serve', function() {
  // place code for your default task here
  browserSync.init({
    server: "./"
  });

  gulp.watch("sass/**/*.sccs", ["styles"]);
  gulp.watch("css/*.css").on("change", reload);
  // gulp.watch("index.html", ['copy-html']);
  // gulp.watch("images/*", ['copy-images']);
  gulp.watch("*.html").on("change", reload);
  // gulp.watch("js/**/*.js").on("change", ['lint']);
});

gulp.task('styles', function() {
  gulp.src('./sass/**/*.scss')
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream());
});

// gulp.task('copy-html', function() {
//   gulp.src('./index.html')
//       .pipe(gulp.dest('./dist'));
// });
//
// gulp.task('copy-images', function() {
//   gulp.src('images/*')
//       .pipe(gulp.dest('dist/images'));
// });

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['styles']);
});

// gulp.task("scripts", function () {
//   gulp.src("js/**/*.js")
//       .pipe(concat("all.js"))
//       .pipe(uglify())
//       .pipe(gulp.dest("dist/js"));
// });
//
// gulp.task("scripts-dist", function () {
//   gulp.src("js/**/*.js")
//       .pipe(concat("all.js"))
//       .pipe(uglify())
//       .pipe(gulp.dest("dist/js"));
// });
