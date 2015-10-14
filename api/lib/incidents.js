var req = require('request'),
		async = require('async')

module.exports = function() {
	var Incidents = {};
	var totalTime = 0;
	var count = 0;
	Incidents.getIncidents = function(id, since, until, limit,offset,callback) {
		var domain = 'https://pearsonsocial.pagerduty.com/api/v1/';
		var url = domain + 'incidents?offset=' + offset + '&limit=' + limit + 'since=' + since + '&until=' + until + '&service=' + id
		console.log('Incidents.getIncidents url=' + url);
		var options  = {
			headers:{'Authorization': 'Token token=','Content-Type':'application/json'},
			uri:url
		};
		req.get(options, function(error,response,body){
			var resp = JSON.parse(body);
			console.log(JSON.stringify(resp));
			if (resp.error != null){
				var error = 'An error occurred calling url=' + url;
				console.log('An error occurred calling url=' + url);
				callback(error,null);
				return;
			}
			var incidents = resp.incidents;
			console.log(incidents);
			async.map(incidents,getIncidentLogEntries,function (error, result){
				//console.log(incidents.length);
				//console.log(totalTime);
				//console.log('count' + count++);
				
				var avgTime = totalTime/incidents.length
				avgTime = avgTime.toFixed(0);
				//console.log(avgTime);
				var service = {};
				service.incidents = incidents;
				if (isNaN(avgTime)){
					//console.log('is NAN');
					service.mean_ttr = 0;
				}
				else{
					//console.log('is number');
					service.mean_ttr = avgTime;
				}
				totalTime = 0;
				service.incident_count = incidents.length;
				//console.log("getIncidents service=" + JSON.stringify(service));
				callback(error,service);
			});

		});		
	};

	function getIncidentLogEntries(incident,callback){
		//incident.timeToResolve = new Date().getTime() / 1000;
		//incident.timeToResolve = '110ms';
		var url = 'https://pearsonsocial.pagerduty.com/api/v1/incidents/' + incident.id + '/log_entries'
		var options  = {
			headers:{'Authorization': 'Token token=','Content-Type':'application/json'},
			uri:url
		};
		req.get(options,function(error,response,body){
			var resp = JSON.parse(body);
			var logEntries = resp.log_entries;
			var length = logEntries.length;
			var resolveTime = logEntries[0].created_at;
			var triggerTime = logEntries[length-1].created_at;
			var timeToResolve = (new Date(resolveTime).getTime() - new Date(triggerTime).getTime())/1000;
			incident.time_to_resolve = timeToResolve
			totalTime = totalTime + timeToResolve
			incident.resolved_on = resolveTime;
			console.log('incident' + JSON.stringify(incident));
			callback(null,incident);
		})
	}
	return Incidents;
};