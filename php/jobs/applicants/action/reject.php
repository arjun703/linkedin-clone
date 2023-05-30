<?php 

$loginName = $_GET['loginName'];

$jobId = $_GET['jobId'];

$query = "UPDATE applications SET shortlisted = -1 WHERE login_name = '$loginName' AND job_id = $jobId ";


include ('../../../db.php') ;

if(connectToDatabase($query)){
	echo json_encode(array());
}



 ?>