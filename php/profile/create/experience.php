<?php 


session_start();
// Apply htmlspecialchars() to all elements in $_POST
foreach ($_POST as $key => $value) {
    $_POST[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$position = $_POST['experienceFormPosition'];

$company = $_POST['experienceFormCompany'];

$fromm = $_POST['experienceFormFrom'];

include '../../db.php';

if(isEmpty($position, $company, $fromm)){
	die(json_encode(array('error' => 'Some filds have error!')));
}

$loginName  = $_SESSION['loginName'];


$too = $_POST['experienceFormTo'];

$taskDescription  =$_POST['experienceFormTaskDescription'];



if(isset($_POST['experienceFormCb'])){
	$currentlyWorkingHere  = 1 ;

	$query = "INSERT INTO `experiences`( `login_name`, `position`, `company`, `_from`, `description`, `currently_working_here`) VALUES ('$loginName','$position','$company','$fromm','$taskDescription',1)";

	$too = '';

}else{

if(isEmpty($too)){
	die(json_encode(array('error'=>'Error in \'To\' field!')));
}



	$query = "INSERT INTO `experiences`( `login_name`, `position`, `company`, `_from`, `_to`, `description`, `currently_working_here`) VALUES ('$loginName','$position','$company','$fromm', '$too', '$taskDescription',0)";

}


if(connectToDatabase($query)){
	
	$query = "SELECT * FROM experiences WHERE login_name = '$loginName' ORDER BY last_modified_at DESC limit 1 ";

	echo(json_encode(mysqli_fetch_assoc(connectToDatabase($query))));

}





 ?>