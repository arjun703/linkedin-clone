<?php 

session_start();
sleep(2);
	if(isset($_SESSION['loginName']) 
		&& isset($_POST['companyPageCompanyName'])
		&& isset($_POST['companyPageCompanyLocation'])
		&& isset($_POST['companyPageCompanyWebsite'])
		&& isset($_POST['companyPageCompanyEmail'])
		&& isset($_POST['companyPageCompanyPhone'])
		&& isset($_POST['companyPageIndustry'])
		&& isset($_POST['companyPageAboutCompany'])
		){
			$name = htmlspecialchars(trim($_POST['companyPageCompanyName']));
			$location = htmlspecialchars(trim($_POST['companyPageCompanyLocation']));
			$website = htmlspecialchars(trim($_POST['companyPageCompanyWebsite']));
			$email = htmlspecialchars(trim($_POST['companyPageCompanyEmail']));
			$phone = htmlspecialchars(trim($_POST['companyPageCompanyPhone']));		
			$industry = htmlspecialchars(trim($_POST['companyPageIndustry']));
			$about = htmlspecialchars(trim($_POST['companyPageAboutCompany']));


			include('../db.php');

			if(isEmpty($name, $location, $website, $email, $phone, $industry) or strlen($about) < 100 ){
				echo json_encode(array('error' => 'Error - Insufficient length.'));
			}
			else{
				
				$loginName = $_SESSION['loginName'];

				$query = "INSERT INTO `companies`(`creator`, `company_name`, `company_location`, `company_website`, `category`, `company_about`, `company_email`, `contact_number`) VALUES ('".$loginName."','".$name."', '".$location."', '".$website."', '".$industry."','".$about."','".$email."','".$phone."')";

				if(connectToDatabase($query)){
					echo json_encode(array('companyPageCreated' => true));
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