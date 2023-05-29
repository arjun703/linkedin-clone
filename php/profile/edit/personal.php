<?php
session_start();
$loginName  = $_SESSION['loginName'];


// Apply htmlspecialchars() to all elements in $_POST
foreach ($_POST as $key => $value) {
    $_POST[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}


$name = $_POST['editPersonalName'];
$summary = $_POST['editPersonalSummary'];
$email = $_POST['editPersonalEmail'];
$phone = $_POST['editPersonalPhone'];
$website = $_POST['editPersonalWebsite'];

include '../../db.php';

if(isEmpty($name, $summary, $website, $email, $phone)  ){
				
				die (json_encode(array('error' => 'Error - Insufficient field length.')));
			
}

$query = "UPDATE `users` SET `name`='$name',`summary`='$summary',`email`='$email',`website`='$website',`phone`='$phone' WHERE login_name = '$loginName' ";


if(connectToDatabase($query)){
	echo(json_encode(array('name' => $name, 'login_name' => $loginName, 'summary' => $summary, 'email' => $email, 'website' => $website, 'phone' => $phone)));
}
else{
	echo(json_encode(array('error' => 'Database error!')));
}


 ?>