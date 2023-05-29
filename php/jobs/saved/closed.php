<?php 
	

	session_start();

	$loginName = $_SESSION['loginName'];


	$preQuery = "SELECT Distinct j.*, c.company_name, c.id as company_id ";
		
	$preQuery .= ",  'false' AS has_applied ";

	$preQuery .= " FROM jobs j 
					
					INNER JOIN companies  c ON j.company_website = c.company_website ";

	$filter = " WHERE  j.job_poster = '$loginName' AND j.verified = 1 and j.active_status = 0 ";

	$postQuery =  "  ORDER BY j.id DESC LIMIT 10";


	$query = $preQuery. $filter .  $postQuery;
	

	$closed  = [];

	include '../../db.php';

	$results = connectToDatabase($query);

	while($row = mysqli_fetch_assoc($results)){
		array_push($closed, $row);
	}

	die(json_encode($closed));

 ?>