angular.module('PDApp.services', []).
	factory('pdApiService', function($http) {

	var pdApi = {};

	pdApi.getUsers = function() {
		return $http({
			method: 'GET',
			headers: {'Content-type': 'application/json'}, 
			url: 'https://pearsonsocial.pagerduty.com/api/v1/schedules/PY8XJS0'
		});
	};

	pdApi.getServices = function(since,until,limit,offset) {
		return $http({
			method: 'GET',
			headers: {'Content-type': 'application/json'}, 
			//url: 'https://pearsonsocial.pagerduty.com/api/v1/services?offset=0&limit=100'
			url: 'http://localhost:3000/services?since=' + since + '&until=' + until + '&limit=' + limit + '&offset=' + offset
		});
	};

	pdApi.getIncidents = function(serviceId,since,until) {
		return $http({
			method: 'GET',
			headers: {'Content-type': 'application/json'}, 
			url: 'http://localhost:3000/incidents?since=' + since + '&until=' + until + '&service=' + serviceId + "&limit=100&offset=0"
		});
	};

	pdApi.getIncidentLogEntries = function(incidentId) {
		return $http({
			method: 'GET',
			headers: {'Content-type': 'application/json'}, 
			url: 'https://pearsonsocial.pagerduty.com/api/v1/incidents/' + incidentId + '/log_entries'
		});
	};

	return pdApi;
});