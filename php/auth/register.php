<?php 

session_start();

if(isset($_GET['registerName']) && isset($_GET['registerLoginName']) && isset($_GET['registerPassword'])){

	$name = (trim(htmlspecialchars($_GET['registerName'])));

	$loginName = (trim(htmlspecialchars($_GET['registerLoginName'])));

	$passWord = trim($_GET['registerPassword']);


	if( ( strlen($name) > 2 ) && ( strlen($loginName) > 2 ) && ( strlen($passWord) > 2 ) ) {

		include '../db.php';

		$password = sha1($passWord);

		$query =  "INSERT INTO users (name, login_name, password) 
				VALUES ('".$name."', '".$loginName."', '".$password."') ";
		if(connectToDatabase($query)){
			$_SESSION['loginName'] = $loginName;
			echo json_encode(array());
		}
		else{
			echo json_encode(array('error' => 'Database Error'));
		}
	}
	else{
		echo json_encode(array('error' => 'Insufficient length'));
	}
}
else{
	echo json_encode(array('error' => true));
}