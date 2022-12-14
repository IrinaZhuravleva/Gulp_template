const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require('browser-sync').create();
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const del = require('del');
const pug = require('gulp-pug');
const notify = require('gulp-notify');

function styles() {
    return src(['node_modules/slick-carousel/slick/slick.scss',
        'app/scss/style.scss'])
      .pipe(scss({ outputStyle: "compressed" }))
      .pipe(concat('style.min.css'))
      .pipe(
        autoprefixer({
          overrideBrowserslist: ['last 10 version'],
          grid: true
        //   https://help-dev.ru/frontend/css-grid-in-ie11.html
        })
      )
      .pipe(dest('app/css'))
      .pipe(browserSync.stream());
}

function runPug() {
    return src(['app/pug/**/*.pug','!app/pug/**/_*.pug'])
        .pipe(pug({pretty: true}))
        .on("error", notify.onError())
        .pipe(dest('app/'))
}

function cleanDist() {
  return del('dist')
}

function images() {
    return src('app/images/**/*')
      .pipe(imagemin(
        [
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [
              { removeViewBox: true },
              { cleanupIDs: false }
            ]
          })
        ]
      ))
      .pipe(dest('dist/images'))
}

function build() {
    return src([
      'app/css/style.min.css',
      'app/fonts/**/*',
      'app/js/main.min.js',
      'app/*.html'
    ], {base: 'app'})
        .pipe(dest('dist'))
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}

function scripts() {
    return src(["node_modules/jquery/dist/jquery.js",
        "node_modules/slick-carousel/slick/slick.js",
        "app/js/main.js"])
      .pipe(concat("main.min.js"))
      .pipe(uglify())
      .pipe(dest("app/js"))
      .pipe(browserSync.stream());
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/pug/**/*.pug'], runPug);

    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;

exports.images = images;
exports.runPug = runPug;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, runPug, browsersync, watching);