---
title: 'Shopify Development: Using Liquid syntax in Sass and compiling with Gulp'
date: 2020-07-15
tags:
  - Sass
  - Liquid
  - Shopify
  - Gulp
---

Recently a friend was having trouble getting Sass to compile when the Sass file contains Liquid variables. I thought I'd distill what we learned, especially because we didn't find anything that clearly described how to use Liquid statements in Sass.

Using [Sass interpolation](https://sass-lang.com/documentation/interpolation) you can easily add Liquid variables.

_sass/main.scss_

```scss
h1 {
	color: #{'"{{ header_color }}"'};
}
```

To add Liquid expressions, add them inside comments. (Note: This relies on a particular Gulp setting, described below in **Gulp Setup**)

_sass/main.scss_

```scss
/* {% assign header_color = '#7ab55c' %} */
h1 {
	color: #{'"{{ header_color }}"'};
}
```

Using Gulp, this will compile to the following (Liquid ignores CSS/Sass comment syntax).

_assets/theme.scss.Liquid_

```scss
/* {% assign header_color = '#7ab55c' %} */
h1 {
  color: {{ header_color }};
}
```

Here's another example using Sass variables.

_sass/main.scss_

```scss
$primary-color-brighter: calc(#{'"{{ "#7ab55c" | color_brightness }}"'} / 100);

p {
	color: $primary-color-brighter;
}
```

### Gulp Setup

To setup Gulp to properly compile your Sass with Liquid variables and expressions, run the following commands to install the necessary packages first.

```
npm init
npm install gulp gulp-autoprefixer gulp-rename gulp-replace gulp-sass
```

`gulp-autoprefixer` to add vendor prefixes to your CSS

`gulp-sass` to compile your .scss file to CSS

`gulp-rename` to easily rename your .scss file to a .liquid file

`gulp-replace` to replace strings in your sass

Next create a file called `gulpfile.js` in the root of your project. In this file is where you will setup the plumbing to process your Sass file.

_gulpfile.js_

```js
var gulp = require('gulp');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

gulp.task('sass', function () {
	return (
		gulp
			// the directory where your Sass files lives
			.src('./sass/main.scss')
			.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
			// to add vendoer prefixes
			.pipe(autoprefixer())
			// rename our output to a .liquid file
			.pipe(rename('theme.scss.liquid'))
			// to get rid of the double quotes inside the single quotes
			.pipe(replace('"{{', '{{'))
			.pipe(replace('}}"', '}}'))
			// determines our output directory
			.pipe(gulp.dest('./assets/'))
	);
});

gulp.task('default', function () {
	gulp.watch(['./sass/**/*.scss'], gulp.series(['sass']));
});
```

This entire file is important, but one particular line I want to point out is line 11. Make sure the `outputStyle` is set to something other than `compressed`, otherwise your Sass comments will be stripped from the compiled code and your Liquid variables won't work.

You can find the available options for `gulp-sass` [here](https://github.com/sass/node-sass).

Now, to compile your Sass on the fly, just run `gulp`. As you make changes, you should see the compiled code outputted to `/assets/theme.scss.liquid`. Any errors will be logged to the console with a description and line number.

**Bonus:** if you want to avoid the CSS comment syntax from ending up in your `.liquid` file, you can chain these two `.replace` methods to your existing Gulp config.

```js
.pipe(replace('/*', ""))
.pipe(replace('*/', ""))
```
