<?php 

$noOfItemsPerPage = 10;

function connectToDatabase($query){
	

/*

$host  = 'sql305.epizy.com';
$user = 'epiz_34225608';
$pass = 'MwrWJ5exCAZH';
$db = 'epiz_34225608_mydj';



*/







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
	if(strlen($param) < 1){
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






function concatenateSingleFilter($filterName, $filters){
		$preFilter = 'AND ( ';
	for($i = 0; $i< sizeof($filters); $i++){
		 $preFilter .= "$filterName LIKE '%$filters[$i]%' ";
		 if($i != sizeof($filters) - 1 ) $preFilter .= ' OR ';
		 	else $preFilter .= ' ) ';
	}
	return $preFilter;
}




function createFilterArray($filterName, $number){
	
	$filters = [];

	for($i = 1; $i <= $number; $i++){

		$cookieName = $filterName . '_' . $i;

		if(isset($_COOKIE[$cookieName])){
			array_push($filters, $_COOKIE[$cookieName]);
		}

	}

	return $filters;
}



function concatenateAllFilters($filterDetails){
	$filter = '';
	for($i = 0; $i < count($filterDetails); $i++){
		$eFT =  $filterDetails[$i];
		$filters = createFilterArray($eFT[0], $eFT[1]);
		if(sizeof($filters)>=1) $filter .= concatenateSingleFilter($eFT[2], $filters);
	}
	return $filter;
}



function siteAndTypefilter(){
	return concatenateAllFilters(
		[
			['js', 3, 'job_site'],
			['jt', 3, 'job_type'],
		]
	);
}



function queryBuilder($position, $location){

	$preQuery = "SELECT Distinct j.*, c.company_name, c.id as company_id ";

	if(isset($_SESSION['loginName'])){
		
		$preQuery .= ",   CASE 
        				WHEN applications.login_name IS NULL THEN 'false'
        				ELSE 'true'
    					END AS has_applied ";
	}


	$preQuery .= "FROM jobs j
					INNER JOIN companies  c ON j.company_website = c.company_website ";

	if(isset($_SESSION['loginName'])){
		$loginName = $_SESSION['loginName'];
		
		$preQuery .= " LEFT JOIN applications ON j.id = 								applications.job_id
    					AND applications.login_name = '$loginName' ";
	}

	$preQuery .= " WHERE j.active_status = 1 ";

	if(isset($_SESSION['loginName'])){
		$preQuery .= " AND j.job_poster != '$loginName' ";
	}

	$postQuery =  " ORDER BY j.id DESC LIMIT 10";


			
		$explodedPos = explode(' ', $position);

		$explodedLoc = explode(',', $location);



		$firstIndexPos = trim($explodedPos[0]);
		$firstIndexLoc = trim($explodedLoc[0]);

		$lastIndexPos = trim($explodedPos[sizeof($explodedPos) - 1]);
		$lastIndexLoc = trim($explodedLoc[sizeof($explodedLoc) - 1]);


		// query: React Developer ,,, Kathmandu, Nepal


		// stored on database
		
		// works on
		// pos: React Developer,
		// loc: Kathmandu, Nepal 
		// desc: NodeJS preferred

		// doesnt work on:
		// React Engineer: Kathmandu, Bagmati, Nepal

	$query1 = $preQuery
			. "AND ( position LIKE '%$position%' )  "
			. "AND ( location LIKE '%$location%' ) " 
			. siteAndTypefilter()
			. $postQuery;


		//works on
		// React Engineer: Kathmandu, Bagmati, Nepal

		// doesnt work on:
		// React Engineer, Kathmandu, Bagmati, Nepal




	$query2 = $preQuery
			. " AND ( position LIKE '%$firstIndexPos' ) " 
			. " AND ( j.location LIKE '%$firstIndexLoc%'  ) "
			. siteAndTypefilter()
			. $postQuery;



	$query3 = $preQuery
			.  " AND ( position LIKE '%$firstIndexPos%' ) "
			 . " AND ( job_site LIKE '%re%' ) "
			 . " AND ( j.location LIKE '%$lastIndexLoc%' ) "
			 . concatenateAllFilters([ ['jt', 3, 'job_type'] ])
			 . $postQuery;


	$query4  = $preQuery
			.  " AND ( j.description LIKE '%$firstIndexPos%' ) "
			 . " AND ( j.location LIKE '%$firstIndexLoc%' ) "
			 . siteAndTypefilter()
			 . $postQuery;

			 $country  = returnCityAndCountry();

	$query5 = $preQuery 
				. " AND j.location LIKE '%$country%' " 
				. "AND job_site LIKE '%re%' "
				. " ORDER by j.id DESC LIMIT 5 ";


	return "SELECT * FROM ( ( $query1 )  UNION ( $query2 ) UNION ( $query3 ) UNION ( $query4 ) UNION  ( $query5 )  ) temp LIMIT 10";

	
}


function returnCityAndCountry(){
    // Get the visitor's IP address
  $ip = $_SERVER['REMOTE_ADDR'];

  if($ip == '::1') $ip = "2400:1a00:b030:3002:d42a:dcf8:d2:436c";

  // Send a request to the IP geolocation service
  $response = file_get_contents("http://ip-api.com/json/{$ip}");

  // Decode the JSON response
  $locationData = json_decode($response);

  // Retrieve the location details
  $country = $locationData->country;

  return  $country;


}




 ?>