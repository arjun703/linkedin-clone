
<?php 

session_start();

// Turn off output buffering
ob_end_clean();

// Enable implicit flushing of output buffers
ob_implicit_flush(true);



	if(isset($_SESSION['loginName']) 
		&& isset($_POST['jobPostJobPosition'])
		&& isset($_POST['jobPostLocation'])
		&& isset($_POST['jobPostJobType'])
		&& isset($_POST['jobPostJobSite'])
		&& isset($_POST['jobPostJobIndustry'])
		&& isset($_POST['jobPostJobDescription'])
		&& isset($_POST['hiddenCompanyWebsite'])
		&& isset($_POST['postJobFormEmployeeEmail'])
		){
			$position = htmlspecialchars(trim($_POST['jobPostJobPosition']));
			$companyName = htmlspecialchars(trim($_POST['jobPostCompanyName']));
			$location = htmlspecialchars(trim($_POST['jobPostLocation']));
			$jobType = htmlspecialchars(trim($_POST['jobPostJobType']));		
			$jobSite = htmlspecialchars(trim($_POST['jobPostJobSite']));
			$jobIndustry = htmlspecialchars(trim($_POST['jobPostJobIndustry']));
			$jobDescription = htmlspecialchars(trim($_POST['jobPostJobDescription']));
			$companyWebsite = htmlspecialchars(trim($_POST['hiddenCompanyWebsite']));
			$employeeEmail = htmlspecialchars(trim($_POST['postJobFormEmployeeEmail']));

				include('../db.php');


			if(isEmpty($position, $companyName, $location, $jobType, $jobSite, $jobIndustry, $companyWebsite, $employeeEmail) or strlen($jobDescription) < 100 ){
				die(json_encode(array('error' => 'Error - Fill out all the fields.')));
			}
			else{


				verifyEmailAndWebsite($employeeEmail, $companyWebsite);
				
				$loginName = $_SESSION['loginName'];


				if(mysqli_num_rows(checkIfTheUserHasPendingJob()) > 0 ){
					die(json_encode(array('error' => 'You already have one unverified posted job. You can post other jobs only after verifying the previous job')));
				}

				$token = rand();

				$query = " INSERT INTO `jobs` (`location`, `job_poster`,  `position`,  `job_type`, `industry`, `job_site`, `description`, `temp_email`, `token`, `company_website`) VALUES ('".$location."', '".$loginName."', '".$position."','".$jobType."','".$jobIndustry."','".$jobSite."', '".$jobDescription."', '".$employeeEmail."', ".$token.", '".$companyWebsite."') ";

				if(connectToDatabase($query)){
					
					echo (json_encode(array('jobPosted' => true)));

					flush();

					require_once '../sendMailTo/employee.php';

					verifyOfficiaEmailProvidedByCompany($employeeEmail, $loginName, 'Verification code', composeEmailToEmployee($loginName, $token));
					

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


