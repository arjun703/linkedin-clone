<?php 
sleep(0.5);
$jobId = $_GET['jobId'];
$page = $_GET['page'];
$page = $page-1;
$numApplicants = $_GET['numApplicants'];

include '../../db.php';


$preLimit = ($page) * $noOfItemsPerPage;

$query = "SELECT u.name,  u.login_name FROM applications a INNER JOIN users u ON a.login_name = u.login_name  WHERE a.job_id = $jobId AND shortlisted = 0 ORDER By a.id LIMIT $preLimit, $noOfItemsPerPage ";

$applicants = [];

$result = connectToDatabase($query);

while($row = mysqli_fetch_assoc($result)){
	array_push($applicants, $row);
}

echo(json_encode(array('jobId'=>$jobId, 'numApplicants'=> $numApplicants, 'page'=>$page,'applicants'=>$applicants)));


 ?>