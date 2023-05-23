<?php


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