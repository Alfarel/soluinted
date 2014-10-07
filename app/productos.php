<?php

$nombre = $_POST["nombre"];
$categoria = $_POST["categoria"];
$caracteristicas = $_POST["caracteristicas"];


if(isset($_FILES["file"])){

	// $json = file_get_contents("json/productos.json");
	// $productos_existentes = json_decode($json, true);
	
	
	
	include "/php/conectarDb.php";
	$con = conectar();
	//echo $_POST["categoria"];

	$query_categoria = mysqli_query($con, "SELECT idCategoria FROM Categorias WHERE Nombre='".$categoria."'");
	$cat= $query_categoria->fetch_row()[0];

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

		$url = subir_foto($cat."-".$nombre);
		if($url != false){

			$arrayName = array($url);
			
			mysqli_query($con,"INSERT INTO Productos (Fecha, Nombre, Categoria) VALUES ('".$date."','".$nombre."','".$cat."')");
			
			$idInsercion = mysqli_insert_id($con);

			mysqli_query($con, "INSERT INTO Imagenes_productos (Url, Productos_idProductos) VALUES ('".$url."','".$idInsercion."')");


			printf($caracteristicas);
			$descripciones = json_decode($caracteristicas, true);
			for ($i=0; $i < count($descripciones); $i++) {
				echo $descripciones[$i];
				mysqli_query($con, "INSERT INTO Caracteristicas_productos (Descripcion, Producto) VALUES ('".$descripciones[$i]."','".$idInsercion."')");
			}
			// $productos_existentes[] = array('fechaSubida' => date("d-m-Y"),'nombre_producto' => $nombre, 'Categorias' => $categoria, 'Caracteristicas' => json_decode($caracteristicas), 'Imagenes' => $arrayName);
			// file_put_contents("json/productos.json", json_encode($productos_existentes));	
		}
		else{
			mysqli_query($con,"INSERT INTO Productos (Fecha, Nombre, Categoria) VALUES ('".$date."','".$nombre."','".$cat."')");	
		}		
	}
	else {
		$url = subir_foto($cat."-".$nombre);
		//$arreglo_imagenes = array($productos_existentes[$posicion]["Imagenes"]);
		if($url != false){

			// $arreglo_imagenes[] = array($url);	
			// $productos_existentes[$posicion]["Imagenes"] = $arreglo_imagenes;
			// file_put_contents("json/productos.json", json_encode($productos_existentes));		
		}
		else{
			echo "No";
		}		
	}

	mysqli_close($con);
}
else{
	echo "NOooo";
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