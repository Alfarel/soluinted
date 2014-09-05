admin.controller("administradorController",['$scope','$http', function($scope, $http){
	
	$scope.click = function(tipo){
		alert(tipo);	
	}

}]);