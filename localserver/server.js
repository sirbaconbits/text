var text = require("./text");
var http = require("http");

http.createServer(function(req, res) {
	text.handle(req, res, function(req, res) { res.end("404"); });
}).listen(8080);
