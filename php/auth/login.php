<?php

sleep(1.5);
session_start();


if(isset($_GET['loginLoginName']) && isset($_GET['loginPassword'])){
	$loginName = trim(htmlspecialchars($_GET['loginLoginName']));
	$password = trim($_GET['loginPassword']);

	if(empty($loginName) || empty($password)){
		echo json_encode(array('error' => true));
	}
	else{
		$query = "SELECT login_name from users WHERE 
					login_name = '".$loginName."' AND 
					password = '".sha1($password)."' ";


		include('../db.php');

		if(mysqli_num_rows(connectToDatabase($query)) == 1){
			echo json_encode(array());
			$_SESSION['loginName'] = $loginName;
		}
		else{
			echo json_encode(array('error' => true));
		}
	}
}
else{
	echo json_encode(array('error' => true));
}


 ?>