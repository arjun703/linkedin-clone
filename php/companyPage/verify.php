<?php 
session_start();
if(isset($_SESSION['loginName']) && isset($_GET['code'])){

	$loginName = $_SESSION['loginName'];
	$code  = $_GET['code'];

	include '../db.php';

	$query = "SELECT token from companies WHERE creator = '".$loginName."' AND token = '".$code."' ";


	if(mysqli_num_rows(connectToDatabase($query)) == 1){
		
		$query = "UPDATE `companies` SET `active_status`= 1 WHERE creator = '".$loginName."' "; 

		connectToDatabase($query);

		die(json_encode(array('companyPageVerified' => true)));


	}
	else{
		die(json_encode(array('error' => 'Invalid Code')));
	}
}
else{
	die(json_encode(array('error' => true)));
}	



 ?>