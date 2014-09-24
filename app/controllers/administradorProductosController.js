admin.controller("administradorProductosController",['$scope','$http', '$upload', '$modal' , function($scope, $http, $upload, $modal){ 
	$scope.datosTabla = [];
	$scope.maximoCategorias = 8;
	$scope.paginaActual = 1;
	$scope.totalItems = "";

	$scope.categorias = [];

	$http.get("../../json/categorias.json").success(function(data){
		$scope.categorias = data;
	});

	$scope.cargaInicial = function(){
		$scope.datosTabla = [];
		$http.get("../../json/productos.json")
		.success(function(data){
			if(data!=null){
				console.log(data);				
				$scope.todasCategorias = data;
				$scope.pageChanged();
			}				
		});
	}

	$scope.modificar = function($index){
		var modalInstance = $modal.open({
	      templateUrl: '../../views/modal/crearProductos.html',
	      controller: insercionProductosCtrl,	 
	      resolve:{
	    		categoria : function(){
    				return $scope.categorias;
	    		},

	    		producto: function(){
	    			return $scope.datosTabla[$index];
	    		}   	
	    	}
	    		     
	    });

	    modalInstance.result.then(function (selectedItem) {
	    	$scope.guardarProducto(selectedItem)	    	
	    	 	
	    }, function () {
	    });
	}

	$scope.anadir = function(){
		var modalInstance = $modal.open({
	      templateUrl: '../../views/modal/crearProductos.html',
	      controller: insercionProductosCtrl,	 
	      resolve:{
	    		categoria : function(){
    				return $scope.categorias;
	    		},
	    		producto: function(){
	    			return "";
	    		}   	
	    	}	     
	    });

	    modalInstance.result.then(function (selectedItem) {
	    	$scope.guardarProducto(selectedItem)	    	
	    	 	
	    }, function () {
	    });
	}

	$scope.eliminar = function($index){
		var modalInstance = $modal.open({
	      templateUrl: '../../views/modal/notificacionEliminar.html',
	      controller: verificarBorradoCtrl,
	      	resolve:{
      		nombre: function(){
      			return $scope.datosTabla[$index].nombre_producto;
      		}	 	
	      } 	       	   	       
	    });

	    modalInstance.result.then(function () {
	    	$http.post("../../php/borrarProductos.php", $scope.datosTabla[$index] )
	    	.success(function(){
	    		$scope.cargaInicial();
	    	});    	
	    }, function () {   	
	    	console.log(cancelar);
	    });
	}

	$scope.guardarProducto = function(producto){
		

		for(var i =0 ; i< producto.imagenes.length; i++){
			$scope.upload = $upload.upload({
			url: "../../productos.php",
			data : {
				nombre: producto.nombre,
				categoria: producto.Categoria,
				caracteristicas: producto.caracteristicas
			},
			file: producto.imagenes[i]
			}).success(function(data){
				console.log(data);
				$scope.cargaInicial();
			}).error(function(){alert("se daño esto");});	

		}
	}

	$scope.pageChanged = function(){
		$scope.mostrarPaginados($scope.todasCategorias);
	}

	$scope.mostrarPaginados = function(arreglo){

		$scope.totalItems = arreglo.length;
		$scope.datosTabla = [];
		for (var i = 8 * ($scope.paginaActual - 1) ; i < 8 * $scope.paginaActual && i < arreglo.length; i++){
			$scope.datosTabla.push(arreglo[i]);
		}
	}

}]);

var insercionProductosCtrl = function($scope, $modalInstance, $http, categoria, producto){

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

		if(producto != ""){
			console.log(producto);
			$scope.datos.nombre = producto.nombre_producto;
			$scope.datos.Categoria = producto.Categorias;
			$scope.datos.Caracteristicas = producto.Caracteristicas;

			console.log(producto.Caracteristicas);

			var x = recuperaCategoria(producto.Categorias);
			if(x!= null)
				$scope.seleccion.categoria = x;
		}
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

	$scope.cancel = function(){
    	$modalInstance.dismiss('cancel');
	}

	function revisaCoincidencias(nombre){
		for(var i = 0; i< $scope.datos.imagenes.length; i++){
			if($scope.datos.imagenes[i].name == nombre)
				return false;
		}
		return true;
	}

	function recuperaCategoria(dato){
		console.log($scope.categoria.categorias);
		for(var i=0; i< $scope.categoria.categorias.length; i++){
			console.log($scope.categoria.categorias[i].NombreCategoria);
			if($scope.categoria.categorias[i].NombreCategoria == dato){
				alert("aqui");
				return $scope.categoria.categorias[i];
			}
		}
		return null;
	}
}

var verificarBorradoCtrl = function($scope, $modalInstance, nombre){
	$scope.elemento ={
		nombre: nombre
	}

	$scope.Ok = function(){
		$modalInstance.close();		
	}

	$scope.cancel = function(){
    	$modalInstance.dismiss('cancel');
	}

}
