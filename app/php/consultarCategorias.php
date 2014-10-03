<?php
	include 'conectarDb.php';
	$con = conectar();

	$consulta = mysqli_query($con, "SELECT * FROM categorias");	
	$count= mysqli_num_rows($consulta);
	mysqli_close($con);
	if($count >= 1){
		while($fila = mysqli_fetch_assoc($consulta)) {
    		$rows[] = $fila;
    	}	
    	echo json_encode($rows);
	}
	else{
		echo "";
	}	
?>