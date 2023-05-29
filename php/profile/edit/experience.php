<?php


session_start();

// Apply htmlspecialchars() to all elements in $_POST
foreach ($_POST as $key => $value) {
    $_POST[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}


$position = $_POST['experienceFormPosition'];

$company = $_POST['experienceFormCompany'];

$fromm = $_POST['experienceFormFrom'];

$id = $_POST['id'];

include '../../db.php';

if(isEmpty($position, $company, $fromm)){
	die(json_encode(array('error' => 'Some filds have error!')));
}

$loginName  = $_SESSION['loginName'];

$taskDescription  = $_POST['experienceFormTaskDescription'];

if(isset($_POST['experienceFormCb'])){
	$currentlyWorkingHere  = 1 ;
	$too = '';
}else{
	$too = $_POST['experienceFormTo'];
	if(isEmpty($too)){
		die(json_encode(array('error'=>'Error in \'To\' field!')));
	}
	$currentlyWorkingHere = 0;
}


$query = "UPDATE `experiences` SET `position`='$position',`company`='$company',`_from`='$fromm',`_to`='$too',`description`='$taskDescription',`currently_working_here`= $currentlyWorkingHere WHERE login_name = '$loginName' AND id = '$id' ";

if(connectToDatabase($query)){
	echo(json_encode(array(
		'id'                      => $id,
		'login_name'              => $loginName,
		'position'                => $position,
		'company'                 => $company,
		'_from'                   => $fromm,
		'_to'                     => $too,
		'description'             => $taskDescription,
		'currently_working_here'  => $currentlyWorkingHere
	)));
}

 ?>