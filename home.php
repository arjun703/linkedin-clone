<?php 



 ?>

<!DOCTYPE html>
<html>
<head>
	
	<title>MyDj | Home</title>
	
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

	<link rel="stylesheet" type="text/css" href="css/style.css">

  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">


	<script type="text/javascript" src="js/dist/bundle.js"></script>

</head>

<body onload="setup()">



<div id="preLoaderHolder">
	<div  class="line-animation"></div>
</div>

<div id="app">

	<div id="hdr">

		<div class="row align-items-center">
			
			<div class="col-md-3 d-none d-md-block text-center" id="hdrLeftPart">
			</div>
			
			<div class="col-md-6"  id="middlePartOfHdr">
				<!-- filled by javascript !-->
				<div class="hdrPreLoader"></div>
			</div>
			
			<div class="col-md-3  d-none d-md-block" id="hdrRightPart"
			>	
				
			</div>
	
		</div>
	
	</div>
	
	<div class="container">
		<div class="row mt-2">	
			<div id="leftSidebar" class="col-md-3 d-none d-md-block" >
				<div class="blockPreLoader"></div>
				<div class="blockPreLoader"></div>
			</div>
			
			<div class="col-md-6" id="middleMainContent">
				<!-- filled by javascript !-->
				<div class="blockPreLoader" style="height: 75vh"></div>
			</div>
			
			<div class="col-md-3 d-none d-md-block" id="rightSidebar">
				<div class="blockPreLoader"></div>
				<div class="blockPreLoader"></div>
			</div>
		</div>
	</div>
</div>



<footer class="text-center mt-4 mb-2">

</footer>


<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>



</body>
</html>