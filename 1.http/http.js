var http = require('http');
var fs = require('fs');

// var server = http.createServer(function(req, res) {
//  res.end('hi');  
// });

var handler = function(req, res) {
    var regex = /([A-Za-z0-9]+\.html)/i;
    var match = req.url.match(regex);
    if (match) {
        var fname = match.slice(1)[0];
        console.log(fname);
        res.setHeader('content-type','text/html')
        var fstream = fs.createReadStream('./' + fname);
        fstream.pipe(res);
    } else {
        res.statusCode = 404;
        res.end();
    }
};

var server = http.createServer();
server.on('request', handler);

server.listen(3000);

// http://localhost:3000/index.html