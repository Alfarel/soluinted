<?php

$nombre = $_POST["nombre"];
$categoria = $_POST["categoria"];
$caracteristicas = $_POST["caracteristicas"];


if(isset($_FILES["file"])){

	$json = file_get_contents("json/productos.json");
	$productos_existentes = json_decode($json, true);

	
	$posicion = revisa_coincidencias($nombre,$productos_existentes);
	
	if($posicion == false){

		$url = subir_foto();
		if($url != false){
			$arrayName = array($url);
			$productos_existentes[] = array('fechaSubida' => date("d-m-Y"),'nombre_producto' => $nombre, 'Categorias' => $categoria, 'Caracteristicas' => json_decode($caracteristicas), 'Imagenes' => $arrayName);
			file_put_contents("json/productos.json", json_encode($productos_existentes));	
		}
		else{
			echo "No";
		}		
	}
	else {
		$url = subir_foto();
		$arreglo_imagenes = array($productos_existentes[$posicion]["Imagenes"]);
		if($url != false){
			$arreglo_imagenes[] = array($url);	
			$productos_existentes[$posicion]["Imagenes"] = $arreglo_imagenes;
			file_put_contents("json/productos.json", json_encode($productos_existentes));		
		}
		else{
			echo "No";
		}
		
	}
}
else{
	echo "NOooo";
}

function subir_foto(){
	//SEGURO
	 $files = $_FILES['file'];

	 $name = $_FILES['file']['name'];
	 $tmp_name   = $_FILES['file']['tmp_name']; 
	 $size       = $_FILES['file']['size']; 

	 $dir = "images/".$name;
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
			$x = $productos_existentes[$i]["nombre_producto"];
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