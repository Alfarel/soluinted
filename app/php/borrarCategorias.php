<?php
	include 'conectarDb.php';
	$con = conectar();
	$data = file_get_contents("php://input");
	$objData = json_decode($data, true);

	$datos = mysqli_query($con, "SELECT * FROM productos WHERE Categoria ='".$objData["categoria"]."'");
	$count= mysqli_num_rows($datos);
	if($count > 0){
		echo "No";
	}else{
		mysqli_query($con, "DELETE FROM categorias WHERE idCategoria ='".$objData["categoria"]."'");
		echo "Si";
	}

?>