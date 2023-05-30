const displayCreateCompanyPage = () => {
	
const divId = siteName + '/createCompanyPage'

const form = `
	
	<div class = "h5 text-center"> Create Company Page </div>

	<hr>

	<form id = "companyPageForm" method = "POST" >

	<div class = "gridHolder" id="formHolderForCreateCompanyPage">
		
		<div>
			<label for = "companyPageCompanyName"> Company Name </label>
			<input required   name = "companyPageCompanyName" id = "companyPageCompanyName" >
		</div>
		
		<div id = "locationHolderCCA" style = "position:relative">
			<label for = "locationNameInputCCA">Location</label>
			<input required type="text"
			name = "companyPageCompanyLocation" 
					id = "locationNameInputCCA"
					placeholder = "Search"
					onkeyup = "handleLocationInputInCreateCompanyPage()">
			<div id="locatioNameAutoCompleteInCreateCompanyPage" 
			style = "position:absolute" class = "locatioNameAutoComplete"></div> 
		</div> 

		<div>
			<label for = "companyPageCompanyWebsite"> Company Website </label>
			<input required   
			placeholder ="http://abc.com"
			name = "companyPageCompanyWebsite" id = "companyPageCompanyWebsite" >
		</div>

		<div>
			<label for = "companyPageCompanyEmail">Company Email </label>
			
			<input required   name = "companyPageCompanyEmail" id = "companyPageCompanyEmail" >

		</div>

		<div>
			<label for = "companyPageCompanyPhone"> Contact Number </label>
			
			<input required   name = "companyPageCompanyPhone" id = "companyPageCompanyPhone" >

		</div>

		<div>
			<label for="companyPageIndustry">Industry</label>
			<select name = "companyPageIndustry" required  id="companyPageIndustry">

			    <option value="Software">Software</option>
			    <option value="Networking and Hardware">Networking and Hardware</option>
			    <option value="Educational Institution">Educational Institution</option>
				
			</select>
		</div>
	</div>
	<div>
		<label for = "companyPageAboutCompany"> About Company </label>
		<textarea name = "companyPageAboutCompany" 
		required rows = "8" style = "width:100%" 
		id = "companyPageAboutCompany" name="companyPageAboutCompany"></textarea>
	</div>
	
</form>
<div class = "text-center mt-3">
	<button id  = "createCompanyPageButton"
		onclick = " (IS_LOGGED_IN) ? handleCompanyCreation() : displayLoginOverlay('Create Company Page', 'create the company page')"
	 class = "longButton btn btn-primary" 
	 style = "font-weight:bold">
		Create Company Page
	</button>
</div>
`
document.getElementById(divId).innerHTML = form;

var formHolder = document.getElementById('formHolderForCreateCompanyPage')

}

function loadCreateCompanyPage(){
	var divId = siteName + '/createCompanyPage';
	
	var hdrTable = createHomeHdr(activeTab = 'null');

	

	execFrontendOnlyFunction(divId, hdrTable, displayCreateCompanyPage);


}


async function handleLocationInputInCreateCompanyPage() {

	var inputValue = document.getElementById('locationNameInputCCA').value.trim();
	const requestUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&apiKey=8a4e247166574725a8de05e06f3c9d74`;
	handleLocationInput('locationNameInputCCA', 'locatioNameAutoCompleteInCreateCompanyPage', requestUrl);

}

function handleCompanyCreation(){
	var text  = `Are you sure that the data is valid? Click 
					on cancel if you are unsure, otherwise click continue
				to confirm and create the company page.`
	displayPrompt(title = 'Verify Company Data', text, callback = 'createCompanyPage()')
}	



function createCompanyPage(){

	hideOverlay();

	displayPromptWithoutFooterOptions('Please wait...', 'Please wait while we process your data.');


	var companyPageDataHolder = document.getElementById('companyPageForm')

	var formData = new FormData(companyPageDataHolder);
	
	deactivateButton('createCompanyPageButton', 'Please Wait...');

	var xmlhttp = new XMLHttpRequest;
	xmlhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var data = JSON.parse(this.responseText);
			if(data.error){
				alert(data.error);
				activateButton('createCompanyPageButton', 'Create Company Page');
				hideOverlay();
			}
			else{
				if(data.companyPageCreated){
					verifyOfficialCompanyEmail();
					document.getElementById('createCompanyPageButton').style.display = "none";
				}
			}
		}
	}
	xmlhttp.open('POST', siteName + '/php/companyPage/create.php');
	xmlhttp.send(formData);
}

function verifyOfficialCompanyEmail(error = false){

	hideOverlay();


	var text = `

		${ !error 
			? 'A verification code has been sent to the company email. It may take up to 5 minutes to receive the email.'
			: '<h4 class = "text-danger">Invalid code. Please enter it again</h4> '  
		}

		${	!error 
			? '<p> Don\'t forget to give a look to the spam page.</p>'
			: ''
		}

		
		<div class = "mt-3">
			<form>
				<label>Enter the Code</label>
				<input id = "verifyCompanyEmailBeforeCreatingPage"  
				type = "number">
			</form>
		</div>
	`;


	displayPrompt('Enter Verification Code', 
					text,
					"proceedCompanyCreationVerifyCode()",
				);
}



function activateCompanyPage(){

	var text = `

		A verification code has already been sent to the company email you 
		entered while creating the page.
		
		<p>
			Don't forget to give a look at the spam page.
		</p>

		<div class = "mt-3">
			<form>
				<label>Enter the Code</label>
				<input id = "verifyCompanyEmailBeforeCreatingPage"  
				type = "number">
			</form>
		</div>

	

	`;


	displayPrompt('Enter Verification Code', 
					text,
					"proceedCompanyCreationVerifyCode()"
				);

}


function proceedCompanyCreationVerifyCode(){

	// extract code

	if(document.getElementById('verifyCompanyEmailBeforeCreatingPage')){
		window.codeEnteredByUser = document.getElementById('verifyCompanyEmailBeforeCreatingPage').value;
	}


	if(codeEnteredByUser.trim().length == ''){
		alert('Invalid Code. Enter it again');
		return;
	}

	hideOverlay();

	var text = `
		<div>
				Please wait while we check the code you sent. The company page will
				be activated if the code is correct.
				<br>
		</div>

	`

	displayPromptWithoutFooterOptions('Please Wait...', text);

	fetch('php/companyPage/verify.php?code='+codeEnteredByUser)
	.then(response => response.json())
	.then(data => {
		if(data.error){
			verifyOfficialCompanyEmail(error = true);
		}
		else if(data.companyPageVerified){
			hideOverlay();
			displayPromptWithoutFooterOptions('Success!', 'You have successfully created a company page. Now jobs can be posted for this compaany');
		}
	})
	.catch(error => console.log(error));
}