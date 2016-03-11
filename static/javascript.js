$(document).ready(function(){
	var name = prompt("YOUR NAME: "); 
	var socket = io.connect(); 
	if(name){
		socket.emit("new_user", {name: name}); 
	}
	socket.emit('update'); 
	$('.btn').click(function(){
		var message = $('textarea').val(); 
		if(name == null || name == 'undefined'){
			name = prompt("Your name is required to send a message.\nPlease enter a name:"); 
		} else {
			socket.emit("new_message", {message: message, user: name}); 
			$('#textarea').empty(); 
		}
	}); 
	socket.on("updated", function(data){
		// text that will go into conversation board
		var messages = '';  
		for(var i = 0; i < data.messages.length; i++){
			messages+= "<p class='name'>"+data.messages[i].name+"</p>";
			messages+= "<p class='message'>"+data.messages[i].message+"</p><br>"; 
		}
		$('.board').html(messages); 
	}); 		
});