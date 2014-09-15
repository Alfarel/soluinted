<?php
	$data = file_get_contents("php://input");

	$objData = json_decode($data, true);

	$mi_json = file_get_contents("../json/categorias.json");
	$datos = json_decode($mi_json);

	$datos[] = array('Fecha' => date("d-m-Y"),'NombreCategoria' => $objData["nombre"],'descripcion' => $objData["descripcion"]);

	//$result = array_merge((array)$datos, (array)$nuevos_datos);

	file_put_contents('../json/categorias.json', json_encode($datos));

?>