/**
 * Test environment setup
 */
(function() {

	// Setup config variables on test start
	QUnit.testStart(function() {

		var env = this.config.current.testEnvironment;

		// Capture Gillie.ajax arguments for comparison.
		// Adapted from Backbone tests: https://github.com/jashkenas/backbone/blob/master/test/environment.js#L23
		Gillie.ajax = function( settings ) {
			env.ajaxSettings = settings;
		}

	});

})();
