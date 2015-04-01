var path = require('path');

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		kobold: {
			aTask: {
				options: {
					config: require('./config.js')
				}
			}
		}
	});

	// Load local tasks.
	grunt.loadTasks(path.join(__dirname, '..', 'tasks'));

	// Default task.
	grunt.registerTask('default', 'kobold');
};
