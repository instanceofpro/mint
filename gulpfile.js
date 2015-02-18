var gulp = require('gulp');
var pkg = require('./package.json');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var template = require('gulp-template');
var mocha = require('gulp-mocha');
var buffer = require('vinyl-buffer');
var cfg = {
    src: './src/*.js',
    dest: './build/',
    tmp: './tmp/',
    specs: './tests/*.spec.js'
};

gulp.task('browserify', function () {
    var bundlify = function (src) {
        src.forEach(function (item) {
            browserify('./src/' + item + '.js', { standalone: item })
                .transform(babelify)
                .bundle()
                .pipe(source(item + '.js'))
                .pipe(buffer())
                .pipe(rename({ suffix: '.min' }))
                .pipe(uglify())
                .pipe(gulp.dest('./build/'));
        });
    };

    bundlify(['is', 'ob', 'dt', 'fn', 'rn', 'st', 'to']);
});

gulp.task('jscs', function () {
    return gulp.src(cfg.src)
        .pipe(jscs());
});

gulp.task('hint', function () {
    return gulp.src(cfg.src)
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('tests', function () {
    return gulp.src(cfg.specs, { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('uglify', function () {
    return gulp.src('./build/*.js')
        .pipe(template({ version: pkg.version }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('build/min'));
});

gulp.task('default', ['jscs', 'hint', 'browserify']);