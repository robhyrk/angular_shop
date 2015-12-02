var http = require('http');

function apiRequest(endpoint, req, res){
	console.log(req)
var team = req.params.teamnumber;
console.log(team);
var result = '';
		http.get('http://174.129.248.23/brainstation/shop/' +endpoint +team, function(response){
		
		response.setEncoding('utf8');

		response.on('data', function(data) {
			result += data;
		});

		response.on('error', function(error){
			console.log(error);
		});

		response.on('end', function(end){
			console.log(JSON.parse(result));
			res.send(JSON.parse(result));
		});
	});
}

module.exports.apiRequest = apiRequest;