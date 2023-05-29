<?php 
if(isset($_GET['query']) && $_GET['task'] ){

	$task = trim(htmlspecialchars($_GET['task']));

	$query = trim(htmlspecialchars($_GET['query']));

	$query = "(SELECT DISTINCT $task  FROM jobs WHERE $task =  '$query' LIMIT 3) UNION (SELECT DISTINCT $task FROM jobs WHERE $task LIKE '%$query%' LIMIT 2) ";

	include '../db.php';

	$results = connectToDatabase($query);

	$suggestions = [];

	while($row = mysqli_fetch_assoc($results)){

		array_push($suggestions, ($task == "position" ) ? $row['position'] : $row['location']);

	}

	echo(json_encode($suggestions));

}
else{
	die(json_encode(array()));
}



 ?>