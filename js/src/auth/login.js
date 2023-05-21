function loadLoginForm(){
	var divId = siteName + '/login';
	
	var hdrTable = createHomeHdr(activeTab = 'ddd');


	
	execFrontendOnlyFunction(divId, hdrTable, displayLoginForm);
	
}

function createLoginForm(){
	return `
	<div class = "formHolder" style = "background: var(--bgColorOfCards)">
	<h5 class = "text-center">Login to our Website</h5>
	<hr>
		<form id = "loginForm" method = "POST">
			<div>
				<label for = "loginLoginName">Login_name</label>
				<input id = "loginLoginName"  type = "text" required name = "loginLoginName">
			</div>
			<div>
				<label for = "loginPassword">Password</label>
				<input id = "loginPassword"   type = "password"  required name = "loginPassword">
			</div>


		</form>

		<div class = 'text-center'>
			<button id = "loginButton" class= "longButton btn mt-2 btn-primary" onclick = "handleLogin()">
				Log In
			</button>
		</div>

		<div class = "text-center">
			<div class = "mt-2" style = "position:relative">
				<span class =  "orHolder" > Or </span>
			</div>
			<div onclick = "loadRegisterForm()">
				<span class = "softLink  ">Create New Account</span>
			</div>
		</div>

	</div>
	`;
}

const displayLoginForm = () => {

	var divId = siteName + '/login';

	document.getElementById(divId).innerHTML = createLoginForm();

}

function handleLogin(){
	var loginLoginName = document.getElementById('loginLoginName').value;
	var loginPassword = document.getElementById('loginPassword').value;
	document.getElementById('loginButton').disabled = true;
	document.getElementById('loginButton').innerText = "Please Wait...";
	fetch(siteName + '/php/auth/login.php?loginLoginName='+loginLoginName+'&loginPassword='+loginPassword)
	.then(response => response.json())
	.then(data => {
		if(data.error){
			alert('Incorrect username or password!');
			document.getElementById('loginButton').disabled = false;
			document.getElementById('loginButton').innerText = "Log In";
		}
		else{
			location.href = siteName;
		}
	})
	.catch(error => alert(error))
}