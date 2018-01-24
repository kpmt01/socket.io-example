var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
  });
  socket.on('file message', function(msg){
    console.log('resim geldi.')
    io.emit('chat message', 'Resim Yüklendi.');
    io.emit('file message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
