$(function(){

	 var name = prompt('whats your name?');
	 var socket = io.connect();

	 socket.emit('join', {name:name});

	 socket.on('join', function(person) {
	 	$('.people').append('<li class=list-group-item>'+person.name+'</li>');
	 });

	 socket.on('msg', function(msg){
	 	$('.chat').append($('<li>').addClass('list-group-item').html(msg.name+ ':' +msg.text));
	 });

	 $('.go').on('click', function(){
	 	var text = $('.msg').val();
	 	var msg = {name:name, text:text};
	 	socket.emit('msg', msg);
	 	$('.chat').append($('<li>').addClass('list-group-item').html(msg.name+ ':' +msg.text));
	 	$('.msg').val('');
	 });
});