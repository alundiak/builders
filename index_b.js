var http = require('http');

var fs = require('fs');
var index = fs.readFileSync('index.html');

// http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n');
// console.log(something)
// }).listen(2014);

httpServer = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(index);
}).listen(2014);

0;

0;
debugger // This is not removed by grunt-strip
console.debug("This will be eremoved too"); // This is not removed by grunt-strip