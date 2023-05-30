<?php 

$jobId = $_GET['jobId'];
$page = $_GET['page'];
$page = $page-1;

include '../../db.php';


$preLimit = ($page) * $noOfItemsPerPage;

$query = "SELECT u.name,  u.login_name, a.id FROM applications a INNER JOIN users u ON a.login_name = u.login_name  WHERE a.job_id = $jobId AND shortlisted = 0 ORDER By a.id LIMIT $preLimit, $noOfItemsPerPage ";

$applicants = [];

$result = connectToDatabase($query);

while($row = mysqli_fetch_assoc($result)){
	array_push($applicants, $row);
}

$query = "SELECT COUNT(*) AS numApplicants from applications WHERE shortlisted = 0 and job_id = $jobId ";

$numApplicants = mysqli_fetch_assoc(connectToDatabase($query))['numApplicants'];



echo(json_encode(array('jobId'=>$jobId, 'numApplicants'=> $numApplicants, 'page'=>$page,'applicants'=>$applicants)));


 ?>