<?php 

session_start();

$id = $_GET['id'];



$query = " SELECT company_website, company_name, creator, active_status FROM companies WHERE id = $id";
include '../db.php';

$row = mysqli_fetch_assoc(connectToDatabase($query));

$companyWebsite = $row['company_website'];
$creator = $row['creator'];
$active_status = $row['active_status'];
$company_name = $row['company_name'];



$preQuery = "SELECT Distinct j.* ,  c.company_name, c.id as company_id ";

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

	$preQuery .= " WHERE j.active_status = 1 AND j.company_website = '$companyWebsite' ";


	$postQuery =  " ORDER BY j.id DESC LIMIT 10";

	$query = $preQuery . $postQuery;

	$jobs = [];

	$result = connectToDatabase($query);

	while($row = mysqli_fetch_assoc($result)){
		array_push($jobs, $row);
	}

	echo json_encode(array('company_name' => $company_name, 'active_status' => $active_status, 'id' => $id, 'creator'=> $creator,'jobs' => $jobs));


 ?>