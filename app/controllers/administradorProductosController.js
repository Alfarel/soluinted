admin.controller("administradorProductos",['$scope','$http', '$upload', '$modal' , function($scope, $http, $upload, $modal){ 
	$scope.datosTabla = [];
	$scope.maximoCategorias = 8;
	$scope.paginaActual = 1;
	$scope.totalItems = "";

	$scope.categorias = [];

	$scope.cargaInicial = function(){
		$scope.datosTabla = [];

		$http.get("../../php/consultarProductos.php").success(function(data){
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
	    	console.log("asdaa");
	    	$scope.guardarProducto(selectedItem);	    	
	    	 	
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
		
		if( producto.imagenes.length > 0){
			for(var i =0 ; i< producto.imagenes.length; i++){
				$scope.upload = $upload.upload({
				url: "../../productos.php",
				data : {
					nombre: producto.nombre,
					categoria: producto.Categoria,
					caracteristicas: producto.Caracteristicas
				},
				file: producto.imagenes[i]
				}).success(function(data){
					console.log(data);
					$scope.cargaInicial();
				}).error(function(){alert("Se prudujo un error inesperado, vuelva a intentarlo");});	
			}
		}else{
			$scope.upload = $upload.upload({
				url: "../../productos.php",
				data : {
					nombre: producto.nombre,
					categoria: producto.Categoria,
					caracteristicas: producto.Caracteristicas
				},
				file: null
				}).success(function(data){
					console.log(data);
					$scope.cargaInicial();
				}).error(function(){alert("Se prudujo un error inesperado, vuelva a intentarlo");});	
		}

	}

	$scope.pageChanged = function(){
		$scope.mostrarPaginados($scope.todasCategorias);
	}

	$scope.mostrarPaginados = function(arreglo){

		$scope.totalItems = arreglo.length;
		$scope.datosTabla = [];
		for (var i = 8 * ($scope.paginaActual - 1) ; i < 20 * $scope.paginaActual && i < arreglo.length; i++){
			$scope.datosTabla.push(arreglo[i]);
		}
	}
}]);

var insercionProductosCtrl = function($scope, $modalInstance, $http, categoria, producto){
	var checkCambios = false;
	var checkActualizacion = false;
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

	$scope.datos= {
		nombre: "",
		Categoria: "",
		Caracteristicas: [],
		imagenes : []
	};	

	$http.get("../../php/consultarCategorias.php").success(function(data){
		$scope.categoria.categorias = data;	
		if(producto != ""){			
			$scope.datos.nombre = producto.Nombre;
			$scope.datos.Categoria = recuperaCategorias(producto.Categoria);
			$scope.datos.Caracteristicas = [];
			$scope.datos.CaracteristicasHistorico = producto.Caracteristicas;
			$scope.seleccion.categoria = recuperaCategorias(producto.Categoria);
			$scope.datos.ImagenesHistorico = producto.Imagenes;
		}
	});

	$scope.cambiaCategoria = function(){
		checkCambios = true;
	}

	function recuperaCategorias(codigo){	
		
		for(var i = 0; i < $scope.categoria.categorias.length; i++){
			if($scope.categoria.categorias[i].idCategoria == codigo){
				return $scope.categoria.categorias[i];
			}				
		}
		return [];
	}

	$scope.borrarCaracteristica = function($index){
		$scope.datos.Caracteristicas.splice($index, 1);		
	}

	$scope.borrarCaracteristicaHistorial = function($index){
		$http.post("../../php/borrarCaracteristicasProductos.php", $scope.datos.CaracteristicasHistorico[$index])
		.success(function(data){
			$scope.datos.CaracteristicasHistorico.splice($index, 1);
			checkCambios = true;
		});
	}

	$scope.eliminarImagen = function($index){
		$scope.datos.imagenes.splice($index,1);
		checkCambios = true;
	}

	$scope.eliminarImagenHistorico = function($index){
		$http.post("../../php/borrarImagenesProductos.php", $scope.datos.ImagenesHistorico[$index])
		.success(function(data){
			$scope.datos.ImagenesHistorico.splice($index, 1);
			checkCambios = true;
		});
	}

	$scope.producto = { descripcion : ""};

	$scope.add = function (){	
		if($scope.producto.descripcion != null && $scope.producto.descripcion != "" && $scope.producto.descripcion!= "undefined"){
			checkActualizacion = true;
			$scope.datos.Caracteristicas.push($scope.producto.descripcion);		
		}			
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
		$scope.datos.Categoria = $scope.seleccion.categoria.idCategoria;
		console.log("asdasda " + checkCambios);
		if(checkCambios || checkActualizacion){
			console.log("No");
			$modalInstance.close($scope.datos);					
		}
		else{
			if($scope.datos.nombre!= "" && $scope.datos.Categoria!= "" && $scope.datos.Caracteristicas.length>0){
				$modalInstance.close($scope.datos);
			}else
				alert("Debe realizar alguna acción para completar la edición");						
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
