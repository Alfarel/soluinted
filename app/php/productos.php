<?php

$nombre = $_POST["nombre"];
$categoria = $_POST["categoria"];
$caracteristicas = $_POST["caracteristicas"];


if(isset($_FILES["file"])){

	 $files = $_FILES['file'];

	 $name = $_FILES['file']['name'];
	 $tmp_name   = $_FILES['file']['tmp_name']; 
	 $size       = $_FILES['file']['size']; 

	if(move_uploaded_file($tmp_name,$name)){
        	echo " uploaded file: " . "images/" . $name. "   ------";
    }		
    else{
    	echo $name;
    }
}
else{
	echo "NOooo";
}

?>