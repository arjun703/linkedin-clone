<?php 
session_start();
if(isset($_SESSION['loginName'])){

	include '../db.php';

	$loginName = $_SESSION['loginName'];


	$queryForProfileVisitCount = "SELECT count(id) as profileVisitsCount from profile_visits WHERE being_visited = '".$loginName."' ";

	$row = mysqli_fetch_assoc(connectToDatabase($queryForProfileVisitCount));

	$profileVisitsCount = $row['profileVisitsCount'];

	$queryForCVdownloadCount = "SELECT count(id) as CVdownloadsCount from cv_downloads WHERE of = '".$loginName."' ";

	$row = mysqli_fetch_assoc(connectToDatabase($queryForCVdownloadCount));

	$CVdownloadsCount = $row['CVdownloadsCount'];

	$queryForHasCompanyPage = "SELECT active_status FROM companies WHERE 
								creator = '".$loginName."' ";

	$result = connectToDatabase($queryForHasCompanyPage);

	if(mysqli_num_rows($result) == 1 ){
		$hasCompanyPage = true;
	}
	else{
		$hasCompanyPage = false;
	}

	echo json_encode(array('hasCompanyPage' => $hasCompanyPage , 'profileVisitsCount' => $profileVisitsCount, 'CVdownloadsCount' => $CVdownloadsCount, 'loginName' => $loginName));	
}
else{
	echo json_encode(array('isNotLoggedIn' => true));
}


 ?>