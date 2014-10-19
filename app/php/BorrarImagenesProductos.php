<?php
	$data = file_get_contents("php://input");
	$objData = json_decode($data, true);

	include 'conectarDb.php';
	$con = conectar();

	mysqli_query($con, "DELETE FROM imagenes_productos WHERE idImagenes='".$objData["idImagenes"]."'");
?>