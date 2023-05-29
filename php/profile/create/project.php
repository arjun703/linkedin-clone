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


$query = "INSERT INTO `projects`(`login_name`, `project_name`, `description`, `link`) VALUES ('$loginName','$title','$descriptioon','$link') ";


if(connectToDatabase($query)){
	$query = "SELECT * FROM projects WHERE login_name = '$loginName' ORDER BY last_modified_at DESC limit 1 ";

	echo(json_encode(mysqli_fetch_assoc(connectToDatabase($query))));
	
}





 ?>