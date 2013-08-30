/*

## servercomm.js

Implements... server communication...

*/

(function(global) {

	// {{{ Main Class
	global.ServerComm = new Class({
		Implements: [Events, Options],

		options: {
			port: 9001
		},

		ws: {},

		initialize: function(options) {
			this.setOptions(options);
			this.ws.fn = ServerComm.wsfn;

			// Extract hostname just because
			var hostname = document.URL.split("/")[2];
			var n = hostname.lastIndexOf(":");
			hostname = hostname.substring(0, n != -1 ? n : hostname.length)

			// WEBSOCKETS!!!
			this.ws.sock = new WebSocket("ws://" + hostname + ":" + this.options.port + "/client");

			this.ws.sock.onopen = function() {
				console.log("Socket connected.");
			};

			this.ws.sock.onmessage = function(e) {
				console.log("Server: " + e.data)
				var d;
				try {
					d = JSON.parse(e.data);
				} catch (err) {
					console.log("WS ERROR: Bad JSON");
					return;
				}
				if (this.ws.fn[d.type]) {
					this.ws.fn[d.type](d, this.ws.sock);
				}
			}.bind(this);

			this.ws.sock.onclose = function() {
				console.log("Socket disconnected");
			};
		},

		load: function(id, callback) {
			var req = new Request({
				async: false,
				url: "/env/" + id,
				onSuccess: function(data) {
					data = JSON.parse(data);
					callback(data);
				}
			});

			req.send();
		}
	});

	ServerComm.wsfn = {};
	// }}}

	// {{{ Packet Class
	ServerComm.WSPacket = new Class({
		Implements: [Options],

		options: {
			type: "null"
		},

		initialize: function(options) {
			this.setOptions(options);
		},

		str: function() {
			return JSON.stringify(this.options);
		}
	}); // }}}

	// {{{ Ping
	ServerComm.wsfn.ping = function(data, sock) {
		var reply = new ServerComm.WSPacket({
			type: "pong"
		});
		sock.send(reply.str());
	} // }}}

})(this);
