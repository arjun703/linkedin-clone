<?php 



function connectToDatabase($query){
	
$host  = 'localhost';
$user = 'root';
$pass = '';
$db = 'mydj';

	$dbc = mysqli_connect($host, $user, $pass, $db);

	$result = mysqli_query($dbc, $query);

	return $result;

}


function isEmpty(...$params){

foreach ($params as $param) {
	# code...
	if(strlen($param) < 5){
		return true;
	}
}

return false;

}



 ?>