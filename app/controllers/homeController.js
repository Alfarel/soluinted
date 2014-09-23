app.controller('homeController',['$scope','$routeParams','$http' ,
	function($scope,$routeParams,$http) {
		// body...
		$scope.categorias = [];
		$scope.message = 'This is the home controller';
		$http.get("../app/json/categorias.json").success(function(data){
			$scope.categorias = data;
			console.log(data);
		});	
		$scope.productos = [];
		$http.get("../app/json/productos.json").success(function(data){
			$scope.productos = data;
			console.log(data);
		});	
		
		// $scope.loadCategories = function(){
		// 	$http.get('json/categorias.json').
		// 	success(function(data) {
	 //      		$scope.categories = data;	      	
	 //      	});
	      	
		// )};
		
		
}]);

