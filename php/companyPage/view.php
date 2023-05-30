<?php 

$id = $_GET['id'];

	
	$query = "SELECT `creator`, `id`, `company_name`, `company_location`, `company_website`, `category`, `company_about`, `company_email`, `contact_number`, `active_status` FROM `companies` WHERE id = $id ";
	
	require '../db.php';

	die(json_encode(mysqli_fetch_assoc(connectToDatabase($query))));






 ?>