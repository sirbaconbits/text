/*

## environment.js

This implements the "environment" class which contains, well, the environment.

*/

(function(global) {

	// {{{ Environment class
	global.Environment = new Class({
		Implements: [Events, Options],

		options: {},

		initialize: function(options) {
			this.setOptions(options);

			// Meh.
		},

		get: function(id) {
			if (this.env[id]) {
				return this.env[id];
			} else {
				this.load(id);
				return this.env[id];
			}
		},

		create: function(options) {
			return new Environment[options.type](options);
		},

		load: function(id, callback, sc) {
			sc = sc || this.options.sc;

			sc.load(id, function(data) {
				this.env[id] = this.create(data);
			}.bind(this));
		},

		env: []
	}); // }}}

})(this);
