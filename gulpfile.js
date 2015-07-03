var gulp = require('gulp');
var scsslint1 = require('gulp-scss-lint');
var scsslint2 = require('gulp-scsslint');


// WORKS: https://github.com/juanfran/gulp-scss-lint
gulp.task('scss-lint', function() {
    gulp.src('styles/*.{scss,sass}')
        .pipe(scsslint1({
            // 'bundleExec': false, // - default.
            'config': '.scss-lint.yml',
        }));
});

// WORKS https://github.com/noahmiller/gulp-scsslint
gulp.task('scss-lint-2', function() {
    gulp.src('styles/*.{scss,sass}')
        .pipe(scsslint2({
        	'config': '.scss-lint.yml'
        }))
        .pipe(scsslint2.reporter());
});

gulp.task('default', function() {
    // place code for your default task here
});
