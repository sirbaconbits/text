/*

## index.js

This file is based heavily off of how my custom webserver works.
Modification is only recommended if you actually know what you're doing.

*/

// {{{ Dependencies and Initialization
var url = require("url");

var stat = require("node-static");
var serv = new stat.Server("./text");

var redis = require("redis");
var r = redis.createClient();

var ws = require("ws");
var wss = new ws.Server({ port: 9001 });
// }}}

exports.handle = function(req, res, _404, postdata) {
	var path = url.parse(req.url).pathname.split("/");

	if (path[1] == "env") {
		// {{{ Environment REST API

		path = path.slice(2);
		var id = path[0];
		var rq = path[1] || "all";

		var dl = [];

		// Assemble the database query
		var rreq = r.multi();
		if ((rq == "type") || (rq == "all")) { rreq.get("text:env:"+id+":type"); dl.push("type"); }
		if ((rq == "name") || (rq == "all")) { rreq.get("text:env:"+id+":name"); dl.push("name"); }
		if ((rq == "desc") || (rq == "all")) { rreq.get("text:env:"+id+":desc"); dl.push("desc"); }
		if ((rq == "succ") || (rq == "all")) { rreq.get("text:env:"+id+":succ"); dl.push("succ"); }
		if ((rq == "osuc") || (rq == "all")) { rreq.get("text:env:"+id+":osuc"); dl.push("osuc"); }
		if ((rq == "fail") || (rq == "all")) { rreq.get("text:env:"+id+":fail"); dl.push("fail"); }
		if ((rq == "ofai") || (rq == "all")) { rreq.get("text:env:"+id+":ofai"); dl.push("ofai"); }

		rreq.exec(function(e, data) {
			var obj = {};

			for (var i=0;i<dl.length;i++) {
				obj[dl[i]] = data[i];
			}

			// TODO CORS
			res.end(JSON.stringify(obj));
		}); // }}}
	} else {
		// {{{ Serve static file
		serv.serve(req, res, function(e) {
			if (e && (e.status === 404)) { _404(req, res); };
		}); // }}}
	}
};

// {{{ WebSockets
wss.on('connection', function(s) {
    s.on('message', function(m) {
	console.log(m);
	try {
		var d = JSON.parse(m);
	} catch (e) {
		s.send('{"type":"error"}');
	}
    });

    s.send('{"type":"ping"}');
}); // }}}
