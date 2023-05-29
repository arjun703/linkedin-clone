<?php 
	session_start();

	$loginName = $_SESSION['loginName'];


	$preQuery = "SELECT Distinct j.*,  c.company_name, c.id as company_id ";
		
	$preQuery .= ",  'false' AS has_applied ";

	$preQuery .= " FROM jobs j 
					
					INNER JOIN companies  c ON j.company_website = c.company_website ";

	$filter = " WHERE  j.job_poster = '$loginName' AND j.verified = 0 ";

	$postQuery =  "  ORDER BY j.id DESC LIMIT 10";


	$query1 = $preQuery. $filter .  $postQuery;
	

	$filter = " WHERE j.job_poster = '$loginName' AND j.active_status = 1 ";


	$query2 = $preQuery . $filter . $postQuery;

	$query = " ( $query1  ) UNION ( $query2 )";


	$posted  = [];

	include '../../db.php';

	$results = connectToDatabase($query);

	while($row = mysqli_fetch_assoc($results)){
		array_push($posted, $row);
	}

	die(json_encode($posted));

 ?>