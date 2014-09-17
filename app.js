var express = require('express');
var logger = require('express-logger');
var http = require('http');
var io = require('socket.io')
var path = require('path');

var app = express();

var userlist = [];

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger({path: "./logfile.txt"}));

app.get('/', function(req, res){
  res.sendFile('index.html',{root: __dirname});
});



http = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = io.listen(http);


io.on('connection', function(socket){
      console.log('New client opened');
      
      socket.on('join',function(newuser){
                console.log(newuser + " viens de se connecter");
                socket.nickname = newuser;
                userlist.push(newuser);
                io.emit('join',newuser);
                io.emit('userlist',userlist);
                });
      socket.on('chat message', function(message){
                var sender = socket.nickname;
                console.log(sender + " says '" + message + "'");
                socket.broadcast.emit('chat message',{'sender':sender,'message':message});
                });
      
      socket.on('disconnect',function(){
                socket.broadcast.emit('leave',socket.nickname);
                console.log('User ' + socket.nickname + ' disconnected');
                userlist.splice(userlist.indexOf(socket.nickname),1);
                socket.broadcast.emit('userlist',userlist);
                });
      
});


      



