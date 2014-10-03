admin.controller("AdministracionMain",['$scope','$http','$modal' , function($scope, $http, $modal){

	$scope.paginaActual ={
		url: "partials/categorias.html"
	};

	$scope.setPage = function(nombre){
		switch(nombre){
			case "categorias":
				$scope.paginaActual.url = "partials/categorias.html";
				break;
			case "productos":
				$scope.paginaActual.url = "partials/productos.html";
				break;
		}
		console.log($scope.paginaActual.url);
	}

}]);