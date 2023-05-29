<?php 

require '../mail/sendMail.php';

function verifyOfficiaEmailProvidedByCompany($to, $name, $subject, $body){

	sendMail($to, $name, $subject, $body);

}



function composeEmailToEmployee($loginName, $token){
return '
			Dear <b> @'.$loginName.'</b>,
			<br>
			<br>
			The verfification code for posting your job is as 
			follows:
			<h2>'.$token.'</h2>
			
			Thank you so much for helping to reduce unemployment.
			<br>
			<br>
			Regards,
			<br>
			<br>
			The MyDJ Team
';

}



 ?>