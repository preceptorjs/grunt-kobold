var expect = require('chai').expect;
var sinon = require('sinon');

var fs = require('fs');
var path = require('path');

var optionsFn = require('../lib/options');

describe('Paths', function () {

	it('should return a temp path', function () {
		var pathDir = optionsFn.getTmpDir();
		expect(pathDir).to.a('string');
	});

	it('should return the Kobold path', function () {
		var pathDir = optionsFn.getKoboldPath();
		expect(pathDir).to.a('string');
	});
});

describe('Options', function () {

	beforeEach(function () {
		this.sandbox = sinon.sandbox.create();

		this.sandbox.stub(optionsFn, 'getTmpDir', function () { return __dirname; });
		this.sandbox.stub(optionsFn, 'getKoboldPath', function () { return 'kobold'; });
	});

	afterEach(function () {
		this.sandbox.restore();
	});

	describe('TempConfig', function () {

		it('should not have a tempPath', function () {
			expect(optionsFn.tmpPath).to.be.null;
		});

		it('should create a temp file', function () {

			var options = { test: 23 },
				data,
				filePath;

			optionsFn.createTempConfig(options);
			filePath = optionsFn.tmpPath;
			optionsFn.tmpPath = null;

			expect(filePath).to.be.not.null;
			expect(fs.existsSync(filePath)).to.be.true;

			data = fs.readFileSync(filePath).toString();
			data = JSON.parse(data);
			expect(data).to.be.deep.equal(options);

			fs.unlinkSync(filePath);
		});

		it('should not remove undefined temp file', function () {
			optionsFn.removeTempConfig();
		});

		it('should remove the temp file', function () {

			var filePath;

			optionsFn.tmpPath = path.join(__dirname, 'test.json');
			filePath = optionsFn.tmpPath;
			fs.writeFileSync(filePath, 'test');

			optionsFn.removeTempConfig();

			expect(fs.existsSync(filePath)).to.be.false;
		});
	});

	describe('buildKoboldArguments', function () {

		beforeEach(function () {
			this.sandbox.stub(optionsFn, 'createTempConfig');
		});

		afterEach(function () {
			optionsFn.tmpPath = null;
		});

		it('should have one argument', function () {
			var args;

			args = optionsFn.buildKoboldArguments({});

			expect(args).to.have.length(1);
		});

		it('should ignore failed tmp-file creation', function () {
			var args;

			args = optionsFn.buildKoboldArguments({ config: {} });

			expect(args).to.have.length(1);
		});

		it('should list tmp-file as args', function () {
			var args;

			optionsFn.tmpPath = '/tmp/1324.json';
			args = optionsFn.buildKoboldArguments({ config: {} });

			expect(args).to.have.length(3);
		});

		it('should have all the arguments', function () {
			var args, options, expected;

			options = {
				mochaArgs: ['--slow', '50000'],

				config: {},

				approvedFolder: 'approved',
				buildFolder: 'build',
				highlightFolder: 'highlight',
				configFolder: 'config',

				failOrphans: true,
				failAdditions: true,

				testPath: __dirname
			};

			optionsFn.tmpPath = '/tmp/1324.json';

			expected = [
				'--slow', '50000',
				'--config', optionsFn.tmpPath,
				'--approved-folder', 'approved',
				'--build-folder', 'build',
				'--highlight-folder', 'highlight',
				'--config-folder', 'config',
				'--fail-orphans',
				'--fail-additions',
				__dirname
			];

			args = optionsFn.buildKoboldArguments(options);

			expect(args).to.be.deep.equal(expected);
		});
	});
});
