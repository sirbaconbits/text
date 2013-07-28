/*

## index.js

This file is based highly off of how my custom webserver works.
Modification is only recommended if you actually know what you're doing.

*/

var stat = require("node-static");
var serv = new stat.Server("./text");

exports.handle = function(req, res, _404, postdata) {
	serv.serve(req, res, function(e) {
		if (e && (e.status === 404)) { _404(req, res); };
	});
};
