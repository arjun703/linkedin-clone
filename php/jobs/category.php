<?php 

$category = $_GET['category'];

	$preQuery = "SELECT Distinct j.*, c.company_name, c.id as company_id ";

	if(isset($_SESSION['loginName'])){
		
		$preQuery .= ",   CASE 
        				WHEN applications.login_name IS NULL THEN 'false'
        				ELSE 'true'
    					END AS has_applied ";
	}


	$preQuery .= "FROM jobs j
					INNER JOIN companies  c ON j.company_website = c.company_website ";

	if(isset($_SESSION['loginName'])){
		$loginName = $_SESSION['loginName'];
		
		$preQuery .= " LEFT JOIN applications ON j.id = 								applications.job_id
    					AND applications.login_name = '$loginName' ";
	}

	$preQuery .= " WHERE j.active_status = 1 AND j.industry = '$category' ";

	if(isset($_SESSION['loginName'])){
		$preQuery .= " AND j.job_poster != '$loginName' ";
	}

	$postQuery =  " ORDER BY j.id DESC LIMIT 10";

	$query = $preQuery . $postQuery;

	$jobs = [];

	include '../db.php';

	$result = connectToDatabase($query);

	while($row = mysqli_fetch_assoc($result)){
		array_push($jobs, $row);
	}

	echo json_encode($jobs);

 ?>