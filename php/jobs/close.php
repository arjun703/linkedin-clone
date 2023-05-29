<?php 
sleep(2);

session_start();

$id = $_GET['jobId'];

$loginName =$_SESSION['loginName'];

$query = "UPDATE jobs SET active_status = 0 WHERE id = $id AND job_poster = '$loginName' ";

include('../db.php');

if(connectToDatabase($query)){
	echo json_encode(array());
}


 ?>