<?php 


session_start();

$preLimit = $_GET['preLimit'];

$jobId = $_GET['jobId'];


include '../db.php';

$query = "SELECT login_name from applications WHERE  job_id = $jobId ORDER BY id DESC LIMIT $preLimit,1 ";

$of = mysqli_fetch_assoc(connectToDatabase($query))['login_name'];

$query = " SELECT  *  FROM `experiences` WHERE login_name = '$of' ORDER BY id ";

$experiences = [];

$result = connectToDatabase($query);

while($row =  mysqli_fetch_assoc($result)){
	$row['id'] = -1;
	$row['login_name'] = -1;
	$row['company'] = 'Company Name ( Hidden )';
	array_push($experiences, $row);
} 

$query = "SELECT * FROM `skills` WHERE login_name = '$of' ORDER BY id ";

$skills = [];

$result = connectToDatabase($query);

while($row = mysqli_fetch_assoc($result)){
	$row['id'] = -1;
	$row['login_name'] = -1;
	array_push($skills, $row);
}

$query = "SELECT * FROM `projects` WHERE login_name = '$of' ORDER BY id ";

$result = connectToDatabase($query);

$projects = [];

while($row = mysqli_fetch_assoc($result)){
	$row['id'] = -1;
	$row['login_name'] = -1;
	$row['project_name'] = 'Project Name (Hidden) ';
	$row['link']  = 'Project Link (Hidden)';
	array_push($projects, $row);
}

$query = "SELECT * FROM `educations` WHERE login_name = '$of' ORDER BY id  ";

$result = connectToDatabase($query);

$educations  = [];

while($row = mysqli_fetch_assoc($result)){
	$row['id'] = -1;
	$row['login_name'] = -1;
	$row['institution'] = 'Institution (Hidden)';
	array_push($educations, $row);
}

echo json_encode(array(	'experiences' => $experiences,
						'skills'      => $skills,
						'projects'    => $projects,
						'educations'  => $educations
					  )
				);




 ?>