var assert = require('assert'),
	should = require('should');
	Services = require('../lib/services.js')();

describe ('services test', function() {

	describe ('get services', function() {

		it ('should return a collection of services with ttr calculations', function(done) {
			var since = '2015-01-02';
			var until = '2015-01-15';
			var limit = 10;
			var offset = 0;
			
			Services.getServices(since,until,limit, offset, function(error, response){
				console.log('CALLBACK RESPONSE = ' + JSON.stringify(response));
				var services = response.services;
				assert(services.should.be.instanceof(Array));
				assert.equal(10, services.length);
				assert(services[0].incidentDetails.incident_count != null);
				assert(services[0].incidentDetails.mean_ttr != null);
				assert(response.total != null);
				assert(response.limit != null);
				assert(response.offset != null);
				
				done();
			});
		});
	});
});