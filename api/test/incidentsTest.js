var assert = require('assert'),
	should = require('should');
	Incidents = require('../lib/incidents.js')();

describe ('incidents test', function() {

	describe ('get incidents', function() {

		it ('should return a collection of incidents with time to resolve', function(done) {
			var limit = 1;
			var offset = 0;
			Incidents.getIncidents('PJXJWYN','2015-01-01','2015-01-15', limit,offset, function(error,response){
				console.log('callback response = ' + JSON.stringify(response));
				assert(response.incidents.should.be.instanceof(Array));
				assert.equal(1, response.incidents.length);
				assert(response.mean_ttr != null);
				done();
			});
		});
	});
});