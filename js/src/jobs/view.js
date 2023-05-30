function loadEachJob(job){
	var divId = siteName + '/job/'+job.id;
	
	var hdrTable = createGeneralHdr(job.position);
	
	execFrontendOnlyFunction(divId, hdrTable, displayJob, data = job);
}


function isJobPoster(job){
	return  job.job_poster == LOGIN_NAME
				? true	
				: false
}


function closeJob(jobId){


	var text = `
		Job seekers won\'t see this job post any more. Are you sure to close the job?
	`

	displayPrompt('Close job?', 
					text,
					`proceedJobClosing(${jobId})`,
					true
				);

}

function proceedJobClosing(jobId){

	loadPostedJobs();
	const serverURL = siteName+'/php/jobs/close.php?jobId='+jobId
	const divId = 'job_'+jobId;
	const div = document.getElementById(divId);
	

	let button = document.getElementById('applyTo_'+jobId);
	button.classList.add('disabled')
	
	button.innerHTML = "Closed";
	button.onclick = () => {}

	const closedTabId = siteName +'/jobs/saved/closed';
	const closedJobsHolder = 'grid_'+closedTabId;
	
	if(document.getElementById(closedJobsHolder)){

		deletee(serverURL, divId, closedJobsHolder);

	}
	else{
		deletee(serverURL, divId);
	}
	

}

function activateJob(jobId){
	VerifyYourEmail();
	document.getElementById('applyTo_'+jobId).style.display = "none";
}

const displayJob = (job) => {
	const divId = siteName + '/job/'+job.id;

	const content  =`
		<DIV class="jobMainInfoClone">
			<div>
				 
				<div class = "h5">Job Overview </div>

				<div class = "fontSize20"> ${job.position}</div>
				

				<div class = "fontSize17 cursorPointer" onclick = "loadCompanyPage(${job.company_id})" > ${job.company_name}</div>
				<div class = "flex-container">
					<div class = "simpleFlexItem position-relative">${jobTypeFull(job.job_type)}<span class = "smallCircle position-absolute"></span></div>

					<div class = "simpleFlexItem position-relative  ">${jobSiteFull(job.job_site)}<span class = "smallCircle position-absolute"></span></div>
					<div class = "simpleFlexItem position-relative">${job.location}<span class = "smallCircle position-absolute"></span></div>

					<div class = "simpleFlexItem">${job.num_applicants} Applicants</div>

				</div>

			</div>	

			<div class = " mt-2 mb-2 text-center">

				<table class = "simpleTable">
					<tr>
						<td id = "applyTo_${job.id}" 

							class = "btnHighlighted ${ IS_LOGGED_IN ? isJobPoster(job) ? 'btnDangerMyOwn' : 'btnPrimaryMyOwn' : 'btnPrimaryMyOwn' }
									${  IS_LOGGED_IN
											? isJobPoster(job)
												? (job.active_status == '0' )
													? job.verified == '0'
														? ''
														: 'disabled'
													: '' 
												: hasApplied(job)
													? 'disabled' 
													: ''
											:'' 
										 }
								  "
							onclick = "${ IS_LOGGED_IN
											? isJobPoster(job)
												? (job.active_status == '0' )
													? job.verified == '0'
														? 'activateJob('+job.id+')'
														: ''
													: 'closeJob('+job.id+')' 
												: hasApplied(job)
													? '' 
													: 'applyToJob('+job.id+')'
											:'displayLoginOverlay(\'Apply\', \'apply to jobs\')' 
										}"
						>
							${ IS_LOGGED_IN
								? isJobPoster(job)
								 	? job.active_status == '0'
										? job.verified == '0'
											? 'Activate Job'
											: 'Closed'
										: 'Close Job'
									: hasApplied(job)
										? 'Applied'
										: 'Apply'
							 	: 'Apply'
							 }

						</td>
						<td class = "btnBordered" 
						 onclick = "${viewApplicantOnclick(job.job_poster, job.id, job.num_applicants )}"
						 >
							View all Applicants
						</td>
					</tr>
				</table>
			</div>

		</div>
		
		<div class = "mt-3 jobMainInfoClone">
			<div class = "h5">Job Description</div>

			<div>${job.description}</div>
		</div>

	` 
	document.getElementById(divId).innerHTML = content;
}

function applyToJob(jobId){
	let applyBtn = document.getElementById(`applyTo_${jobId}`)
	applyBtn.classList.add('fadeOutAnimation');
	applyBtn.classList.add('disabled');

	fetch(siteName + '/php/jobs/apply.php?id='+jobId)
	.then(response => response.json())
	.then(data => {
		if(data.error){
			alert('Error - '+data.error);
			applyBtn.classList.remove('fadeOutAnimation');
			applyBtn.classList.remove('disabled');
		}
		else{
			applyBtn.innerHTML = 'Applied'
			applyBtn.onclick = '';
			applyBtn.classList.remove('fadeOutAnimation');
		}

	} )
	.catch(error => alert(error))
}