var express = require('express'); 
var path = require('path');
var session = require('express-session');
var app = express(); 

// set static, views and veiw engine
app.use(express.static(path.join(__dirname, '/static'))); 
app.set('views', path.join(__dirname, '/views')); 
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index'); 
});

// set port for server to listen to 
var server = app.listen(2222, function(){
	console.log("Listening at port: 2222"); 
}); 

var io = require("socket.io").listen(server);
var messages = []; 
io.sockets.on('connection', function(socket){
	socket.on("new_message", function(data){
		var new_message = {
			name: data.user, 
			message: data.message
		}
		messages.push(new_message); 
		io.emit("updated", {messages: messages}); 
	});
	socket.on("update", function(){
		socket.emit("updated", {messages: messages}); 
	});  
}); 
