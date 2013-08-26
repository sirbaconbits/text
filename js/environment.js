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

		create: function(options) {
			return new Environment[options.type]();
		},

		load: function(id, sc) {
			sc = sc || this.options.sc;

			sc.load(id, function(data) {
				this.env[id] = this.create(data);
			}.bind(this));
		},

		env: []

	});

})(this);
