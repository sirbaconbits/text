/*

## main.js

This is where all of the real stuff happens. The structure of this file will
evolve with the development of the rest of the project.

*/

window.addEvent("domready", function() {

	window.co = new Display($("main"), {});

	var commenv = new CommEnv({
		"inv": function(args) {
			co.print("You're a commie. You don't *own* anything.");
		}
	});

	co.addEvent("command", function(e) {
		console.log(e.mode + ": " + e.command);

		// I know. Eww. A switch statement. Sue me.
		// We'll get rid of it later.
		switch (e.mode) {
			case 0:
				//co.print("command: " + e.command);
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
});
