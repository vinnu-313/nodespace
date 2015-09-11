var http = require('http');
var url = require('url');
var server = http.createServer(function(req, res){
	var r = url.parse(req.url, true);
	var d = new Date(r.query['iso']);
	res.writeHead(200, { 'Content-Type' : 'application/json'});
	if(r.pathname === '/api/parsetime'){
		var dj = {
			"hour" : d.getHours(),
			"minute" : d.getMinutes(),
			"second" : d.getSeconds()
		};
	} else if(r.pathname === '/api/unixtime') {
		var dj = {
			"unixtime" : d.getTime()
		};
	} else {
		dj = {
			"error" : "error"
		};
	}
	res.end(JSON.stringify(dj));
});
server.listen(Number(process.argv[2]));