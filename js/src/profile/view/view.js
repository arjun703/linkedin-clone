function loadViewProfile(of, jobId = ''){


	var divId = siteName + '/profile/' + of;
	var hdrTable = createHomeHdr(activeTab = 'sdfdsf');
	var serverURL = siteName + '/php/profile/view.php?of='+ of+'&fromJobId='+jobId;
	loadTab(divId, serverURL, displayProfile, hdrTable);


}

const displayProfile = (data, divIdd) => {
	


	var profileHolder = ``

	const loginName = data.personal.login_name;

	window.VIEWING_PROFILE_OF = loginName;

	var jobId = data.jobId;
			
		
	var personalHolder = 	displayProfileHeader(loginName, jobId) + 
							`<div id = "personal_${loginName}">` +
								displayPersonal(data.personal) + 
						 	 `</div>`;

	var experienceHolder = displayExperiences(data.experiences);

	var skillsHolder =  displaySkills(data.skills);

	var projectsHolder = 	displayProjects(data.projects);

	var educationsHolder =  	displayEducations(data.educations);


	document.getElementById(divIdd).innerHTML =
		personalHolder+ experienceHolder+ skillsHolder+projectsHolder+educationsHolder;

}


function createTd(callback, btnText){
	return`
		<td style = "text-align:right"  
			onclick = '${callback}' >
			${
				createPrimaryButton(btnText)
			}
		</td>
	`
}


function createProfileSubHeader(title, profileOwnershipRequired, btnText = '', callback = ''){
	return`
		<div>
			<table class = 'fixedTable'>
				<tr>
					<td class = "h5">
						${title}
					</td>
					${
						( profileOwnershipRequired
						  ? 
						  ( IS_LOGGED_IN
							  ? (VIEWING_PROFILE_OF == LOGIN_NAME)	
								  	? createTd(callback, btnText)
								  	: ''
							  : ''
						  )

						:  createTd(callback, btnText)
						
						)
					}

				</tr>
			</table>
		</div>
	`;
}

function createSuccessButton(text){
	return `
		<button class = "btn btn-success">
			${text}
		</button>
	`
}
	  


function displayProfileHeader(of, jobId= ''){
	return `
		
		<div  class = "profileHader p-2 mt-4 mb-5"
				style = " max-width:350px; background: var(--bgColorOfCards); top: ${returnTopOfMiddleMainContent()}"
			> 
				<table class= "fixedTable">
					<tr>
						<td style="font-weight:bold;text-align:center">
							@${of}
						</td>


						${createTd('dowloadCV(\''+of+'\', '+jobId+')' , 'Download CV')}

					</tr>
				</table>

		</div>
		<hr>
	`

}


function deleteButton(){
	return `
		<button class= "btn  btn-danger">
			Delete
		</button>
	`
}

function createAddNewTd(callback){
	return`
		<td style = "text-align:right" onclick = "${callback}">
			${ createPrimaryButton('Add New') }
		</td>
	`
}

function createPrimaryButton(text){
	return `
		<button class = "btn btn-primary">
			${text}
		</button>
	`
}


function createDangerButton(text){
	return `
		<button class = "btn btn-danger">
			${text}
		</button>
	`
}



function viewOwnProfile(){
	loadViewProfile(LOGIN_NAME);
}
