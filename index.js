var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var notifier = require('node-notifier');
app.get('/', function(req, res){
 res.sendFile(__dirname + '/index.html');
});

http.listen(8080, function(){
 console.log('listening on *:8080');
});

io.on('connection', function(socket){
 console.log('a user is connected');
 socket.on('disconnect', function(){
  console.log('a user is disconnected');
 });
 io.emit('some event', { for: 'everyone' });
 socket.on('chat message', function(msg){
  notifier.notify('You have a message');
  io.emit('chat message', msg);
 });
});
