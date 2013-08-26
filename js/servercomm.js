/*

## servercomm.js



*/

(function(global) {

	global.ServerComm = new Class({
		Implements: [Events, Options],

		options: {},

		initialize: function(options) {
			this.setOptions(options);
		},

		load: function(id, callback) {
			var req = new Request({
				url: "/env/" + id,
				onSuccess: function(data) {
					data = JSON.parse(data);
					callback(data);
				}
			});

			req.send();
		}
	});

})(this);
