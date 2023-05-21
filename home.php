<?php 



 ?>

<!DOCTYPE html>
<html>
<head>
	
	<title>MyDj | Home</title>
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

	<link rel="stylesheet" type="text/css" href="css/style.css">

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
</body>
</html>