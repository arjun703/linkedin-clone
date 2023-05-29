<?php 

session_start();
if(isset($_SESSION['loginName'])){
	$of = $_GET['of'];
	$jobId = $_GET['fromJobId'];

	$loginName  = $_SESSION['loginName'];

	if($of == $loginName){

	}	
	else{
		// check jobId, to verify whether the profile being viewed
		// is the applicant of the jobId
	}

	$query = "SELECT `login_name`, `name`, `address`, `summary`, `email`, `website`, `phone` FROM `users` WHERE login_name = '$of'  ";

	include '../db.php';

	$personal = mysqli_fetch_assoc(connectToDatabase($query));

	$query = " SELECT * FROM `experiences` WHERE login_name = '$of' ORDER BY id  ";

	$experiences = [];

	$result = connectToDatabase($query);

	while($row =  mysqli_fetch_assoc($result)){
		array_push($experiences, $row);
	} 

	$query = "SELECT * FROM `skills` WHERE login_name = '$of' ORDER BY id ";

	$skills = [];

	$result = connectToDatabase($query);

	while($row = mysqli_fetch_assoc($result)){
		array_push($skills, $row);
	}

	$query = "SELECT * FROM `projects` WHERE login_name = '$of' ORDER BY id ";

	$result = connectToDatabase($query);

	$projects = [];

	while($row = mysqli_fetch_assoc($result)){
		array_push($projects, $row);
	}

	$query = "SELECT * FROM `educations` WHERE login_name = '$of' ORDER BY id  ";

	$result = connectToDatabase($query);

	$educations  = [];

	while($row = mysqli_fetch_assoc($result)){
		array_push($educations, $row);
	}

	echo json_encode(array(	'jobId'       => $jobId,
							'personal'    => $personal, 
							'experiences' => $experiences,
							'skills'      => $skills,
							'projects'    => $projects,
							'educations'  => $educations
						  )
					);

}





?>