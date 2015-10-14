
var start;
var end;
var startDate = new Date();
var endDate = new Date();
var dd = startDate.getDate();
var mm = startDate.getMonth()+1; 
var yyyy = startDate.getFullYear();
var offset = 0;
var limit;

end = yyyy + '-' + mm + '-' + dd;
endDate.setDate(startDate.getDate() - 30);
dd = endDate.getDate();
mm = endDate.getMonth()+1; 
yyyy = endDate.getFullYear();
start = yyyy + '-' + mm + '-' + dd;

angular.module('PDApp.controllers', []).
	controller('pdServicesController', function($scope,pdApiService) {
		$scope.loading = true;
		$scope.services = [];
		//$scope.pageSize = 2;
		//alert('$scope.servicesPerPage' + $scope.servicesPerPage);
		$scope.totalServices = 0;
		$scope.servicesPerPage = 10;
		limit = $scope.servicesPerPage;
		getResults(1);

		$scope.pagination = {
        current: 1
    };

		function getResults(pageNumber)
		{
			//alert('getting page=' + pageNumber);
			var offset;

			if (pageNumber == 1){
				offset = 0;
			}
			else{
				offset = pageNumber * limit;
			} 
			limit = $scope.servicesPerPage;

			pdApiService.getServices(start,end,limit, offset).success(function (response) {
				//alert('callback 1 from controllers.js');
				//console.log(JSON.stringify(response));
				$scope.loading = false;
				$scope.services = response.services;
				$scope.totalServices = response.total;
			}).
			error(function(data, status, headers, config) {
				$scope.loading = false;
				alert('error occurred calling ' + JSON.stringify(config.url));
			});	
		}
		$scope.searchFilter = function (service) {
			var keyword = new RegExp($scope.nameFilter, 'i');
			return !$scope.nameFilter || keyword.test(service.name);
		};

		$scope.sort = {
			column: '',
			descending: false
		};    

		$scope.changeSorting = function(column) {
			// alert('sorting column' + JSON.stringify(column));
			var sort = $scope.sort;
			// alert('sorting sort' + JSON.stringify(sort));

			if (sort.column == column) {
				sort.descending = !sort.descending;
			} else {
				sort.column = column;
				sort.descending = false;
			}
		};
		
		$scope.pageChanged = function(newPage) {
			$scope.loading = true;
			getResults(newPage);
		};
	}).
	/* Incidents controller */
	controller('pdIncidentsController', function($scope, $routeParams, pdApiService) {
		$scope.id = $routeParams.id;
		$scope.loading = true;

		var start;
		var end;
		var startDate = new Date();
		var endDate = new Date();
		var dd = startDate.getDate();
		var mm = startDate.getMonth()+1; 
		var yyyy = startDate.getFullYear();

		end = yyyy + '-' + mm + '-' + dd;
		endDate.setDate(startDate.getDate() - 30);
		dd = endDate.getDate();
		mm = endDate.getMonth()+1; 
		yyyy = endDate.getFullYear();

		start = yyyy + '-' + mm + '-' + dd;

		// get the incidents by serviceId and date range
		pdApiService.getIncidents($scope.id,start,end).success(function (response) {
			//alert(response);
			$scope.loading = false;
			$scope.incidents = response;
			//alert('response' + JSON.stringify(response));
		});

		$scope.sort = {
			column: '',
			descending: false
		};    

		$scope.changeSorting = function(column) {
			// alert('sorting column' + JSON.stringify(column));
			var sort = $scope.sort;
			// alert('sorting sort' + JSON.stringify(sort));

			if (sort.column == column) {
				sort.descending = !sort.descending;
			} else {
				sort.column = column;
				sort.descending = false;
			}
		};
	});
	// .
	// controller('pagingController', function($scope){
	// 	$scope.pageChanged = function(newPage){
	// 		getResults(newPage);
	// 	}
	// });

