<?php 
	
	session_start();

	$loginName = $_SESSION['loginName'];

	$preQuery = "SELECT Distinct j.*,  c.company_name, a.id as a_id,  c.id as company_id ";
		
	$preQuery .= ",  'true' AS has_applied ";

	$preQuery .= " FROM applications a 

					INNER JOIN jobs j ON a.job_id = j.id
					
					INNER JOIN companies  c ON j.company_website = c.company_website ";

	$postQuery =  " WHERE a.login_name = '$loginName' ORDER BY a_id DESC LIMIT 10";

	$query = $preQuery.$postQuery;

	$applications  = [];

	include '../../db.php';

	$results = connectToDatabase($query);

	while($row = mysqli_fetch_assoc($results)){
		array_push($applications, $row);
	}

	die(json_encode($applications));

 ?>