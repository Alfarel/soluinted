<?php
	$data = file_get_contents("php://input");

	$objData = json_decode($data, true);

	$mi_json = file_get_contents("../json/categorias.json");
	$datos = json_decode($mi_json, true);

	$resultado = revisaCoincidencias($objData["nombre"], $datos);
	echo $resultado;

	if(is_numeric($resultado)){
		$datos[$resultado]["descripcion"] = $objData["descripcion"];
		
	}else{
		$datos[] = array('Fecha' => date("d-m-Y"),'NombreCategoria' => $objData["nombre"],'descripcion' => $objData["descripcion"]);	
	}

	file_put_contents('../json/categorias.json', json_encode($datos));

	//$result = array_merge((array)$datos, (array)$nuevos_datos);
	function revisaCoincidencias($valor, $categorias){
		$x = "";
		if(count($categorias)>0){
			for($i =0 ; $i<count($categorias); $i++){
				$x = $categorias[$i]["NombreCategoria"];
				if($x == $valor){
					return $i;
				}
			}
		}
		return "No";
	}

?>