function loadPostJobForm(){
	var divId = siteName + '/postJobForm';
	
	var hdrTable = createHomeHdr(activeTab = 'jobPostForm');

	execFrontendOnlyFunction(divId, hdrTable, displayPostJobForm);

}

const displayPostJobForm = () => {

var divId = siteName + '/postJobForm';

const form = `
<h4 class = "text-center" >Post a Job </h4>

<hr>

<form id = "postJobForm" method = "POST">

	<div class = "gridHolder" id="formHolder">
		
		<div>
			<label for = "position"> Position </label>
			<input required  name = "jobPostJobPosition" id = "position" >
		</div>
		

		
			
		<div id = "companyHolder">
			<label for = "companyNameInput">Company Name</label>
			<input required name = "jobPostCompanyName" id = "companyNameInput">
			<div id = "companyNameAutocomplete"></div>
		</div>

		<div id = "locationHolder" style = "position:relative">
			<label for = "locationNameInputPostJobForm">Location</label>
			<input required type="text"
					name = "jobPostLocation" 
					id = "locationNameInputPostJobForm"
					onkeyup = "handleLocationInputInPostJobForm()">
			<div id="locatioNameAutoComplete" style = "position:absolute" class = "locatioNameAutoComplete"></div> 
		</div> 

		<div>
			<label for = "jobPostDeadline"> Deadline </label>
			<input required type = "date" id = "jobPostDeadline" 
			name = "jobPostDeadline">

		</div>

		<div>
			<label for="jobPostJobType">Select Job Type</label>
			<select name = "jobPostJobType" required id="jobPostJobType">
			    <option value="Full Time">Full Time</option>
			    <option value="Part Time">Part Time</option>
			    <option value="Internship">Internship</option>
			</select>
		</div>

		<div>
			<label for="jobPostJobIndustry">Select Job Industry</label>
			<select required name = "jobPostJobIndustry" id="jobPostJobIndustry">
			    <option value="Software">Software</option>
			    <option value="Networking and Hardware">Networking and Hardware</option>
			    <option value="Human Resources">Human Resources</option>
			    <option value="Teacher / Instructer">Teacher / Instructer</option>
			</select>
		</div>

		<div>
			<label for="jobPostJobSite">Select Job Site</label>
			<select required  id="jobPostJobSite" name = 'jobPostJobSite'>
			    <option value="On-Site">On-Site</option>
			    <option value="Remote">Remote/option>
			    <option value="Hybrid">Hybrid</option>
			</select>
		</div>


		<div>
			<label for="jobPostEducationLevel">Minimum Education Level</label>
			<select id = 'jobPostEducationLevel' name = "jobPostEducationLevel" required>
			    <option value="Any Level">Any Level</option>
			    <option value="Intermediate (Plus 2)">Intermediate (Plus 2)</option>		    
			    <option value="Bachelor's Degree">Bachelor's Degree</option>
			    <option value="Master's Degree">Master's Degree</option>
			   	<option value="PhD. Degree">PhD. Degree</option>
			</select>
		</div>
	</div>
	<div>
		<label for = "jobPostJobDescription"> Job Description </label>
		<textarea required rows = "12" 
		name = "jobPostJobDescription"
		style = "width:100%" id = "jobPostJobDescription" name="jobDescription"></textarea>
	</div>

</form>

	<div class = "mt-3 text-center">
		<button id = "postJobButton" 
			onclick =  " (IS_LOGGED_IN) ? handleJobUpload() : displayLoginOverlay('Post New Job', 'post the job')  " style = "font-weight:bold" class = "longButton btn btn-primary">
			Continue
		</button>
	</div>

`

document.getElementById(divId).innerHTML = form;

var formHolder = document.getElementById('formHolder')

manageGrid(formHolder);


}


function verifyCompanyEmail(){

	hideOverlay();

	var text = `
		<div>

			You need to be an employee of this company to post the job.
			
			
			<br>

			You may cancel now if your are unauthorized to post the job
			for this company.
			<BR>
			<div class =  "mt-2">
				<form = "verifyCompanyEmailBeforePostingJobEnterEmail"
					<label> Your Company Email</label>
					<input type = "text" name = "companyEmail">
				</form>
			</div>

		</div>
	`;


	displayPrompt('Enter Company Email', 
					text,
					"continueVerifyCompanyEmail()",
				);


}

function continueVerifyCompanyEmail(){

hideOverlay();

	// retrieve email and send request to send the code


	var text = `
		
		Email sent. It may take up to 5 minutes to receive email.

		<div class = "text-danger" style = "font-weight:bold">
			Don't close this box without entering the correct code. 
			You need to wait 5 minutes before requesting another 
			verification code.		
		</div>

		<div class = "mt-2">
			<form = "verifyCompanyEmailBeforePostingJobActualCode"
				<label>Enter the Code</label>
				<input type = "text" name = "companyEmail">
			</form>
		</div>
	`;


	displayPrompt('Enter Verification Code', 
					text,
					"proceedJobUploadVerifyCode()",
				);

}





function proceedJobUploadVerifyCode(){
	// verfiy the code

	hideOverlay();

	var text = `
		<div>
				Please wait while we check the code you sent. Your job will
				be posted if the code is correct.
				<br>
		</div>

	`

	displayPromptWithoutFooterOptions('Please Wait...', text);


	// check whether code is true

	// if true post the job

}


async function handleLocationInputInPostJobForm() {

	var inputValue = document.getElementById('locationNameInputPostJobForm').value.trim();
	const requestUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&apiKey=8a4e247166574725a8de05e06f3c9d74`;
	handleLocationInput('locationNameInputPostJobForm', 'locatioNameAutoComplete', requestUrl);

}

function handleJobUpload(){
	var text  = `Are you sure that the data is valid? Click 
					on cancel if you are unsure, otherwise click continue
				to confirm and post the new job.`
	displayPrompt(title = 'Job Data', text, callback = 'verifyCompanyEmail()')
}	

function uploadJob(){


	var jobDataHolder = document.getElementById('postJobForm')

	var formData = new FormData(jobDataHolder);
	
	deactivateButton('postJobButton', 'Please Wait...');

	var xmlhttp = new XMLHttpRequest;
	xmlhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			console.log(this.responseText);
			var data = JSON.parse(this.responseText);
			if(data.error){
				alert(data.error);
				activateButton('postJobButton', 'Post Job');
				
			}
			else{
				//alert('Job Post Successful');
				activateButton('postJobButton', 'Job Post Successful.');

			}
		}
	}
	xmlhttp.open('POST', siteName + '/php/jobs/post.php');
	xmlhttp.send(formData);

}