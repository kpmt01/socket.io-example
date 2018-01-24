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
    if(msg[0] == '!'){
      getCmd(msg);
    }else{
      io.emit('chat message', msg);
    }
  });
  socket.on('file message', function(msg){
    console.log('picture requested.')
    io.emit('chat message', 'image uplaoded');
    io.emit('file message', msg);
  });
});


function getCmd(cmd){
  cmd = cmd.replace('!','');
  if(cmd == 'clear'){
    for(let i = 0;i < 30;i++){
      io.emit('chat message', '------------------------------------');
    }
  }else if(cmd == 'whoiam'){
    io.emit('chat message', 'you is awesome a human');
  }else if(cmd == 'help' || cmd == 'cmd'){
    io.emit('chat message', '!clear - !whoiam - !help - !cmd');
  }else{
    io.emit('chat message', cmd + ' is command not found');
  }
}

http.listen(port, function(){
  console.log('listening on *:' + port);
});
