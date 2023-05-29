function loadPostJobForm(){
	var divId = siteName + '/postJobForm';
	
	var hdrTable = createHomeHdr(activeTab = 'jobPostForm');

	execFrontendOnlyFunction(divId, hdrTable, displayPostJobForm);

}

const displayPostJobForm = () => {

var divId = siteName + '/postJobForm';

const form = `
<div class = "formHolder" style = "background: var(--bgColorOfCards)">
<h4 class = "text-center" >Post a Job </h4>

<hr>

<p class = "text-warning text-center" style ="font-weight:bold">
	${
		IS_LOGGED_IN 
			? HAS_COMPANY_PAGE
				? ''
				: 'You need to <span class = "softLink" onclick="loadCreateCompanyPage()">create a company page</span> before you can post jobs.<HR>'
			: 'You need to <span class = "softLink" onclick="loadCreateCompanyPage()">create a company page</span> before you can post jobs.<HR>'
	}
</p>

<p class = "text-center">
	${
		EMPLOYER_MODE
			? ''
			: '<small>You can switch to </small> <span class="softLink" onclick = "setEmployerMode()">Employer Mode</span><small> for more clean user interface (UI)</small> <HR> '
	}
</p>

<form id = "postJobForm" method = "POST">

	<div id = "postJobForm_step_1" class = "animationSlideRight">

		<div class = "gridHolderModified2" >
			
			<div>
				<label for = "position"> Position </label>
				<input required  name = "jobPostJobPosition" id = "position" >
			</div>
			

			
				
			<div id = "companyHolderInPostJobForm" style = "position:relative">
				<label for = "companyNameInput">Company Name</label>
				<input onkeyup = "handleCompanyInputInPostJobForm()" 
				 required name = "jobPostCompanyName" 
				 placeholder = "search"
				 id = "companyNameInputInJobPost">
				<div id = "companyNameAutocomplete" class = "locatioNameAutoComplete"
					style = "position:absolute">
						<p class = "text-center">Enter Company Name</p>

					</div>
			</div>

			<input type = "hidden" value = "" id= "hiddenCompanyWebsite"
			 name = "hiddenCompanyWebsite">

			<div id = "locationHolder" style = "position:relative">
				<label for = "locationNameInputPostJobForm">Location</label>
				<input required type="text"
						name = "jobPostLocation"
						placeholder = "search" 
						id = "locationNameInputPostJobForm"
						onkeyup = "handleLocationInputInPostJobForm()">
				<div id="locatioNameAutoComplete" 
				style = "position:absolute" 
				class = "locatioNameAutoComplete">
					<p class = "text-center">Enter Location</p>
				</div> 
			</div> 

		

			<div>
				<label for="jobPostJobType">Select Job Type</label>
				<select name = "jobPostJobType" required id="jobPostJobType">
				    <option value="fu">Full Time</option>
				    <option value="pa">Part Time</option>
				    <option value="in">Internship</option>
				</select>
			</div>



		</div>

	</div>

	<div id = 'postJobForm_step_2' class = "animationSlideRight">
		<div class = "gridHolderModified2">
			<div>
				<label for="jobPostJobSite">Select Job Site</label>
				<select required  id="jobPostJobSite" name = 'jobPostJobSite'>
				    <option value="on">On-Site</option>
				    <option value="re">Remote</option>
				    <option value="hy">Hybrid</option>
				</select>
			</div>


			<div>
				<label for="jobPostJobIndustry">Select Job Industry</label>
				<select required name = "jobPostJobIndustry" id="jobPostJobIndustry">
				    <option value="so">Software</option>
				    <option value="ne">Networking and Hardware</option>
				    <option value="hu">Human Resources</option>
				    <option value="te">Teacher / Instructer</option>
				</select>
			</div>
		</div>	

		<div class = "mt-3">
			<label for = "jobPostJobDescription"> Job Description </label>
			<textarea required rows = "8" 
			name = "jobPostJobDescription"
			style = "width:100%" id = "jobPostJobDescription" name="jobDescription"></textarea>
		</div>

	</div>


	<div id = "postJobForm_step_3" class = "animationSlideRight">
		<div>
			<label for = "postJobFormEmployeeEmail"> Enter your email provided by this
			company to you
			</label>
			<input class = "mt-3" type = "mail" 
			for = "postJobFormEmployeeEmail" name = "postJobFormEmployeeEmail">
		</div>
	</div>


</form>
	<hr>
	<div class = 'mt-3' style = "font-weight:bold" id = 'controlHolder'>
		<div class = "text-center">
			<button onclick = "loadSubTab(2)" 
			class = "btn btn-primary" id = "controlButton">
				Continue
			</button>
		</div>
	</div>
</div>
`

document.getElementById(divId).innerHTML = form;

loadSubTab(1);


}



function VerifyYourEmail(error = false){


	// retrieve email and send request to send the code


	var text = `

		${ !error 
			? '<div class = "text-danger text-center" style = "font-weight:bold"> The job was posted successfully, but it remains inactive unless you verify your email.</div> Verification code has been sent to the email you provided before. It may take up to 5 minutes to receive an email. <br>Don\'t forget to give a look at the spam folder.'
			: '<div class = "text-center text-danger h5"> Invalid code. Enter it again </div> '
		}
		
		<div class = "mt-2">
			<form>
				<label for = 'verifyYourEmailBeforePostingJob'>Enter the Code</label>
				<input id = "verifyYourEmailBeforePostingJob" type = "text" placeholder = "Enter code" name = "verifyYourEmailBeforePostingJob">
			</form>
		</div>
	`;


	displayPrompt('Enter Verification Code', 
					text,
					"proceedJobUploadVerifyCode()",
				);
}

