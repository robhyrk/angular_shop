var express = require('express');
var bodyParser= require('body-parser');
var http = require('http');
var externalRequest = require('./externalRequest');

var app = express();

//Body-Parser
app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(bodyParser.json());

//Load Index
app.use(express.static(__dirname + './../public/'));

app.get('/retrieve_products/:teamnumber', function(req,res){
	externalRequest.apiRequest('retrieve_products/', req, res);
});

app.get('/retrieve_orders/:teamnumber', function(req,res){
	externalRequest.apiRequest('retrieve_orders/', req, res);
});

app.post('/login/')

app.listen(8080, function(){
	console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});
