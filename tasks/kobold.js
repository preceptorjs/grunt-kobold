'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');

module.exports = function (grunt) {

	grunt.registerMultiTask('kobold', 'Grunt plugin for Kobold', function () {

		var options,
			done,
			tmpPath,
			args,
			koboldPath,
			childProc;

		// Mark task as async
		done = this.async();

		// Get rule-book options
		options = this.options();

		// Get arguments for Mocha
		args = options.mochaArgs || [];

		// Add config file if config is given
		if (options.config) {

			// Get temp-file
			tmpPath = path.join(os.tmpdir(), +(new Date()) + '.json');

			try {

				// Write options to tmp-file
				fs.writeFileSync(tmpPath, JSON.stringify(options.config, null, 4));

				// Add config file
				args.push('--config');
				args.push(tmpPath);

			} catch (err) {
				tmpPath = null;
				console.error(err.stack);
			}
		}

		// Get other options
		if (options.approvedFolder) {
			args.push('--approved-folder');
			args.push(options.approvedFolder);
		}
		if (options.buildFolder) {
			args.push('--build-folder');
			args.push(options.buildFolder);
		}
		if (options.highlightFolder) {
			args.push('--highlight-folder');
			args.push(options.highlightFolder);
		}
		if (options.configFolder) {
			args.push('--config-folder');
			args.push(options.configFolder);
		}

		if (options.failOrphans) {
			args.push('--fail-orphans');
		}
		if (options.failAdditions) {
			args.push('--fail-additions');
		}

		// Test-path
		args.push(options.testPath || process.cwd());

		// Get path to kobold
		koboldPath = path.resolve(path.join(__dirname, '..', 'node_modules', 'kobold', 'bin', 'kobold'));

		// Fork Kobold
		childProc = childProcess.fork(koboldPath, args);
		childProc.on('close', function (code) {
			if (tmpPath) {
				try {
					fs.unlinkSync(tmpPath);
				} catch (err) {
					console.error(err.stack);
				}
			}
			done(code === 0);
		});
	});
};
