const displayHome =  (jobs, divIdd = '') => {
	

	var displayInThisDiv = document.getElementById(divIdd);

	const homeSubHeader = createProfileSubHeader('Jobs Based On Your Preferences', 
			profileOwnershipRequired = false , 
			btnText = 'Edit Filters', 
			callback = 'displayFilterPrompt()');

	const homeSubHeaderHolder = document.createElement('div');

	homeSubHeaderHolder.innerHTML = homeSubHeader + '<hr>';

	displayInThisDiv.appendChild(homeSubHeaderHolder);

	var jobsBasedOnPreferences = jobs.filter(job => job.job_site != "re" );


	display(jobsBasedOnPreferences, displayInThisDiv, callback = returnEachJob, divIdd); // library.js

	const remoteJobsHolder = document.createElement('div');
	
	remoteJobsHolder.innerHTML = `
	
		<h5 class = "mt-4"> Remote Jobs based on your Location </h4>
		<hr>
	`
	displayInThisDiv.appendChild(remoteJobsHolder);

	var remoteJobs = jobs.filter(job => job.job_site == "re");

	display(remoteJobs, displayInThisDiv, callback = returnEachJob, divIdd); // library.js

}


function loadHome(){

	var divId = siteName + '/';
	
	var hdrTable = createHomeHdr(activeTab = 'home');

	
	var serverURL = apiFolder + '/home.php';

	loadTab(divId, serverURL, displayHome, hdrTable);

}

function displayAppliedBadge(job){
	if(job.hasOwnProperty('has_applied')){
		if(job.has_applied=='true'){
			return `

				<div class  = "simpleFlexItem position-relative">
					<span class="myOwnBadge">Applied</span>
				</div>
			`
		}
		else return ``
	}
	else return ``
}

function displayPendingBadge(job){
	return IS_LOGGED_IN
			? isJobPoster(job)
			 	? job.active_status == '0'
					? job.verified == '0'
						? `
							<div class  = "simpleFlexItem position-relative">
								<span class="myOwnBadge">Pending</span>
							</div>
						`
						: ''
					: ''
				: ''
		 	: ''
		
}

function hasApplied(job){
	if(job.has_applied=='true')return true;
	else return false;		
}


function jobTypeFull(jt){
	return jt == 'fu'
				? 'Full-Time'
				: jt == 'pa'
					? 'Part-Time'
					: 'Internship'
}

function jobSiteFull(js){
	return js == 'on'
				? 'On-Site'
				: js == 're'
					? 'Remote'
					: 'Hybrid'
}

function createJobContent(job){
	return `
		<div class = "fontSize20"> ${job.position}</div>
		<div class = "fontSize17"> ${job.company_name}</div>
		<div class = "flex-container">
			<div class = "simpleFlexItem position-relative">${jobTypeFull(job.job_type)}<span class = "smallCircle position-absolute"></span></div>

			<div class = "simpleFlexItem position-relative  ">${jobSiteFull(job.job_site)}<span class = "smallCircle position-absolute"></span></div>
			
			<div class = "simpleFlexItem position-relative">${job.location}<span class = "smallCircle position-absolute"></span></div>

			<div class = "simpleFlexItem position-relative">${job.num_applicants} Applicants</div>

			${ displayAppliedBadge(job) }
			${displayPendingBadge(job)}

		</div>
		<div class = "spareDiv"></div>
		<div class = "text-center viewApplicantHolder">
			<div class = "simpleButton"
			onclick = "${viewApplicantOnclick(job.job_poster, job.id, job.num_applicants )}"

			>View All Applicants</div>
		</div>

	`
}

const returnEachJob =  (job) => {

	var divContent  = createJobContent(job);
	var newdiv = document.createElement('div');
	newdiv.onclick  = () => {loadEachJob(job)};
	newdiv.className = "jobMainInfo";
	newdiv.id = 'job_'+job.id;
	newdiv.innerHTML = divContent;
	return newdiv;

}

function viewApplicantOnclick(jobPoster, jobId, numApplicants){
	
	if(IS_LOGGED_IN){
		if(LOGIN_NAME == jobPoster){
			return `loadScaffold(event, ${jobId}, ${numApplicants})`
		}
		else{
			return 'limitedApplicantsScaffold(event, '+jobId+', '+numApplicants+')';
		}
	}
	else{
		return 'limitedApplicantsScaffold(event, '+jobId+', '+numApplicants+')';
	}
}

