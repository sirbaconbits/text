/*

## main.js

This is where all of the real stuff happens. The structure of this file will
evolve with the development of the rest of the project.

*/

window.addEvent("domready", function() {

	// Server Communication
	window.sc = new ServerComm({});

	// Main display
	window.co = new Display($("main"), {});

	// Basic command environment
	window.commenv = new CommEnv({
		"inv": function(args) {
			co.print("You're a commie. You don't *own* anything.");
		},

		"look": function(args) {
			co.print("", mainroom.get("name"), new Array(mainroom.get("name").length + 1).join("="), "", mainroom.get("description"), "");
		}
	});

	// Environment
	window.env = new Environment({ sc: sc });
	env.load(0);

	// Sample entity - Main room
	var mainroom = new Environment.Room({
		name: "Main Room",
		description: "A large room."
	});

	co.addEvent("command", function(e) {
		console.log(e.mode + ": " + e.command);

		// I know. Eww. A switch statement. Sue me.
		// We'll get rid of it later when we redo the interface.
		switch (e.mode) {
			case 0:
				co.print("$ " + e.command);
				commenv.exec(e.command);
				break;

			case 1:
				co.print("<user> " + e.command);
				break;

			case 2:
				co.print("build: " + e.command);
				break;

			default:
				alert("ERROR");
		}
	});

	// Welcome message - YAY!
	co.print("Welcome to <=text=>", "");

	// Extract hostname just because
	var hostname = document.URL.split("/")[2];
	var n = hostname.lastIndexOf(":");
	hostname = hostname.substring(0, n != -1 ? n : hostname.length)

	// WEBSOCKETS!!!
	var ws = new WebSocket("ws://" + hostname + ":9001/client");
	ws.onopen = function() {
		console.log("Connected.");
	};
	ws.onmessage = function(e) {
		console.log("Server: " + e.data)
		ws.send("Pong!");
	};
	ws.onclose = function() {};

}.bind(this));
