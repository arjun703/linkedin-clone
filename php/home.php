<?php 

session_start();

include 'db.php';

	$preQuery = "SELECT Distinct j.id, c.id as company_id, j.for_company, j.position, j.location, j.job_type, j.job_site, j.education_level, j.description, j.location, j.num_applicants 
		FROM jobs j
		INNER JOIN companies  c ON j.company_website = c.company_website 
		WHERE j.active_status = 1 ";

	$postQuery = " ORDER BY num_applicants DESC LIMIT 10";



	if(isset($_SESSION['loginName'])){

	}
	else{
		$query = $preQuery.$postQuery;
	}

	$result = connectToDatabase($query);

	$jobs = [];

	while($row = mysqli_fetch_assoc($result)){
		array_push($jobs, $row);
	}

	echo (json_encode($jobs));





 ?>