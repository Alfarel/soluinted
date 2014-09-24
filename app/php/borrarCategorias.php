<?php
	$data = file_get_contents("php://input");

	$objData = json_decode($data, true);

	$mi_json = file_get_contents("../json/categorias.json");
	$datos = json_decode($mi_json, true);

	$resultado = revisaCoincidencias($objData["NombreCategoria"], $datos);

	$nuevo_arreglo = "";
	if(is_numeric($resultado)){
		for($i =0 ; $i<count($datos); $i++){
			if($i != $resultado){
				$nuevo_arreglo[]  =array('Fecha' => $datos[$i]["Fecha"],'NombreCategoria' => $datos[$i]["NombreCategoria"],'descripcion' => $datos[$i]["descripcion"]);	
			}
		}
		file_put_contents('../json/categorias.json', json_encode($nuevo_arreglo));
		echo 1;
	}
	echo 0;

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