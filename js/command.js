/*

## command.js

Implements the command environment.

*/

(function(global) {

	global.Command = new Class({
		Implements: [Options, Events],

		options: {},

		initialize: function(options) {
			this.setOptions(options);

			this.exec = this.options.exec;
			this.context = this.options.context;
		},

		exec: function() {}
	});

	global.CommEnv = new Class({
		Implements: [Events],

		initialize: function(commands) {
			Object.each(commands, function(item, key) {
				this.newCommand(key, item, "global");
			}, this);
		},

		newCommand: function(command, func, context) {
			this.commands[command] = new Command({
				name: command,
				exec: func,
				context: context
			});
		},

		rmCommand: function(command) {
			delete this.commands[command];
		},

		commands: {},
		commandcontexts: {},

		exec: function(command) {
			// This needs to be reworked to deal with context
			if (this.commands[command]) {
				this.commands[command].exec();
			}
		}
	});

})(this);
