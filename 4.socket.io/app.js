var express = require('express'),
	socket_io = require('socket.io');

var app = new express();
app.use(express.static('./public/'));

var server = app.listen(3000);
var io 	   = socket_io.listen(server, { log: false }); 
var people = [];

io.sockets.on('connection', function(socket) {
	socket.on('join', function(person) {
		people.push(person);
		socket.broadcast.emit('join', person);
		for(var i in people) {
			socket.emit('join', people[i]);
		}
	});

	socket.on('msg', function(msg){
		socket.broadcast.emit('msg', msg);
	});
});