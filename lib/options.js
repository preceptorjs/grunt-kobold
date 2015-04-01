var os = require('os');
var fs = require('fs');
var path = require('path');

/**
 * Creates a temp configuration file
 *
 * @method createTempConfig
 * @param {object} config Configuration options
 */
var createTempConfig = function (config) {

	// Get temp-file
	optionsFn.tmpPath = path.join(os.tmpdir(), +(new Date()) + '.json');

	try {
		fs.writeFileSync(optionsFn.tmpPath, JSON.stringify(config, null, 4));
	} catch (err) {
		optionsFn.tmpPath = null;
		console.error(err.stack);
	}
};

/**
 * Removes the temp files for configuration
 *
 * @method removeTempConfig
 */
var removeTempConfig = function () {

	if (optionsFn.tmpPath) {

		try {
			fs.unlinkSync(optionsFn.tmpPath);
		} catch (err) {
			optionsFn.tmpPath = null;
			console.error(err.stack);
		}
	}
};

/**
 * Loads all Kobold arguments from the options
 *
 * @method buildKoboldArguments
 * @param {object} options Kobold image comparison options
 * @return {string[]} List of arguments for Kobold
 */
var buildKoboldArguments = function (options) {

	// Get arguments for Mocha
	var args = options.mochaArgs || [];

	// Add config file if config is given
	if (options.config) {

		// Create temp file for configuration
		optionsFn.createTempConfig(options.config);

		// Add config file
		if (optionsFn.tmpPath) {
			args.push('--config');
			args.push(optionsFn.tmpPath);
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

	return args;
};

/**
 * Gets the Kobold path
 *
 * @method getKoboldPath
 * @return {string} Path to the Kobold binary
 */
var getKoboldPath = function () {
	return path.resolve(path.join(__dirname, '..', 'node_modules', 'kobold', 'bin', 'kobold'));
};

/**
 * @static
 * @type {object}
 */
var optionsFn = {

	/**
	 * @property tmpPath
	 * @type {string|null}
	 */
	tmpPath: null,


	/**
	 * @property createTempConfig
	 * @type {function}
	 */
	createTempConfig: createTempConfig,

	/**
	 * @property removeTempConfig
	 * @type {function}
	 */
	removeTempConfig: removeTempConfig,


	/**
	 * @property buildKoboldArguments
	 * @type {function}
	 */
	buildKoboldArguments: buildKoboldArguments,


	/**
	 * @property getKoboldPath
	 * @type {function}
	 */
	getKoboldPath: getKoboldPath
};

module.exports = optionsFn;
