# JavaScript Build Tools Collection
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![Travis](https://img.shields.io/travis/joyent/node.svg)](https://github.com/alundiak/builders)
[![Jenkins](https://img.shields.io/jenkins/s/https/jenkins.qa.ubuntu.com/precise-desktop-amd64_default.svg)](https://github.com/alundiak/builders)
[![Coverity Scan](https://img.shields.io/coverity/scan/3997.svg)](https://github.com/alundiak/builders)

[![Downloads](https://img.shields.io/npm/dm/builders)](https://github.com/alundiak/builders)
[![Releases](https://img.shields.io/github/downloads/alundiak/builders/total)](https://github.com/alundiak/builders)


[![node](https://img.shields.io/node/v/gh-badges.svg)](https://github.com/alundiak/builders)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://github.com/alundiak/builders)
[![bower](https://img.shields.io/bower/v/bootstrap.svg)](https://github.com/alundiak/builders)

[![David](https://img.shields.io/david/alundiak/builders)](https://github.com/alundiak/builders)
[![David](https://img.shields.io/david/dev/alundiak/builders)](https://github.com/alundiak/builders)

[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Falundiak%2Fbuilders)](https://twitter.com?url=https%3A%2F%2Fgithub.com%2Falundiak%2Fbuilders)


Collection of well known build (bundling) tools examples:

* [Grunt.JS](http://gruntjs.com/)
* [Gulp.JS](http://gulpjs.com/)
* [Parcel](https://parceljs.org)
* [Rollup](https://rollupjs.org) #TODO
* [Webpack](https://webpack.js.org/) #TODO
* [Browserify](http://browserify.org/) #TODO
* [Brocolli](https://github.com/broccolijs/broccoli) #TODO
* [Brunch](http://brunch.io/) #TODO


## Node.JS
If u don't have **Node.JS** install it from [official website](http://nodejs.org).

Note: `init.sh` install many tools, but step-by-step is below.

## Global Ruby dependencies (optional for Grunt and Gulp setup)
If code relies on `grunt sass`, `grunt compass`, `grunt scsslint` tasks, those are based on Ruby parsing.
If u r not on Mac OS, Install Ruby from [official website](https://www.ruby-lang.org/en/).
If u r on Mac OS u may need just to upgrade Ruby and ruby-gems.
In both cases, u have then to install:

```
gem install sass compass
```

But. May-2021:

```
Ruby Sass has reached end-of-life and should no longer be used.

* If you use Sass as a command-line tool, we recommend using Dart Sass, the new
  primary implementation: https://sass-lang.com/install

* If you use Sass as a plug-in for a Ruby web framework, we recommend using the
  sassc gem: https://github.com/sass/sassc-ruby#readme

* For more details, please refer to the Sass blog:
  https://sass-lang.com/blog/posts/7828841

```

Note: Bootstrap v5 has already migrated to Dart Sass. So it seems to be a trend.
So maybe it's time for me to upgrade to https://github.com/sass/dart-sass


```
#sudo gem install scss-lint
sudo gem install scss_lint
```

> WARNING: `scss-lint` has been renamed to `scss_lint` to follow proper RubyGems naming conventions. Update your Gemfile or relevant install scripts to install `scss_lint`.


So final output:

```
Fetching rainbow-2.2.2.gem
Fetching sass-3.4.25.gem
Fetching scss-lint-0.38.0.gem
Successfully installed sass-3.4.25
Building native extensions. This could take a while...
Successfully installed rainbow-2.2.2
scss-lint's executable "scss-lint" conflicts with scss_lint
Overwrite the executable? [yN]  y
WARNING: `scss-lint` has been renamed to `scss_lint` to follow proper RubyGems naming conventions. Update your Gemfile or relevant install scripts to install `scss_lint`.
```


## Grunt setup

**Global dependencies**:

```
npm install -g grunt-cli bower
```

**Local dependencies**:

```
npm install --force && bower install
npm run build
```
Notes:
- For more npm/grunt commands, look to `Gruntfile.js`.
- Due to the fact, that Grunt was popular in 2016-2017 year, and 2020-2021 it becomes rather not famous, many contrib packages are either outdated or at least upgraded to Grunt v1.x. So need for full installation need to use `--force` or `--legacy-peer-deps`. `npm audit` shows many warnings, but I am not sure it make sense to upgrade.
- Not sure if `node-sass` v4.x installation has been failing in May-2021, but v6.x seems to be OK.
- Not sure why but `node-sass-middleware` v0.11.0 is failing (node -v v16.1.0, node-gyp -v v3.8.0).
- https://timonweb.com/javascript/how-to-fix-referenceerror-primordials-is-not-defined-error/
    >gulp v3 doesn't work (as of now) under node v12, because it depends on graceful-fs@^3.0.0 which patches Node's fs module and that patch worked before node v12 just fine.

**Git Hooks related to Grunt setup**:

Inside of folder `/Users/{user}/prj/builders/.git/hooks` added code for th `pre-commit` hook. It blocks `git commit`.


## Gulp setup

**Global dependencies**:

```
npm install -g gulp
```

**Local dependencies**:

```
cd _gulp_setup
npm install
npm run build1
npm run build2
```



## Crom setup

I remember initially, that was somehow popular. Created by same author of D3.js - https://github.com/mbostock/crom
But now this repo is NOT available.
Other repos: https://github.com/mbostock/crom-test-bar, https://github.com/mbostock/crom-test-foo

```
cd _crom_setup

```

## Parcel setup

```
npm install -g parcel-bundler
cd _parcel_setup
npm install
npm run build
```

And navigate to http://localhost:1234/

FYI:
- https://parceljs.org/getting_started.html


## Rollup setup

```
npm install -g rollup
cd _rollup_setup
npm run build
```

FYI:
- https://github.com/rollup/rollup-starter-project


## Webpack setup

```
cd _webpack_setup

```

## To Read

* http://www.slideshare.net/landike/grunt-delicious
* http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt/
* https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4
* http://www.walkercoderanger.com/blog/2015/06/state-of-js-build-tools-2015
* http://www.smashingmagazine.com/2014/06/11/building-with-gulp/
* https://medium.freecodecamp.org/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8

## Inspired

By Automatization, CLI, shell scripting and Grunt.JS.

## Similar repos:

* https://github.com/vigetlabs/blendid

## Author
Andrii Lundiak aka [![landike](https://img.shields.io/twitter/follow/landike?style=social)](https://twitter.com/landike)

## License
Free