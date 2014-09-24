admin.controller("administradorController",['$scope','$http','$modal' , function($scope, $http, $modal){
	
	$scope.datosTabla = [];
	$scope.maximoCategorias = 8;
	$scope.paginaActual = 1;
	$scope.totalItems = "";
	$scope.todasCategorias = [];

	$scope.cargaInicial = function(){
		$scope.datosTabla = [];
		$http.get("../../json/categorias.json")
		.success(function(data){
			if(data!=null){				
				$scope.todasCategorias = data;
				$scope.pageChanged();
			}				
		});
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

	$scope.editar = function($index){
		var modalInstance = $modal.open({
	      templateUrl: '../../views/modal/crearCategorias.html',
	      controller: insercionCategoriasCtrl,	   
	      resolve:{
      		data: function(){
      			return $scope.datosTabla[$index];
      		}	 	
	      }     
	    });

	    modalInstance.result.then(function (selectedItem) {
	    	$scope.guardarCategoria(selectedItem);	    	
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	}

	$scope.anadir = function(){
		var modalInstance = $modal.open({
	      templateUrl: '../../views/modal/crearCategorias.html',
	      controller: insercionCategoriasCtrl,
	      resolve:{
      		data: function(){
      			return "";
      		}	 	
	      } 	   	       
	    });

	    modalInstance.result.then(function (selectedItem) {
	    	$scope.guardarCategoria(selectedItem);	    	
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	}

	$scope.eliminar = function($index){
		var modalInstance = $modal.open({
	      templateUrl: '../../views/modal/notificacionEliminar.html',
	      controller: verificarBorradoCtrl,
	      	resolve:{
      		nombre: function(){
      			return $scope.datosTabla[$index].NombreCategoria;
      		}	 	
	      } 	       	   	       
	    });

	    modalInstance.result.then(function () {
	    	$http.post("../../php/borrarCategorias.php", $scope.datosTabla[$index] )
	    	.success(function(){
	    		$scope.cargaInicial();
	    	});    	
	    }, function () {   	
	    	console.log(cancelar);
	    });
	}


	/*$scope.click = function(tipo){

		$http.post("../../php/categorias.php",{data: "spawn", data2: "adfasfasf", data3: "qwerty"})
		.success(function(data){
			
		});	
	}*/

	$scope.guardarCategoria = function(data){
		$http.post("../../php/categorias.php",data)
		.success(function(data){
			$scope.cargaInicial();
		});	
	}

}]);

var insercionCategoriasCtrl = function($scope, $modalInstance, data){
	$scope.bloquearCampo = {
		bloqueo: false
	}

	$scope.datos = {
		nombre: "",
		descripcion:""
	}

	if(data!= ""){
		$scope.bloquearCampo.bloqueo = true;
		$scope.datos.nombre = data.NombreCategoria;
		$scope.datos.descripcion = data.descripcion;
	}

	$scope.Ok = function(){

		if(vacioONulo($scope.datos.nombre) && vacioONulo($scope.datos.descripcion)) 
			$modalInstance.close($scope.datos);
	}

	$scope.cancel = function(){
    	$modalInstance.dismiss('cancel');
	}
};

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

function vacioONulo(data){
	if(data != null && data!= "" && data != "undefined")	
		return true;		
	return false;
}