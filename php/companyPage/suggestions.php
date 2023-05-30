<?php 

if(isset($_GET['incompleteName'])){

include ('../db.php');

$query = "SELECT id, company_name, company_website FROM companies WHERE active_status = 1 AND company_name LIKE 
			'%".$_GET['incompleteName']."%'	 LIMIT 5";


$result = connectToDatabase($query);


$suggestions = [];

while ($row = mysqli_fetch_assoc($result)){

array_push($suggestions, $row);

}

echo json_encode($suggestions);

}


 ?>