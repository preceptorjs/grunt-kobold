'use strict';

var childProcess = require('child_process');

var optionsFn = require('../lib/options');

module.exports = function (grunt) {

	grunt.registerMultiTask('kobold', 'Grunt plugin for Kobold', function () {

		var done,
			childProc;

		// Mark task as async
		done = this.async();

		// Fork Kobold
		childProc = childProcess.fork(
			optionsFn.getKoboldPath(),
			optionsFn.buildKoboldArguments(this.options())
		);
		childProc.on('close', function (code) {
			optionsFn.removeTempConfig();
			done(code === 0);
		});
	});
};
