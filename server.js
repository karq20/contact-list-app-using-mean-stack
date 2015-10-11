var express = require('express');
var app = express();

//mongodb database
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);

//require bosy-parser to parse the body
var bodyParser = require('body-parser');

//use static files from /public folder for app
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//receive a HTTP GET request
app.get('/contactlist', function(req, res) {
	console.log('I received a GET request');
	if(typeof req.body.number === NaN){
		console.log("number is not number");
	}
	else {		
	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
	}
	
});

app.post('/contactlist', function(req, res){
	console.log(req.body);
	var id = req.params.id;
	req.params.id = mongojs.ObjectId(id);
	
	//inserts new data in database and sends new data back to the controller
	db.contactlist.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

	/*responds to GET request by sending back the contactList data in JSON format which the controller can use.
	res.json(contactList);
	*/

//:id since id is not part of string
//req.params.id gets value of id from the url
//
app.delete('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	//delete contact form mongodb
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});
//edit
app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});
//update
app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	
	if(typeof req.body.number === NaN){
		console.log("number is not number");
	}
	else {		
	//update and modify the contact
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number, bday:req.body.bday}},
		new: true}, function(err, doc) {
			res.json(doc);
	});
	}
});


app.listen(3000, function() {
	console.log("Server running on port 3000...");
});
