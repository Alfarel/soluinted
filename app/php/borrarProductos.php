<?php
	$data = file_get_contents("php://input");

	$objData = json_decode($data, true);

	$mi_json2 = file_get_contents("../json/productos.json");
	$productos = json_decode($mi_json2, true);	

	$resultado = revisaCoincidencias($objData["nombre_producto"], $productos);

	$nuevo_arreglo = "";
	if(is_numeric($resultado)){
		for($i =0 ; $i<count($productos); $i++){
			if($i != $resultado){
				$nuevo_arreglo[]  =array('fechaSubida' => $productos[$i]["fechaSubida"],'nombre_producto' => $productos[$i]["nombre_producto"],'Categorias' => $productos[$i]["Categorias"], 'Caracteristicas' => $productos[$i]["Caracteristicas"], 'Imagenes' => $productos[$i]["Imagenes"]);	
			}
		}
		file_put_contents('../json/productos.json', json_encode($nuevo_arreglo));
		echo 1;
	}
	echo 0;


	function revisaCoincidencias($valor, $producto){
		$x = "";
		if(count($producto)>0){
			for($i =0 ; $i<count($producto); $i++){
				$x = $producto[$i]["nombre_producto"];
				if($x == $valor){
					return $i;
				}
			}
		}
		return "No";
	}

?>