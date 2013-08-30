/*

## entity.js

Implements basic entities

Depends on environment.js

*/

(function(global) {

	// {{{ Base entity class
	global.Environment.Entity = new Class({
		Implements: [Options, Events],

		options: {

			// Strings
			name: "",
			desc: "",
			succ: "",
			osuc: "",
			fail: "",
			ofai: "",

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
			wizard: false,
			exit: false,
			player: false
		},

		initialize: function(options) {
			this.setOptions(options);

			Object.each(this.options, function(item, key) {
				this[key] = item;
			}, this);
		},

		get: function(key) {
			return this.options[key];
		},

		set: function(key, value) {
			return this.options[key] = value;
		}
	}); // }}}


	//==-- BASIC ENTITIES

	// {{{ Object class
	global.Environment.Object = new Class({
		Extends: global.Environment.Entity,

		initialize: function(options) {
			this.parent(options);
		}
	}); // }}}

	// {{{ Room class
	global.Environment.Room = new Class({
		// Note: Room is just syntactic sugar. It's an object that you see from inside.
		Extends: global.Environment.Entity,

		initialize: function(options) {
			this.parent(options);
		}
	}); // }}}

	// {{{ Exit class
	global.Environment.Exit = new Class({
		Extends: global.Environment.Entity,

		initialize: function(options) {
			this.parent(options);
			this.options.exit = true;
		}
	}); // }}}

	// {{{ Player class
	global.Environment.Player = new Class({
		Extends: global.Environment.Entity,

		initialize: function(options) {
			this.parent(options);
			this.options.player = true;
		}
	}); // }}}

})(this);
