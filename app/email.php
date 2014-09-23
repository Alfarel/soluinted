<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
// $email and $message are the data that is being
// posted to this page from our html contact form

$nombre = $_REQUEST['nombre'] ;
$email = $_REQUEST['email'] ;
$celular = $_REQUEST['celular'] ;
$asunto = $_REQUEST['asunto'] ;
$mensaje = $_REQUEST['mensaje'] ;


//$asunto= $_REQUEST['asunto'];
/*$foo = empty($_POST['foo'])?'default foo':$_POST['foo'];
if(empty($_POST['asunto'])) {
  $asunto = "default asunto";
} else {
  $asunto = $_POST['asunto'];
}*/
// When we unzipped PHPMailer, it unzipped to
// public_html/PHPMailer_5.2.0
require_once 'phpmailer/PHPMailerAutoload.php';

if (isset($_POST['nombre']) && isset($_POST['email']) && isset($_POST['celular']) && 
    isset($_POST['asunto']) && isset($_POST['mensaje'])) {

    //check if any of the inputs are empty
    if (empty($_POST['nombre']) || empty($_POST['email']) || empty($_POST['celular']) || 
    	empty($_POST['asunto']) || empty($_POST['mensaje'])) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

	$mail = new PHPMailer();
	// set mailer to use SMTP
	//$mail->IsSMTP();   
	$mail->SMTPSecure = 'ssl';
	//Port should be 465

	$mail->Port=995;
	//Change your host to:

	$mail->Host='gator4082.hostgator.com';

	// As this email.php script lives on the same server as our email server
	// we are setting the HOST to localhost
	//$mail->Host = "smtp.gmail.com";  // specify main and backup server

	$mail->SMTPAuth = true;     // turn on SMTP authentication

	// When sending email using PHPMailer, you need to send from a valid email address
	// In this case, we setup a test email account with the following credentials:
	// email: send_from_PHPMailer@bradm.inmotiontesting.com
	// pass: password
	$mail->Username = "ventas@soluinted.com";  // SMTP username
	$mail->Password = "dr349&%5B$"; // SMTP password

	// $email is the user's email address the specified
	// on our contact us page. We set this variable at
	// the top of this page with:
	// $email = $_REQUEST['email'] ;
	$mail->From = $email;
	$mail->FromName=$nombre;

	// below we want to set the email address we will be sending our email to.
	$mail->AddAddress('ventas@soluinted.com', 'Soluinted');

	// set word wrap to 50 characters
	$mail->WordWrap = 50;
	// set email format to HTML
	$mail->IsHTML(true);
	
	$mail->Subject = $asunto;

	// $message is the user's message they typed in
	// on our contact us page. We set this variable at
	// the top of this page with:
	// $message = $_REQUEST['message'] ;

	$mail->Body    = "<b>Datos del correo.</b><br/> "
					."<br/><b>Nombre : </b> ".$nombre
					."<br/><b>Email : </b>".$email
					."<br/><b>Celular : </b>".$celular
					."<br/><b>Mensaje : </b>".$mensaje
					."<br/><br/><b>Soluinted - Ventas <b><br/>soluinted.com<br/>Celular : 313 347 2165
					<br/>Email : ventas@soluinted.com
					<br/>Villavicencio - Colombia";
	$mail->AltBody = '';

	if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Tu mensaje se ha enviado! Uno de nuestros asesores se comunicará contigo.');
    echo json_encode($data);
}
else {
    $data = array('success' => false, 'message' => 'Por favor llene todos los campos.');
    echo json_encode($data);

}
/*
if(!$mail->Send())
{
   echo "Message could not be sent. <p>";
   echo "Mailer Error: " . $mail->ErrorInfo;
   exit;
}

echo "Message has been sent";
?>*/