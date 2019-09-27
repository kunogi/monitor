let gulp = require('gulp');
let rename = require('gulp-rename');

// js编译
// var jshint = require("gulp-jshint"),
let uglify = require('gulp-uglify');
let chinese2unicode = require('jy-gulp-chinese2unicode');

// JS解析
gulp.task('js', function() {
    return gulp.src('build/*.js')
        //代码检测
        // .pipe(eshint())
        // .pipe(jshint.reporter('YOUR_REPORTER_HERE'))
        // .pipe(rename({
        //     suffix: '_min'
        // }))
        .pipe(uglify())
        .pipe(chinese2unicode())
        .pipe(gulp.dest('dist/js'));
});

// 执行配置
gulp.task('default', ['watch', 'js']);

// 监听变化
gulp.task('watch', function() {
    gulp.watch('build/*.js', ['js']);
});
