<?php

	function conectar(){
		$conexion = mysqli_connect('localhost','root','', 'soluinted') or die ("Se produjo un error, vuelva a intentarlo");		
		return $conexion;
	} 
	
?>