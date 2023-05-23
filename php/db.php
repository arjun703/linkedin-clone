<?php 



function connectToDatabase($query){
	
$host  = 'localhost';
$user = 'root';
$pass = '';
$db = 'mydj';

	$dbc = mysqli_connect($host, $user, $pass, $db);

	$result = mysqli_query($dbc, $query) or die( json_encode(array('error' => mysqli_error($dbc)))) ;

	return $result;

}


function isEmpty(...$params){

foreach ($params as $param) {
	# code...
	if(strlen($param) < 4){
		return true;
	}
}

return false;

}


function verifyEmailAndWebsite($email, $website){
		$parsedUrl = parse_url($website);

		if(!isset($parsedUrl['host'])){
			die(json_encode(array('error' => 'Invalid company website')));
		}
		else{
			$domainName = $parsedUrl['host'];	
		}
		
		if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$domainNameFromEmail = explode('@', $email)[1];
		} else {
			die(json_encode(array('error' => 'Invalid email')));
		}


		if($domainName != $domainNameFromEmail){
			die(json_encode(array('error' => 'Invalid email or company website')));
		}


		$publicEmailProviders = ['gmail.com', 
								 'yahoo.com', 
								 'outlook.com', 
								 'hotmail.com',
								 'aol.com'
								];		

		if(in_array($domainName, $publicEmailProviders) or in_array($domainNameFromEmail, $publicEmailProviders) ){
			die(json_encode(array('error' => 'Don\'t provide your personal email id. Input the official business email id.')));
		}
}


function checkIfTheUserHasPendingJob(){

$query = "SELECT * from jobs WHERE job_poster = '".$_SESSION['loginName']."' and verified = 0 ";

return connectToDatabase($query);


}



function returnCityAndCountry(){
	// Get the visitor's IP address
	$ip = "2400:1a00:b030:3002:d42a:dcf8:d2:436c";
	//$ip = $_SERVER['REMOTE_ADDR'];


	// Send a request to the IP geolocation service
	$response = file_get_contents("http://ip-api.com/json/{$ip}");

	// Decode the JSON response
	$locationData = json_decode($response);

	// Retrieve the location details
	$country = $locationData->country;
	$city = $locationData->city;

	return [$city, $country];

}



 ?>