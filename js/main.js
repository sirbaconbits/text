/*

## main.js

This is where all of the real stuff happens. The structure of this file will
evolve with the development of the rest of the project.

*/

window.addEvent("domready", function() {

	// Main display
	window.co = new Display($("main"), {});

	// Basic command environment
	window.commenv = new CommEnv({
		"inv": function(args) {
			co.print("You're a commie. You don't *own* anything.");
		},

		"look": function(args) {
			co.print("", mainroom.get("name"), "", mainroom.get("description"));
		}
	});

	// Environment
	window.env = new Environment({});

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
}.bind(this));
