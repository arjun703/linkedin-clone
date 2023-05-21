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

	echo json_encode(array('profileVisitsCount' => $profileVisitsCount, 'CVdownloadsCount' => $CVdownloadsCount, 'loginName' => $loginName));	
}
else{
	echo json_encode(array('isNotLoggedIn' => true));
}


 ?>