<?php


session_start();

// Apply htmlspecialchars() to all elements in $_POST
foreach ($_POST as $key => $value) {
    $_POST[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}


$educationFormLevel = $_POST['educationFormLevel'];

$educationFormField = $_POST['educationFormField'];

$educationFormInstitution = $_POST['educationFormInstitution'];

$educationFormFrom = $_POST['educationFormFrom'];

$educationFormTo = $_POST['educationFormTo'];

include '../../db.php';

if(isEmpty($educationFormLevel, $educationFormField, $educationFormInstitution, $educationFormFrom, $educationFormTo)){
	die(json_encode(array('error' => 'Some filds have error!')));
}

$loginName  = $_SESSION['loginName'];

$query = "INSERT INTO `educations`(`login_name`, `level`, `institution`, `_from`, `_to`, `field`) VALUES ('$loginName','$educationFormLevel','$educationFormInstitution','$educationFormFrom','$educationFormTo', '$educationFormField')";

if(connectToDatabase($query)){
	$query = "SELECT * FROM educations WHERE login_name = '$loginName' ORDER BY last_modified_at DESC limit 1 ";

	echo(json_encode(mysqli_fetch_assoc(connectToDatabase($query))));
	
}

 

 ?>