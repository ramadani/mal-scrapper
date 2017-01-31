var gulp = require('gulp');
var shell = require('gulp-shell');
var run = require('run-sequence');
var rimraf = require('rimraf');
var watch = require('gulp-watch');
var server = require('gulp-live-server');

var paths = {
    src: ['./src/**/*.js'],
    compiled: ['./app/**/*.js'],
    destination: './app'
};

gulp.task('default', function (cb) {
    run('server', 'build', 'watch', cb);
});

gulp.task('init', shell.task([
    'babel src --out-dir app'
]));

gulp.task('build', function (cb) {
    run('restart', cb);
});

gulp.task('clean', function (cb) {
    rimraf(paths.destination, cb);
});

var app;

gulp.task('server', function () {
    app = server.new(paths.destination);
});

gulp.task('restart', function () {
    app.start.bind(app)();
});

gulp.task('watch', function () {
    return watch(paths.compiled, function () {
        gulp.start('build');
    });
});

gulp.task('babel', shell.task([
    'babel src --watch --out-dir app'
]));
