var gulp        = require('gulp');
var del         = require("del");

gulp.task("clean", () =>  {
    return del([ "lib/*", "index.d.ts", "index.js", "index.js.map" ])
});