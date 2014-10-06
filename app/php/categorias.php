<?php
	$data = file_get_contents("php://input");

	$objData = json_decode($data, true);

	// $mi_json = file_get_contents("../json/categorias.json");
	// $datos = json_decode($mi_json, true);	

	

	include 'conectarDb.php';
	$con = conectar();

	//repitiendo codigo
	$consulta = mysqli_query($con, "SELECT * FROM categorias");

	$count= mysqli_num_rows($consulta);
	
	if($count >= 1){
		while($fila = mysqli_fetch_assoc($consulta)) {
    		$rows[] = $fila;
    	}
    	$resultado = revisaCoincidencias($objData["nombre"], $rows);
	
		if(is_numeric($resultado)){			
			mysqli_query($con, "UPDATE categorias SET Descripcion ='".$objData["descripcion"]."' WHERE Nombre='".$objData["nombre"]."'");
			//$datos[$resultado]["descripcion"] = $objData["descripcion"];		
		}else{		
			$date = date('Y-m-d');
			mysqli_query($con,"INSERT INTO categorias (Fecha, Nombre, Descripcion) VALUES ('".$date."','".$objData["nombre"]."','".$objData["descripcion"]."')");
		}	
	}
	else{
		echo "";
	}	
		
	mysqli_close($con);
	//file_put_contents('../json/categorias.json', json_encode($datos));

	//$result = array_merge((array)$datos, (array)$nuevos_datos);
	function revisaCoincidencias($valor, $categorias){
		$x = "";
		if(count($categorias)>0){
			for($i =0 ; $i<count($categorias); $i++){
				$x = $categorias[$i]["Nombre"];
				if($x == $valor){
					return $i;
				}
			}
		}
		return "No";
	}

?>
