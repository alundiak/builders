var http = require('http');

var fs = require('fs');
var index = fs.readFileSync('index.html');

// http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n');
// 

httpServer = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(index);
}).listen(2014);




debugger // This is not removed by grunt-strip
 // This is not removed by grunt-strip