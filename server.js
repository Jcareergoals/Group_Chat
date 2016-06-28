var express = require('express'); 
var path = require('path');
var session = require('express-session');
var app = express(); 

// CONFIGURATIONS
app.use(express.static(path.join(__dirname, '/static'))); 
app.set('views', path.join(__dirname, '/views')); 
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index'); 
});

var online = 0;
// LISTENING PORT 
var server = app.listen(3000, function(){
	console.log("Listening at port: 3000"); 
}); 

var io = require("socket.io").listen(server);

io.sockets.on('connection', function(socket){
	var users = {};
	socket.on("new_message", function(data){
		io.emit("new_message_update", data);
	});
	socket.on("new_user", function(data){
		users[socket.id] = data.name; 
		socket.emit("welcome", data);
		online += 1;   
		io.emit("online", {online: online}); 
		socket.broadcast.emit("newUserBroadcast", data);
	}); 
	socket.on('disconnect', function(){
		var name = users[socket.id];
		online -= 1;
		if(online < 0){online = 0};
		io.emit('disconnected', {name:name});
		io.emit('online', {online:online});
		delete users[socket.id];
	});
}); 
