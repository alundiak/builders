var gulp = require('gulp');

var scsslint1 = require('gulp-scss-lint');
// https://github.com/juanfran/gulp-scss-lint

var scsslint2 = require('gulp-scsslint');
// https://github.com/noahmiller/gulp-scsslint

// Both plugins require Ruby and [scss-lint](https://github.com/brigade/scss-lint) =>
// `gem update --system`
// `gem install scss_lint`


// WORKS: https://github.com/juanfran/gulp-scss-lint
gulp.task('scss-lint-1', function () {
    gulp.src('styles/*.{scss,sass}')
        .pipe(scsslint1({
            // 'bundleExec': false, // - default.
            'config': '.scss-lint.yml',
        }));
});

// WORKS https://github.com/noahmiller/gulp-scsslint
gulp.task('scss-lint-2', function () {
    gulp.src('styles/*.{scss,sass}')
        .pipe(scsslint2({
            'config': '.scss-lint.yml'
        }))
        .pipe(scsslint2.reporter());
});

gulp.task('default', function () {
    // place code for your default task here
});
