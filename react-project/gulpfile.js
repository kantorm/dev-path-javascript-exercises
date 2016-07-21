var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
    return browserify({
            entries: './views/splited.jsx',
            extensions: ['.jsx'],
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015', 'react', 'stage-0']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('views'))
});

gulp.task('watch', ['build'], function() {
    gulp.watch('*.jsx', ['build']);
});

gulp.task('default', ['watch']);
