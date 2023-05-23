function loadEachJob(job){
	var divId = siteName + '/job/'+job.id;
	
	var hdrTable = createGeneralHdr(job.position);
	
	execFrontendOnlyFunction(divId, hdrTable, displayJob, data = job);
}

const displayJob = (job) => {
	const divId = siteName + '/job/'+job.id;

	const content  =`
		<div>
			<div class = "h5 mt-3 text-center"> Job Overview </div>
			
			<div class = "fontSize20"> ${job.position}</div>
			

			<div class = "fontSize17 cursorPointer" onclick = "loadCompanyPage(${job.company_id})" > ${job.for_company}</div>
			<div class = "flex-container">
				<div class = "simpleFlexItem position-relative">${job.job_type}<span class = "smallCircle position-absolute"></span></div>

				<div class = "simpleFlexItem position-relative  ">${job.job_site}<span class = "smallCircle position-absolute"></span></div>
				<div class = "simpleFlexItem position-relative">${job.location}<span class = "smallCircle position-absolute"></span></div>
				<div class = "simpleFlexItem position-relative">${job.education_level}<span class = "smallCircle position-absolute"></span></div>

				<div class = "simpleFlexItem">${job.num_applicants} Applicants</div>

			</div>

		</div>	

		<hr>		


			<div class = "text-center">

				<table class = "simpleTable">
					<tr>
						<td class = "btnHighlighted btnPrimaryMyOwn">
							Apply
						</td>
						<td class = "btnBordered">
							View all Applicants
						</td>
					</tr>
				</table>
			</div>

			<hr>
		
		<div>
			<div class = "h5 text-center">Job Description</div>

			<div>${job.description}</div>
		</div>

	` 
	document.getElementById(divId).innerHTML = content;
}
