angular.module('PDApp', ['angularUtils.directives.dirPagination',
	'scrollable-table', 
	'PDApp.controllers',
	'PDApp.services',
	'ngRoute'
]).run(function($http) {
  $http.defaults.headers.common.Authorization = 'Token token=';
}).config(function($routeProvider){
	$routeProvider.when("/services", {templateUrl:"partials/services.html",controller:"pdServicesController"}).
	when("/services/:id/incidents", {templateUrl:"partials/incidents.html",controller:"pdIncidentsController"}).
	otherwise({redirectTo:'/services'});	
});