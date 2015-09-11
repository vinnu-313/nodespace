var strftime = require('strftime');
var net = require('net');

var server = net.createServer(function(socket){
	socket.end(strftime("%Y-%m-%d %H:%M", new Date()) + "\n");
	// socket.end();
});
server.listen(process.argv[2]);