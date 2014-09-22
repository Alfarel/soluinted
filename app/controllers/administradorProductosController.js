admin.controller("administradorProductosController",['$scope','$http', '$upload', '$modal' , function($scope, $http, $upload, $modal){ 
	$scope.datosTabla = [];
	$scope.maximoCategorias = 8;
	$scope.paginaActual = 1;
	$scope.totalItems = "";

	$scope.categorias = [];

	$http.get("../../json/categorias.json").success(function(data){
		$scope.categorias = data;
	});

	$scope.anadir = function(){
		var modalInstance = $modal.open({
	      templateUrl: '../../views/modal/crearProductos.html',
	      controller: insercionProductosCtrl,	 
	      resolve:{
	    		categoria : function(){
    				return $scope.categorias;
	    		}   	
	    	}	     
	    });

	    modalInstance.result.then(function (selectedItem) {
	    	$scope.guardarProducto(selectedItem)	    	
	    	 	
	    }, function () {
	    	alert("Ocurrio un error, vuelva a intentarlo");
	    });
	}

	$scope.guardarProducto = function(producto){
		console.log(producto.imagenes);

		for(var i =0 ; i< producto.imagenes.length; i++){
			$scope.upload = $upload.upload({
			url: "../../php/productos.php",
			data : {
				nombre: producto.nombre,
				categoria: producto.Categoria,
				caracteristicas: producto.caracteristicas
			},
			file: producto.imagenes[i]
			}).success(function(data){
				alert(data);
			}).error(function(){alert("se daño esto");});	
		}
		

	}

}]);

var insercionProductosCtrl = function($scope, $modalInstance, $http, categoria){

	$scope.seleccion={
		categoria: ""
	}
	$scope.categoria = {
		categorias : []
	};
	$scope.files={
		file: ""
	};
	$scope.imagen = [];

	$http.get("../../json/categorias.json").success(function(data){
		$scope.categoria.categorias = data;
	});


	$scope.datos= {
		nombre: "",
		Categoria: "",
		caracteristicas: [],
		imagenes : []
	};

	$scope.producto = { descripcion : ""};

	$scope.add = function (){	
		if($scope.producto.descripcion != null && $scope.producto.descripcion != "" && $scope.producto.descripcion!= "undefined")
			$scope.datos.caracteristicas.push($scope.producto.descripcion);
	}	

	$scope.addFile = function(){
		var x = document.getElementsByName("file")[0].files[0];	

		if(x != null && x!= "" && x!="undefined"){
			if(revisaCoincidencias(x.name)){
				$scope.datos.imagenes.push(x);
			}
		}
	}	

	$scope.Ok = function(){
		$scope.datos.Categoria = $scope.seleccion.categoria.NombreCategoria;
		if($scope.datos.nombre!= "" && $scope.datos.Categoria!= "" && $scope.datos.caracteristicas.length>0){
			$modalInstance.close($scope.datos);
		}
	}

	function revisaCoincidencias(nombre){
		for(var i = 0; i< $scope.datos.imagenes.length; i++){
			if($scope.datos.imagenes[i].name == nombre)
				return false;
		}
		return true;
	}
}
