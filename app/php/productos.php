<?php

$nombre = $_POST["nombre"];
$categoria = $_POST["categoria"];
$caracteristicas = $_POST["caracteristicas"];


if(isset($_FILES["file"])){


	

	// foreach ($_FILES["file"]["name"] as $key) {
	//     if ($error == UPLOAD_ERR_OK) {
	//         $tmp_name = $_FILES["file"]["tmp_name"][$key];
	//         $name = $_FILES["file"]["name"][$key];
	//         move_uploaded_file($tmp_name, "$uploads_dir/$name");
	//     }
	// }

	//SEGURO
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
//////////////////////////////////////////////////////////////////////

}

	
	 // for($x = 0; $x < count($files['name']); $x++) {
  //       $name       = $files['name'][$x];
  //       $tmp_name   = $files['tmp_name'][$x]; 
  //       $size       = $files['size'][$x]; 

  //       move_uploaded_file($tmp_name,"../../images/".$name);
  //       echo "Lo subi aqui ->".$files['name'][$x]	;
  //       // if (move_uploaded_file($tmp_name, "../" .$name)) {
  //   	// if(move_uploaded_file($tmp_name,"../../images/".$name)){
  //    //    	echo " uploaded file: " . "images/" . $name;
  //    //    }		
  //    //    else{
  //    //    	echo $name;
  //    //    }
            
  //       // }
  //   }

else{
	echo "NOooo";
}

?>