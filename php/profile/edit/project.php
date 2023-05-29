<?php

session_start();

// Apply htmlspecialchars() to all elements in $_POST
foreach ($_POST as $key => $value) {
    $_POST[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}


$title = $_POST['projectFormTitle'];

$link = $_POST['projectFormLink'];

$descriptioon = $_POST['descriptioon'];

$id = $_POST['projectId'];

include '../../db.php';

if(isEmpty($title, $link, $descriptioon)){
	die(json_encode(array('error' => 'Some filds have error!')));
}

$loginName  = $_SESSION['loginName'];

$query = "UPDATE projects SET `project_name`='$title',`description`='$descriptioon',`link`='$link' WHERE id = $id  AND login_name = '$loginName' ";

if(connectToDatabase($query)){
	echo(json_encode(array(
		'id'                      => $id,
		'login_name'              => $loginName,
		'project_name'            => $title,
		'link'                    => $link,
		'description'             => $descriptioon,
	)));
}

 ?>