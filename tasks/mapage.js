module.exports = function (grunt) {
	// grunt includes copy of underscore library: 
	// node_modules/grunt/node_modules/underscore.string/dist/underscore.string.min.js
	var _ = grunt.util._; // lodash

	// parameter target is a configuration object from Gruntfile.js: mapage.dev in our case
	grunt.registerTask('mapage', 'generates a page html file for us lazy :)', function (target) {

		// define needed variables
		var context, targetConfig, template;

		// we may need to use target.
		target == target || 'create';

		this.requiresConfig('mapage.'+target); 
		
		targetConfig = grunt.config.get('mapage.'+target);
		template = grunt.file.read( targetConfig.templateUrl );
		context = targetConfig.context;

		grunt.file.write(targetConfig.dest, _.template(template, context));
		grunt.log.writeln('HTML written to ' + targetConfig.dest);

		//Grunt.JS is really nice tool :)
	});
};