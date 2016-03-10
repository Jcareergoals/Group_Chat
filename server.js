var express = require('express'); 
var path = require('path');
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