var pages = [
	{ route : '/', output : "Hello World"},
	{ route : '/about/this', output : "Learning routing in node.js"},
	{ route : '/about/node', output : "Evented I/O for V8 Javascript"},
	{ route : '/another route', output : function(){
			return 'Functions in routes';
		}
	}
];

var http = require('http');
var path = require('path');
http.createServer(function(req, res){
	var lookup = decodeURI(req.url);
	pages.forEach(function(page){
		if(page.route === lookup){
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(typeof page.output === 'function' ? page.output()  : page.output );
		}
	});
	if(!res.finished){
		res.writeHead(400, {'Content-Type':'text/html'});
		res.end("Page Not Found !");
	}
}).listen(8080);