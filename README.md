Grunt-Kobold
===============

Grunt plugin for Kobold


[![Build Status](https://img.shields.io/travis/preceptorjs/grunt-kobold.svg)](http://travis-ci.org/preceptorjs/grunt-kobold)
[![Coveralls Coverage](https://img.shields.io/coveralls/preceptorjs/grunt-kobold.svg)](https://coveralls.io/r/preceptorjs/grunt-kobold)
[![Code Climate Grade](https://img.shields.io/codeclimate/github/preceptorjs/grunt-kobold.svg)](https://codeclimate.com/github/preceptorjs/grunt-kobold)

[![NPM Version](https://badge.fury.io/js/grunt-kobold.svg)](https://www.npmjs.com/package/grunt-kobold)
[![NPM License](https://img.shields.io/npm/l/grunt-kobold.svg)](https://www.npmjs.com/package/grunt-kobold)

[![NPM](https://nodei.co/npm/grunt-kobold.png?downloads=true&stars=true)](https://www.npmjs.com/package/grunt-kobold)
[![NPM](https://nodei.co/npm-dl/grunt-kobold.png?months=3&height=2)](https://www.npmjs.com/package/grunt-kobold)

[![Coverage Report](https://img.shields.io/badge/Coverage_Report-Available-blue.svg)](http://preceptorjs.github.io/grunt-kobold/coverage/lcov-report/)

[![Gitter Support](https://img.shields.io/badge/Support-Gitter_IM-yellow.svg)](https://gitter.im/preceptorjs/support)


**Table of Contents**
* [Installation](#installation)
* [Getting Started](#getting-started)
* [The "kobold" Task](#the-kobold-task)
    * [Overview](#overview)
    * [Options](#options)
    * [Usage Examples](#usage-examples)
* [Third-party libraries](#third-party-libraries)
* [License](#license)


##Installation

Install this module with the following command:
```shell
npm install grunt-kobold
```

Add the module to your ```package.json``` dependencies:
```shell
npm install --save grunt-kobold
```
Add the module to your ```package.json``` dev-dependencies:
```shell
npm install --save-dev grunt-kobold
```

This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.


## Getting Started

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-kobold');
```

## The "kobold" task

### Overview
In your project's Gruntfile, add a section named `kobold` to the data object passed into `grunt.initConfig()`.

```javascript
grunt.initConfig({
	kobold: {
		your_target: {
			// Target-specific Kobold options go here.
		},
	},
})
```


### Options

#### options.config
Type: `Object` --optional--

Options that would be otherwise in the global config file. 
You can also require the js or json file instead of adding here all the configurations.

#### options.mochaArgs
Type: `String[]` --optional--

List of Mocha arguments that will be passed-through.

#### options.approvedFolder
Type: `String` --optional-- (default: 'approved')

Name of the approved folder where Images are defined as approved and how the build images should look like. This can also be the path to a folder.

#### options.buildFolder
Type: `String` --optional-- (default: 'build')

Name of the build folder that holds the most recent build images, taken to be compared to the approved images. This can also be the path to a folder.

#### options.highlightFolder
Type: `String` --optional-- (default: 'highlight')

Name of the highlight folder that will be used as the result folder, showing all the differences found during visual regression tests. This can also be the path to a folder.

#### options.configFolder
Type: `String` --optional-- (default: 'config')

Name of the config folder that describes image specific configurations the overwrite global configuration options that were given with the ```config``` property above. This can also be the path to a folder.

#### options.failOrphans
Type: `Boolean` --optional-- (default: false)

Defines if a test should fail when a previously approved images is missing from the current build images. This might happen if not all the screenshots could be taken due to an error, or it might simply be removed from the test-cases.

#### options.failAdditions
Type: `Boolean` --optional-- (default: false)

Defines if a test should fail when a previously unseen image appears in the build images. You might want to fail these tests to manually approve them; if they are not approved, then they will never be really compared.

#### options.testPath
Type: `String` --optional-- (default: current working directory)

Path to directory holding all the test-folders (i.e. ```approved```, ```build```, ```highlight```, and ```config```).

### Usage Examples

#### Default Options

You can supply the configuration in the options object of a task:

```javascript
grunt.initConfig({
	kobold: {
		ci: {
			options: {
				config: require('./config.js')
			}
		}
	}
})
```

#### Inline Options 

You can supply the configuration inline in the options object of a task:

```javascript
grunt.initConfig({
	kobold: {
		ci: {
			options: {
				config: {
					"outputBackgroundGreen": 255
				}
			}
		}
	}
})
```

Here another example, but with more options:

```javascript
grunt.initConfig({

	kobold: {
  
		ci: {
			options: {
				config: {
					"outputBackgroundGreen": 255
				},
				
				highlightFolder: "result",
				
				failOrphans: true,
				failAdditions: true
			}
		}
	}
})
```

##Third-party libraries

The following third-party libraries are used by this module:

###Dependencies
* kobold: [https://github.com/yahoo/kobold](https://github.com/yahoo/kobold)

###Dev-Dependencies
* grunt: [http://gruntjs.com](http://gruntjs.com)
* chai: [http://chaijs.com](http://chaijs.com)
* codeclimate-test-reporter: [https://github.com/codeclimate/javascript-test-reporter](https://github.com/codeclimate/javascript-test-reporter)
* coveralls: [https://github.com/cainus/node-coveralls](https://github.com/cainus/node-coveralls)
* istanbul: [https://github.com/gotwarlost/istanbul](https://github.com/gotwarlost/istanbul)
* mocha: [https://github.com/visionmedia/mocha](https://github.com/visionmedia/mocha)
* sinon: [http://sinonjs.org](http://sinonjs.org)
* sinon-chai: [https://github.com/domenic/sinon-chai](https://github.com/domenic/sinon-chai)
* yuidocjs: [https://github.com/yui/yuidoc](https://github.com/yui/yuidoc)

##License

The MIT License

Copyright 2015 Marcel Erz
