<?php 
session_start();
session_destroy();
$siteURL = 'http://localhost/myprojects/mydj/';
//$siteURL = 'http://mydj.great-site.net';

header('location:  '.$siteURL);

 ?>