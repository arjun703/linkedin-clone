<?php 

session_start();

if(isset($_SESSION['loginName'])){
	
	$loginName  =$_SESSION['loginName'];

	$query = "SELECT `creator`,  `company_name`, `company_location`, `company_website`, `category`, `company_about`, `company_email`, `contact_number`, `active_status` FROM `companies` WHERE creator = '".$loginName."' ";
	
	require '../db.php';

	die(json_encode(mysqli_fetch_assoc(connectToDatabase($query))));


}




 ?>