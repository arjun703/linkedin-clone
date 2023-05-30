<?php
session_start();
if(isset($_SESSION['loginName']) && isset($_GET['id']) && is_numeric($_GET['id'])){
	$id = $_GET['id'];
	$loginName = $_SESSION['loginName'];

	$query = "INSERT INTO applications (login_name, job_id) 
				VALUES ( '$loginName', '$id' ) ";

	include '../db.php';

	if(connectToDatabase($query)){

		$query = "UPDATE jobs SET num_applicants = num_applicants + 1 WHERE id = $id ";

		connectToDatabase($query);

		echo(json_encode(array()));
	}
	else{
		echo(json_encode(array('error' => 'Unknown database error!')));
	}
}
else{
	die(json_encode(array('error' => 'Error')));
}


 ?>