<?php 
sleep(1);
session_start();

/*
// Iterate over all cookies
foreach ($_COOKIE as $cookieName => $cookieValue) {
    // Set the cookie expiration time to the past to delete it
    setcookie($cookieName, '', time() - 3600);
    
    // Unset the cookie variable
    unset($_COOKIE[$cookieName]);
}
*/




	include 'db.php';

	$position = '';
	$location = '';


	if(isset($_COOKIE['location']) && isset($_COOKIE['position'])){
		$position = $_COOKIE['position']; $location = $_COOKIE['location'];

		$needToFormSecondQuery = true;

	}
	else{
		
		$needToFormSecondQuery = false;

		if(isset($_SESSION['loginName'])){
			//access the most recent search;
		}
	}

	$query = querybuilder($position, $location);


	$result = connectToDatabase($query);

	$jobs = [];

	while($row = mysqli_fetch_assoc($result)){
		array_push($jobs, $row);
	}

	echo (json_encode($jobs));

 ?>