function proceedJobUploadVerifyCode(){
	var token = document.getElementById('verifyYourEmailBeforePostingJob').value;

	if(token.trim().length == 0) return;
	// verfiy the code
	hideOverlay();
	var text = `
		<div>
				Please wait while we check the code you sent. Your job post will
				be activated if the code is correct.
				<br>
		</div>

	`
	displayPromptWithoutFooterOptions('Please Wait...', text);

	fetch(siteName + '/php/jobs/verify.php?token='+token)
	.then(response => response.json())
	.then(data => {

		hideOverlay();

		if(data.error){
			VerifyYourEmail(error = true);
		}
		else{

			var text = `
				<div class = "h5">Job Posted Successfully!</div>
				<span class ="softLink" onclick = "hideOverlay(); loadPostedJobs(true)" >
					Click Here
				</span> to view the posted jobs
				<br><br>
			`
				displayPromptWithoutFooterOptions('Success!', 
					text
				);
		}
	})
}


function handleJobUpload(){
	var text  = `Are you sure that the data is valid? Click 
					on cancel if you are unsure, otherwise click continue
				to confirm and post the new job.`
	displayPrompt(title = 'Verify Job Data', text, callback = 'uploadJob()')
}	

function uploadJob(){

	hideOverlay();

	var jobDataHolder = document.getElementById('postJobForm')

	var formData = new FormData(jobDataHolder);
	
	document.getElementById('controlHolder').style.display = "none";

	displayPromptWithoutFooterOptions('Please Wait...', 'Please wait while we process your data<br><br>');


	var xmlhttp = new XMLHttpRequest;
	xmlhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			console.log(this.responseText);
			hideOverlay();

			var data = JSON.parse(this.responseText);
			if(data.error){
				alert(data.error);
				document.getElementById('controlHolder').style.display = "block";
			}
			else if(data.jobPosted){
				//alert('Job Post Successful');
				 VerifyYourEmail()
			}
		}
	}
	xmlhttp.open('POST', siteName + '/php/jobs/post.php');
	xmlhttp.send(formData);

}




function loadSubTab(tab){

	const numberOfTabs = 3;

	for(var i = 1; i <= numberOfTabs; i++){
    document.getElementById('postJobForm_step_'+i).style.display = "none";
}

document.getElementById('postJobForm_step_'+tab).style.display = "block";

var controls =  `
		<table class = "w-100">
			<tr>
				<td style = "text-align:center" >
					<button class = "btn btn-primary" 
						onclick = "loadSubTab(${tab-1})" style = "${ tab==1 ? '' : 'font-weight: bold' }" title = "Step ${tab-1}" ${tab == 1 ? 'disabled' : ''}
					>
						Previous Step
					</button>
				</td>
				<td style = "text-align:center">
					<button style = "font-weight:bold" class = "btn btn-primary"  title = "Step ${tab+1}"
						onclick = "${tab == numberOfTabs ? 'handleJobUpload()' : 'loadSubTab('+(tab+1)+')' }"		
					>
						Next Step
					</button>
				</td>
			</tr>
		</table>

	`
document.getElementById('controlHolder').innerHTML = controls;

}




async function handleLocationInputInPostJobForm() {

	var inputValue = document.getElementById('locationNameInputPostJobForm').value.trim();
	const requestUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&apiKey=8a4e247166574725a8de05e06f3c9d74`;
	handleLocationInput('locationNameInputPostJobForm', 'locatioNameAutoComplete', requestUrl);

}

function updateCompanyNameInputField(suggestion){
	
	document.getElementById('companyNameInputInJobPost').value = suggestion.company_name;


	document.getElementById('hiddenCompanyWebsite').value = suggestion.company_website;

}


function companyNameSuggestions(suggestions){

var ul = ``;	

	if(suggestions.length > 0){
		for(var i =0; i< suggestions.length; i++) {
			ul += `<li onclick = 'updateCompanyNameInputField( ${JSON.stringify(suggestions[i])} )' title = "${suggestions[i].company_name}"  class = "option p-2"> ${suggestions[i].company_name }  </li>`;
		};		
		return ul;
	}
	else{
		return '<p class = "text-center">No suggestions</p>'
	}
}

async function handleCompanyInputInPostJobForm(){
	var inputValue = document.getElementById('companyNameInputInJobPost').value;

	if(inputValue.trim().length >= 2){
		document.getElementById('companyNameAutocomplete').innerHTML = '<p class="text-center">Loading</p>'

		fetch('php/companyPage/suggestions.php?incompleteName=' + inputValue )
		.then(response => response.json())
		.then(data => {
			document.getElementById('companyNameAutocomplete').innerHTML = companyNameSuggestions(data);
		} )
	}
	else{
		document.getElementById('companyNameAutocomplete').innerHTML = '<p class ="text-center">Enter Company Name</p>';
	}
}