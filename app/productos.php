<?php

$nombre = $_POST["nombre"];
$categoria = $_POST["categoria"];
$caracteristicas = $_POST["caracteristicas"];

include "/php/conectarDb.php";
	$con = conectar();

if(isset($_FILES["file"])){	
	
	$query_productos_existentes = mysqli_query($con,"SELECT * FROM Productos");
	$count= mysqli_num_rows($query_productos_existentes);

	if($count >=1){		
		while($fila = mysqli_fetch_assoc($query_productos_existentes)) {
    		$rows[] = $fila;
    	}
    	$posicion = revisa_coincidencias($nombre,$rows);
	}else $posicion = false;


	$date = date('Y-m-d');
	if(!is_numeric($posicion)){

		$url = subir_foto($categoria."-".$nombre);
		if($url != false){

			$arrayName = array($url);
			
			mysqli_query($con,"INSERT INTO Productos (Fecha, Nombre, Categoria) VALUES ('".$date."','".$nombre."','".$categoria."')");
			
			$idInsercion = mysqli_insert_id($con);

			mysqli_query($con, "INSERT INTO Imagenes_productos (Url, Productos_idProductos) VALUES ('".$url."','".$idInsercion."')");


			
			$descripciones = json_decode($caracteristicas, true);
			ECHO json_encode($descripciones);
			for ($i=0; $i < count($descripciones); $i++) {
				mysqli_query($con, "INSERT INTO Caracteristicas_productos (Descripcion, Producto) VALUES ('".$descripciones[$i]."','".$idInsercion."')");
			}			
		}
		else{
			mysqli_query($con,"INSERT INTO Productos (Fecha, Nombre, Categoria) VALUES ('".$date."','".$nombre."','".$categoria."')");	
		}		
	}
	else {
		$url = subir_foto($categoria."-".$nombre);		
		if($url != false){
			mysqli_query($con,"UPDATE Productos SET Categoria = '".$categoria."' WHERE nombre='".$nombre."'");	

			$query_producto = mysqli_query($con, "SELECT idProductos FROM Productos WHERE Nombre='".$nombre."' AND Categoria ='".$categoria."'");
			$idActualizado= $query_producto->fetch_row()[0];

			$query_caracteristicas = mysqli_query($con, "SELECT * FROM Caracteristicas_productos");
			$count= mysqli_num_rows($query_caracteristicas);

			if($count >=1){		
				while($fila = mysqli_fetch_assoc($query_caracteristicas)) {
		    		$caracteristicas_diligenciadas[] = $fila;
		    	}
		    	$descripciones = json_decode($caracteristicas, true); 
				for ($i=0; $i < count($descripciones); $i++) {
					if(is_string($descripciones[$i])){						
						mysqli_query($con, "INSERT INTO Caracteristicas_productos (Descripcion, Producto) VALUES ('".$descripciones[$i]."','".$idActualizado."')");						
					}
				}
	    	}else{
	    		for ($i=0; $i < count($descripciones); $i++) {
					mysqli_query($con, "INSERT INTO Caracteristicas_productos (Descripcion, Producto) VALUES ('".$descripciones[$i]."','".$idActualizado."')");
				}	
	    	}
			mysqli_query($con, "INSERT INTO Imagenes_productos (Url, Productos_idProductos) VALUES ('".$url."','".$idActualizado."')");				
		}
		else{
			echo "No";
		}		
	}

	mysqli_close($con);
}
else{
	$query_productos_existentes = mysqli_query($con,"SELECT * FROM Productos");
	$count= mysqli_num_rows($query_productos_existentes);

	if($count >=1){		
		while($fila = mysqli_fetch_assoc($query_productos_existentes)) {
    		$rows[] = $fila;
    	}
    	$posicion = revisa_coincidencias($nombre,$rows);
	}else $posicion = false;

	$date = date('Y-m-d');

	if(!is_numeric($posicion)){
		mysqli_query($con,"INSERT INTO Productos (Fecha, Nombre, Categoria) VALUES ('".$date."','".$nombre."','".$categoria."')");
		$idInsercion = mysqli_insert_id($con);

		for ($i=0; $i < count($descripciones); $i++) {
			mysqli_query($con, "INSERT INTO Caracteristicas_productos (Descripcion, Producto) VALUES ('".$descripciones[$i]."','".$idInsercion."')");
		}
	}else { 
		mysqli_query($con,"UPDATE Productos SET Categoria = '".$categoria."' WHERE nombre='".$nombre."'");

		$query_producto = mysqli_query($con, "SELECT idProductos FROM Productos WHERE Nombre='".$nombre."' AND Categoria ='".$categoria."'");
			$idActualizado= $query_producto->fetch_row()[0];

		$query_caracteristicas = mysqli_query($con, "SELECT * FROM Caracteristicas_productos");
			$count= mysqli_num_rows($query_caracteristicas);

			if($count >=1){		
				while($fila = mysqli_fetch_assoc($query_caracteristicas)) {
		    		$caracteristicas_diligenciadas[] = $fila;
		    	}
		    	$descripciones = json_decode($caracteristicas, true); 
				for ($i=0; $i < count($descripciones); $i++) {
					if(is_string($descripciones[$i])){						
						mysqli_query($con, "INSERT INTO Caracteristicas_productos (Descripcion, Producto) VALUES ('".$descripciones[$i]."','".$idActualizado."')");						
					}
				}
	    	}else{
	    		for ($i=0; $i < count($descripciones); $i++) {
					mysqli_query($con, "INSERT INTO Caracteristicas_productos (Descripcion, Producto) VALUES ('".$descripciones[$i]."','".$idActualizado."')");
				}	
	    	}
	}
}

///////////////////////////////////////////////////////////////Metodos
function revisa_coincidencias_caracteristicas($mensaje,$posicion, $rows){	
		if($rows[$posicion] != $mensaje){
			print("aqui si ta"+ $mensaje);
			return false;
		}	
	return true;
}

function subir_foto($parteUrl){
	//SEGURO
	 $files = $_FILES['file'];

	 $name = $_FILES['file']['name'];
	 $tmp_name   = $_FILES['file']['tmp_name']; 
	 $size       = $_FILES['file']['size']; 

	 $dir = "images/".$parteUrl."-".$name;
	if(move_uploaded_file($tmp_name, $dir)){
	    	return $dir;
    }		
    else{
    	return false;
    }
    return false;
}

function revisa_coincidencias($nombre, $productos_existentes){
	$x= "";
	if(count($productos_existentes)>=1){
		for($i=0;$i<count($productos_existentes);$i++){ 
			$x = $productos_existentes[$i]["Nombre"];
			if(!is_null($x)){
				if($x == $nombre){
					return $i;
				}	
			}		
		}
	}
	return false;
}
?>