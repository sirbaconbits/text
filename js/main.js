window.addEvent("domready", function() {

	window.co = new Display($("main"), {});

	co.addEvent("command", function(e) {
		console.log(e.mode + ": " + e.command);
	});

	co.print("yay");
});
