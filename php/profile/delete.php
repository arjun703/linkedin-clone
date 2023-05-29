<?php 
session_start();
$loginName = $_SESSION['loginName'];
$table = $_GET['table'];
$id = $_GET['id'];

$query = "DELETE FROM $table WHERE login_name = '$loginName' AND id = $id ";

include '../db.php';

if(connectToDatabase($query)){
	echo(json_encode(array()));
}



 ?>