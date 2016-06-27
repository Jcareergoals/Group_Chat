$(document).ready(function(){
	var name;
	var socket = io.connect();   
	$('form').submit(function(){
		while(!name || name == "undefined"){
			name = prompt("What is your name?");
			$('h1').html("<h1 class='logged'>Welcome "+name+"</h1>");
			socket.emit("new_user", {name: name});
		}
		if($('textarea').length > 0){
			var message = $('textarea').val();
			$('textarea').text("");
			var d = new Date();
			var time = d.toLocaleTimeString(); 
			socket.emit("new_message", {name: name, message: message, updatedAt: time}); 
		}
		
		$('textarea').text("");
		return false; 
	}); 
	// New user event
	socket.on("newUserBroadcast", function(data){
		$('.chatbox').append("<p class='green'>"+data.name+" entered the chatroom.</p>");
		$('.chatbox').scrollTop($('.chatbox')[0].scrollHeight); 
	});
	// New message event
	socket.on("new_message_update", function(data){
		$('.chatbox').append("<p><b class='green'>"+data.name+"</b>: "+data.message+" | "+data.updatedAt+"</p>"); 
		$('.chatbox').scrollTop($('.chatbox')[0].scrollHeight); 
	});
	// Greeting new user event
	socket.on("welcome", function(data){
		$('.chatbox').append("<p>Welcome to the chatroom <b class='green'>"+data.name+"</b></p>");
		$('.chatbox').scrollTop($('.chatbox')[0].scrollHeight); 
	}); 
	socket.on("online", function(data){
		if(data.online == 1){
			$('#online').html("<p><b class='red'>"+data.online+"</b> USER ONLINE</p>");
		} else if (data.online >= 2 && data.online < 5){
			$('#online').html("<p><b class='orange'>"+data.online+"</b> USERS ONLINE</p>");
		} else if (data.online >= 5 && data.online < 7){
			$('#online').html("<p><b class='chartreuse'>"+data.online+"</b> USERS ONLINE</p>");
		} else if (data.online >= 7){
			$('#online').html("<p><b class='green'>6+</b> USERS ONLINE</p>");
		}
	});		
	socket.on("disconnected", function(data){
		$('.chatbox').append("<p class='red'>A user left the chatroom</p>");
	});
});