function limitedApplicantsScaffold(event, jobId, numApplicants){
event.stopPropagation() ;
	var divId = siteName + '/job/'+jobId+'/applicants/scaffold';
	
	var hdrTable = createGeneralHdr('View Applicants');
	
	execFrontendOnlyFunction(divId, hdrTable, displayLimitedApplicantScaffold, data = [jobId, numApplicants]);
}


function eachApplicant(text, callback){
	return `
		<div onclick = "${callback}" class = "jobMainInfo p-3">
			<div class = "flex-container align-items-center">
				<div>
					<i class = "fa fa-user-circle fa-2x"></i>
				</div>
				<div style="margin-left:10px">
					${text}
				</div>
			</div>
		</div>
	`
}



const displayLimitedApplicantScaffold = ([jobId, numApplicants]) =>{
	var divId = siteName + '/job/'+jobId+'/applicants/scaffold';
	var divContent = `<div class = "gridHolderModified2">`
	var j = 0;
	for(var i = numApplicants; i > numApplicants - 10 && i > 0 ; i--){
		divContent += eachApplicant(`Applicant #${i}` , `loadLimitedContentOfApplicants(${i}, ${j}, ${jobId})`);
		j++;
	}
	divContent+'</div>';
	document.getElementById(divId).innerHTML =  divContent;
}
