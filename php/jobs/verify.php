<?php 


session_start();

if(isset($_GET['token'])){
	include('../db.php');

	$token = htmlspecialchars(trim($_GET['token']));
	$result= checkIfTheUserHasPendingJob();
	$row = mysqli_fetch_assoc($result);
	$jobId = $row['id'];

	$tokenActual = $row['token'];

	if($token == $tokenActual ){
		// verified
		 echo(json_encode(array('jobVerified' => true)));


		 $query = "UPDATE `jobs` SET `active_status` = 1, `verified`=1 WHERE id = ".$jobId." ";

		 connectToDatabase($query);


	}
	else{
		die(json_encode(array('error' => 'Invalid code' )));
	}
}


 ?>