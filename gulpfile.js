// Initialize modules

const { src, dest, watch, series } = require("gulp"); /// gulp is a toolkit that helps you automate painful or time-consuming tasks in your development workflow
const sass = require("gulp-sass")(require("sass")); /// gulp-sass is a tool that helps compile Sass to CSS
const browserSync = require("browser-sync").create(); /// browser-sync is a tool that helps synchronize code changes and interactions across multiple devices
const postcss = require("gulp-postcss"); /// postcss is a tool for transforming CSS with JavaScript plugins
const autoprefixer = require("autoprefixer"); /// autoprefixer is a plugin for PostCSS that helps add vendor prefixes to your CSS
const cssnano = require("cssnano"); /// cssnano is a tool that helps optimize and compress your CSS files
const babel = require("gulp-babel"); /// gulp-babel is a tool that helps compile JavaScript ES6 to ES5
const terser = require("gulp-terser"); /// gulp-terser is a tool that helps minify JavaScript files

// Sass Task
function scssTask() {
  return src("app/scss/style.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("dist", { sourcemaps: "." }));
}

// JavaScript Task
function jsTask() {
  return src("app/js/script.js", { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest("dist", { sourcemaps: "." }));
}

// Browsersync
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: ".",
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("*.html", browserSyncReload);
  watch(
    ["app/scss/**/*.scss", "app/js/**/*.js"],
    series(scssTask, jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
