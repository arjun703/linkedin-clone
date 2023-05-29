<?php 
	
	session_start();



	include '../db.php';

	$position = ''; $location = '';

	if(isset($_COOKIE['position']) && $_COOKIE['location']){
		$position = $_COOKIE['position']; $location = $_COOKIE['location'];
	}

	$query = queryBuilder($_COOKIE['position'], $_COOKIE['location']);

	

	$results = connectToDatabase($query);

	$jobs = [];

	while($row = mysqli_fetch_assoc($results)){
		array_push($jobs, $row);
	}


	echo(json_encode($jobs));

 ?>