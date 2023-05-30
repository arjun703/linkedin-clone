<?php

sleep(2);

session_start();


// Apply htmlspecialchars() to all elements in $_POST
foreach ($_POST as $key => $value) {
    $_POST[$key] = htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

include '../db.php';

$name = $_POST['companyName'];
$about = $_POST['companyAbout'];
$phone = $_POST['companyPhone'];
$location = $_POST['companyLocation'];

$loginName = $_SESSION['loginName'];

if(isEmpty($name, $phone, $location) or strlen($about) < 100 ){
	die(json_encode(array('error' => 'Some filds have error!')));
}

$query = "UPDATE companies SET company_name = '$name', company_about = '$about', contact_number = '$phone', company_location = '$location' WHERE creator = '$loginName' ";

if(connectToDatabase($query)){
	echo json_encode(array());
}

 

?>
