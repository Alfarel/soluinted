<?php
	include 'conectarDb.php';
	$con = conectar();

	$usuario = $_POST["usr"];
	$contraseña = $_POST["password"];

	$sql="SELECT * FROM usrsoluinted WHERE NombreUsuario='".$usuario."' and password='".$contraseña."'";
    $result = mysqli_query($con,$sql) or die("Error en la consulta a la bd");

    $count= mysqli_num_rows($result);   
    mysqli_close($con);
    if($count==1){
    	session_start();
    	$_SESSION["usuario"] = $usuario;
    	$_SESSION["contraseña"] = $contraseña;
       // session_register("usuario");
       // session_register("contraseña");
       header("location: ../views/admin/index.php");
    }
    else {
       header("location: ../views/admin/Login.php");
    }
?>