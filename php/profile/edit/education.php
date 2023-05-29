<?php


session_start();

// Apply htmlspecialchars() to all elements in $_POST
foreach ($_POST as $key => $value) {
    $_POST[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}


$educationId  = $_POST['educationId'];

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

$query = "UPDATE `educations` SET `level`='$educationFormLevel',`field`='$educationFormField',`institution`='$educationFormInstitution',`_from`='$educationFormFrom',`_to`='$educationFormTo' WHERE  id = '$educationId'  AND login_name = '$loginName' ";


if(connectToDatabase($query)){
	echo(json_encode(array(
		'level'         =>   $educationFormLevel,
		'institution'   =>   $educationFormInstitution,
		'id'            =>   $educationId,
		'_to'           =>   $educationFormTo,
		'_from'         =>   $educationFormFrom,
		'field'         =>   $educationFormField,
		'login_name'    =>   $loginName

	)));
	
}





 ?>