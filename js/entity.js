/*

## entity.js

Implements basic entities

*/

(function(global) {

	global.Entity = new Class({
		Implements: [Options, Events],

		options: {

			// Strings
			name: "",
			description: "",
			succ: "",
			osucc: "",
			fail: "",
			ofail: "",

			// IDs
			selfID: -1,
			homeID: -1,
			ownerID: -1,
			containerID: -1,
			contents: [],

			// Flags
			dark: false,
			link_ok: false,
			sticky: false,
			wizard: false
		},

		initialize: function(options) {
			this.setOptions(options);

			Object.each(this.options, function(item, key) {
				this[key] = item;
			}, this);
		}
	});

})(this);
