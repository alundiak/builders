var http = require('http');

var fs = require('fs');
var index = fs.readFileSync('index.html');

// http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n');
// console.log(something)
// }).listen(2014);

var httpServer = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(index);
}).listen(2014);

console.log('Server running at http://127.0.0.1:2014');
console.log("Hello, This will be removed by grunt-strip or removelogging");
debugger // This is not removed by grunt-strip (but removed by removelogging)
console.debug("This will be removed too"); // This is not removed by grunt-strip (but removed by removelogging)

/**
Multi-line 
debugger
comment
console.log()
*/

