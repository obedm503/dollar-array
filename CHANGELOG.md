# $arrayJS Changelog

All notable changes to this project will be documented in this file.
For some guidelines see [keepachangelog.com](https://keepachangelog.com/).

----
## Future
### New
- when ES6 support is wide, rewrite into `class $array extends Array` syntax

### Fix
- ...

----
## 2.0.2 - 2017-01-05
### New
- rewritten in ES6 modules
- using jspm & Systemjs for bundling and babel for transpiling
- exports a `$array` global as well as [UMD](https://github.com/umdjs/umd) "`require('dollar-array').$array`"
- `dist` files have source maps
- removed gulp, gulp-rename, gulp-babel, gulp-jsdoc-to-markdown, gulp-uglify, gulp-util dev-dependencies

----
## 2.0.1 - 2016-12-25
### Fixed
- renamed `$array.js` file to `dollar-array.js`
- renamed `$array.min.js` file to `dollar-array.min.js`

----
## 2.0.0 - 2016-12-24
### Added
- dollar-array is now a node module
- huge api changes, check the [docs](https://obedm503.github.io/bootmark/?fetch=https://obedm503.github.io/dollar-array/DOCS.md) for that. for example ``.reverse`` was renamed to ``.invert`` so to not conflict with the native ``.reverse`` method.
- created a ``test.js`` to test $arrayJS with node
- rewrote $arrayJS as object oriented code
- `$array`s inherit from `Array.prototype`
- most changes were made to better performance
- `convertToObject` was renamed to `toObject`
- `groupObjects` was renamed to `group`
- source is now transpiled from ES6 to ES5 thanks to Babel
- `index.html` was rewritten to show documentation, demo, and Changelog in a single page
### Fixed
- module declaration pattern
- references: duplicate arrays are deep clones

----
## 1.1.0 - 2016-08-28
### Added
- changed package name from ``obedm503-array`` to ``dollar-array``
- now avilable as npm and bower packages

### Fixed
- ...
----
## 1.0.0 - 2016-08-21
### Added
- Initial publishing.

### Fixed
- the Internet
