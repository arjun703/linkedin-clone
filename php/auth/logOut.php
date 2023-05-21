<?php 
session_start();
session_destroy();
$siteURL = 'http://localhost/myprojects/mydj/';
header('location:  '.$siteURL);

 ?>