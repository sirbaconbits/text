/*

## Environment.js

This implements the "environment" class which contains, well, the environment.

*/

(function(global) {

	global.Environment = new Class({
		Implements: [Events, Options],

		options: {},

		initialize: function(options) {
			this.setOptions(options);

			// Meh.
		},

		new: function(options) {
			console.log("Yay!");
		},

		env: []

	});

})(this);
