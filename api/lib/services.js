var req = require('request'),
		async = require('async'),
		Incidents = require('./incidents.js')(),
		start,
		end,
		limit,
		offset

module.exports = function() {
	var Services = {};
	Services.getServices = function(since, until,lim,off,callback) {
		start = since;
		end = until;
		limit = lim;
		offset = off;
		console.log('since' + start + 'until' + end);
		var domain = 'https://pearsonsocial.pagerduty.com/api/v1/';
		var url = domain + 'services?offset=' + offset + '&limit=' + limit
		console.log('url='+url);
		var options  = {
			headers:{'Authorization': 'Token token=','Content-Type':'application/json'},
			uri:url,
			json:true
		};
		req.get(options, function(error,response,body){
			console.log("get resp body" + JSON.stringify(body));
			var resp = {};
			resp.total = body.total;
			resp.limit = body.limit;
			resp.offset = body.offset;
			

			var services = body.services;
			var length = services.length;

			async.map(services, getServiceDetails, function(err){
				resp.services = services;
				callback(error,resp);

			});
		});
	};

	function getServiceDetails(service, callback){
		console.log('callback getServiceDetails start=' + start + ' end=' + end);
		Incidents.getIncidents(service.id,start,end,100,0, function(error,response){
			console.log('callback response = ' + JSON.stringify(response));
			service.incidentDetails = response;
			callback(null,service);
		});
	};
	return Services;

};