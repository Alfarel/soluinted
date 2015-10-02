<?php
	
	function obtener(){
		include "conectarDb.php";
		$con = conectar();

		$consulta = mysqli_query($con, "SELECT * FROM Productos") or die(mysql_error());
		$count= mysqli_num_rows($consulta);

		$spam = "idProductos";

		if($count > 0){
			while($fila = mysqli_fetch_assoc($consulta)) {			
				$rows[] = $fila;			
	    	}
	    	if(count($rows)){
	    		$url_datos =array();
	    		$consulta_caracteristicas = null;

	    		$datos = array();

	    		for($i = 0; $i< count($rows); $i++){
	    			$caracteristicas_datos = array();
	    			$consulta_caracteristicas = mysqli_query($con, "SELECT * FROM caracteristicas_productos WHERE Producto='".$rows[$i]["idProductos"]."'"); 
	    			$count_caracteristicas= mysqli_num_rows($consulta_caracteristicas);
	    			
	    			if($count_caracteristicas> 0){
						while($car = mysqli_fetch_assoc($consulta_caracteristicas)) {
								$caracteristicas_datos[] = $car;

						}					
	    			}
	    			$rows[$i]["Caracteristicas"] = $caracteristicas_datos;
	    		}

	    		for($i = 0; $i< count($rows); $i++){
	    			$url_datos =array();
	    			$consulta_urls = mysqli_query($con, "SELECT * FROM imagenes_productos WHERE Productos_idProductos='".$rows[$i]["idProductos"]."'");
	    			$count_urls= mysqli_num_rows($consulta_caracteristicas);
	    			
	    			if($count_caracteristicas> 0){
						while($car = mysqli_fetch_assoc($consulta_urls)) {
								$url_datos[] = $car;
						}					
	    			}
	    			$rows[$i]["Imagenes"] = $url_datos;
	    		}
	    	}
	    	$thread_id = mysqli_thread_id($con);
    		mysqli_kill($con, $thread_id);
    		mysqli_close($con);
	    	return json_encode($rows);

		}
	}	
?>