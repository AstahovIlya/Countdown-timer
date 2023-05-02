'use strict';

const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function compScss() {
   return src('src/scss/style.scss')
      .pipe(sass())
      .pipe(dest('./'));
};

exports.default = function () {
   watch('src/scss/*.scss', compScss)
}