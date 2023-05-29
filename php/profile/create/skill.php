<?php 
session_start();

// Apply htmlspecialchars() to all elements in $_POST
foreach ($_GET as $key => $value) {
    $_GET[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$skill =$_GET['skill'];

$loginName =$_SESSION['loginName'];

$query = "INSERT INTO skills (login_name, skill) VALUES('$loginName', '$skill') ";

include '../../db.php';

connectToDatabase($query);

echo json_encode(mysqli_fetch_assoc(connectToDatabase("SELECT * FROM skills WHERE login_name = '$loginName' ORDER by id DESC limit 1 ")));

 ?>

