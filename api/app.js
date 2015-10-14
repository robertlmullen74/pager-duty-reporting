var express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
Incidents = require('./lib/incidents.js')();
Services = require('./lib/services.js')();

var app = express();
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.get('/incidents', function(req, res, next) {
	var id = req.query.service;
	var since = req.query.since;
	var until = req.query.until;
	var limit = req.query.limit;
	var offset = req.query.offset;
	console.log(req.query);
	
	Incidents.getIncidents(id,since,until, limit,offset, function(error,response){
		if (error) { return next(error); }
		console.log("app.js incidents resp=" + JSON.stringify(response));
		res.json(response);
	});
	
});

app.get('/services', function(req, res, next) {
	var since = req.query.since;
	var until = req.query.until;
	var limit = req.query.limit;
	var offset = req.query.offset;
	Services.getServices(since, until, limit,offset,function(error,response){
		if (error) { return next(error); }
		console.log("app.js services resp");
		res.json(response);
	});
	
});


app.listen(3000, function(){
	console.log('Express server listening on port 3000');
});


