function loadRegisterForm(){
	var divId = siteName + '/register';
	
	var hdrTable = createHomeHdr(activeTab = 'ddd');

	
	execFrontendOnlyFunction(divId, hdrTable, displayRegisterForm);
	
}

function createRegisterForm(){
	return `
	<div class = "formHolder" style = "background: var(--bgColorOfCards)">
	<h5 class = "text-center">Create New Account</h5>
	<hr>
		<form id = "registerForm" method = "POST">
			<div>
				<label for = "registerName">Name</label>
				<input id = 'registerName'  type = "text" required name = "registerName">
			</div>
			<div>
				<label for = "registerLoginName">Login_name</label>
				 ( 
				<small>It is used while logging in the next time.</small>
				 )
				<input id = "registerLoginName"  required type = "text" name = "registerLoginName">
			</div>
			<div>
				<label for = "registerPassword">Password</label>
				<input  type = "password" id = "registerPassword" required name = "registerPassword">
			</div>
		
			

		</form>


		<div class = 'text-center'>
				<button onclick = "handleRegister()"  class= "longButton btn mt-2 btn-primary" id = "registerButton">
					Create New Account
				</button>
		</div>

		<div class = "text-center">
			<div class = "mt-2" style = "position:relative">
				<span class =  "orHolder" > Or </span>
			</div>
			<div onclick = "loadLoginForm()">
				<span class = "softLink  ">Login</span>
		</div>
	</div>

	</div>
	`;
}

const displayRegisterForm = () => {

	var divId = siteName + '/register';

	document.getElementById(divId).innerHTML = createRegisterForm();

}

function handleRegister(){

	var loginName = document.getElementById('registerLoginName').value;
	document.getElementById('registerButton').disabled = true;
	document.getElementById('registerButton').innerHTML = "Please Wait...";
	var password = document.getElementById('registerPassword').value;
	var name = document.getElementById('registerName').value;
	fetch(siteName + '/php/auth/register.php?registerLoginName='+loginName+'&registerPassword='+password+'&registerName='+name)
	.then(response => response.json())
	.then(data => {
		if(data.error){
			alert('error');
			document.getElementById('registerButton').disabled = false;
			document.getElementById('registerButton').innerHTML = "Create New Account";
		}
		else{
			location.href = siteName;
		}
	})
	.catch(error => {
			document.getElementById('registerButton').disabled = false;
			document.getElementById('registerButton').innerHTML = "Create New Account";
			console.log(error);
	})

}