var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

gulp.task("default", ["serve", "watch"]);

gulp.task("serve", function () {
  browserSync.init({
    server: "./"
  });
});

gulp.task("watch", function () {
  gulp.watch("*.html").on("change", reload);
  gulp.watch("css/*.css").on("change", reload);
  gulp.watch("js/main.js").on("change", reload);
});
