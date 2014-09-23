app.controller('detailController',['$scope','$routeParams','$http', '$filter',
	function($scope,$routeParams,$http, $filter) {
		var foo=
		// body...
		$scope.categorias = [];
		$scope.message = 'This is the detail controller';
		$http.get("../app/json/categorias.json").success(function(data){
			$scope.categorias = data;
			console.log(data);
		});	
		$scope.productos = [];
		$http.get("../app/json/productos.json").success(function(data){
			$scope.productos = data;
			console.log($scope.productos);
		});	
		$scope.productUrl = $routeParams.productUrl;
		console.log(productos);
		var result = $filter('filter')($scope.productos, {nombre_producto:"Silla Universitaria NTC"})[0];

  		// $scope.name = result.nombre_producto;
  		// console.log(result.nombre_producto);	
}]);

