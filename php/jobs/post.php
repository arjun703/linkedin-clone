
<?php 

session_start();
sleep(2);
	if(isset($_SESSION['loginName']) 
		&& isset($_POST['jobPostJobPosition'])
		&& isset($_POST['jobPostCompanyName'])
		&& isset($_POST['jobPostLocation'])
		&& isset($_POST['jobPostDeadline'])
		&& isset($_POST['jobPostJobType'])
		&& isset($_POST['jobPostJobSite'])
		&& isset($_POST['jobPostJobIndustry'])
		&& isset($_POST['jobPostEducationLevel'])
		&& isset($_POST['jobPostJobDescription'])
		){
			$position = htmlspecialchars(trim($_POST['jobPostJobPosition']));
			$companyName = htmlspecialchars(trim($_POST['jobPostCompanyName']));
			$location = htmlspecialchars(trim($_POST['jobPostLocation']));
			$deadline = htmlspecialchars(trim($_POST['jobPostDeadline']));
			$jobType = htmlspecialchars(trim($_POST['jobPostJobType']));		
			$jobSite = htmlspecialchars(trim($_POST['jobPostJobSite']));
			$jobIndustry = htmlspecialchars(trim($_POST['jobPostJobIndustry']));
			$educationLevel = htmlspecialchars(trim($_POST['jobPostEducationLevel']));
			$jobDescription = htmlspecialchars(trim($_POST['jobPostJobDescription']));

			include('../db.php');

			if(isEmpty($position, $companyName, $location, $deadline, $jobType, $jobSite, $jobIndustry, $educationLevel) or strlen($jobDescription) < 100 ){
				echo json_encode(array('error' => 'Error - Insufficient length.'));
			}
			else{
				
				$loginName = $_SESSION['loginName'];

				$query = " INSERT INTO `jobs` (`location`, `job_poster`, `for_company`, `position`, `deadline`, `job_type`, `industry`, `job_site`, `education_level`, `description`) VALUES ('".$location."', '".$loginName."','".$companyName."','".$position."', '".$deadline."','".$jobType."','".$jobIndustry."','".$jobSite."','".$educationLevel."','".$jobDescription."') ";

				if(connectToDatabase($query)){
					echo json_encode(array('jobPosted' => true));
				}
				else{
					echo json_encode(array('error' => 'Database Error!', 'query' => $query));
				}
			}
	}
	else{
		echo json_encode(array('error' => 'Error - Some fields are missing.'));
	}

 ?>


