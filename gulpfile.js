const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('static-server', () => {
  browserSync.init(null, {
    proxy: 'http://localhost:8080',
  });
});

gulp.task('default', ['static-server']);