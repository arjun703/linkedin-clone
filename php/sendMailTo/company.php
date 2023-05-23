<?php 



require_once '../mail/sendMail.php';


function verifyCompanyEmail($to, $name, $subject, $body){

	sendMail($to, $name, $subject, $body);

}



function composeEmail($loginName, $token){
return '
			Dear <b> @'.$loginName.'</b>,
			<br>
			<br>
			The verfification code for creating your company page is as 
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