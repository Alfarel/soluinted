<?php
	include "conectarDb.php";
	$con = conectar();

	$consulta = mysqli_query($con, "SELECT * FROM Productos");
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
    	echo json_encode($rows);

   //  	$urls_datos[] = array();
			// $caracteristicas_datos[] = array();
			// $consulta_caracteristicas = null;
			// $consulta_urls = null;			


			// $id = $fila["idProductos"];
			// echo $fila["idProductos"]." ->";
			// $consulta_caracteristicas = mysqli_query($con, "SELECT * FROM caracteristicas_productos WHERE Producto='".$fila["idProductos"]."'");
			// $count_caracteristicas= mysqli_num_rows($consulta_caracteristicas);
			// if($count_caracteristicas > 0){
			// 	while($car = mysqli_fetch_assoc($consulta_caracteristicas)) {
			// 		if($car["Producto"]== $fila["idProductos"])
			// 			$caracteristicas_datos[] = $car;
			// 	}
				
			// }else { $caracteristicas_datos = ""; }	

			// $consulta_urls = mysqli_query($con, "SELECT * FROM imagenes_productos WHERE Productos_idProductos='".$fila["idProductos"]."'");
			// $count_urls = mysqli_num_rows($consulta_urls);

			// if($count_urls > 0){
			// 	while($car = mysqli_fetch_assoc($consulta_urls)) {
			// 		if($car["Productos_idProductos"]==$fila["idProductos"])
			// 			$urls_datos[] = $car;
			// 	}
			// 	print_r($urls_datos);
			// }else { $urls_datos = ""; }	

			// $rows[] = array('idProducto' => $fila["idProductos"], 'Fecha' => $fila["Fecha"], 'Nombre' => $fila["Nombre"], 'Categoria' => $fila["Categoria"], 'Caracteristicas' => $caracteristicas_datos, 'Imagenes' => $urls_datos );
			
			// $fila[] = array();
	}

?>