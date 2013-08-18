var connect = require('connect');
var fs = require('fs');

var server = connect.createServer();


var handler = function(req, res, next) {
	var regex = /([A-Za-z0-9]+\.html)/i;
	var match = req.url.match(regex);
	if (match) {
		var fname = match.slice(1)[0];
		console.log(fname);
		var fstream = fs.createReadStream('./' + fname);
		fstream.pipe(res);
	} else {
		res.statusCode = 404;
		res.end();
	}
};

var secret = function(req, res) {
	res.statusCode = 200;
	res.end('secret goes here');
};

server.use(connect.logger({ immediate: true, format: 'dev' }));
server.use(connect.compress());
server.use('/public', connect.static('./public'));
server.use('/secret', connect.basicAuth('username', 'password'));
server.use('/secret', secret);
//server.use(handler);

server.listen(3000);

// res.simpleBody(200, data, "application/javascript");