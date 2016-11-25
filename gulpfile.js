var gulp = require("gulp");
var babel = require('gulp-babel');
var ts = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject("tsconfig.json");
var paths = {
    pages: ['src/public/**']
};

gulp.task("copy-public", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist/public"));
});

gulp.task("default", ["copy-public"], function () {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(babel({
            plugins: ['babel-plugin-transform-runtime'].map(require.resolve),
            presets: ['babel-preset-es2015'].map(require.resolve)
        })).pipe(sourcemaps.write('.')).pipe(gulp.dest("dist"));
});

gulp.task("heroku:production", ["default"]);
gulp.task("heroku:", ["default"]);