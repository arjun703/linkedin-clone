function createEachLink(pageNumber, callback, activeLink){

	return `
		<div   onclick = "${ pageNumber != activeLink ? callback + pageNumber + ')' : ''}" class = "nav-flex-item ${pageNumber == activeLink ? 'activeNavLink' : ''} ">
			${pageNumber}
		</div>
	`
}

function createNavLinks(number, callback, activeLink){
	
	const itemsPerPage = 2.0;

	number = 20;

	const numberOfPages = Math.ceil(number/itemsPerPage);

	const navLinksHolder = document.createElement('div');

	var navLinks =``;

	for(var pageNumber = 1; pageNumber <= numberOfPages; pageNumber++ ){
		navLinks += createEachLink(pageNumber, callback, activeLink)
	}

	navLinksHolder.innerHTML =  `
		<div  class  = "mt-4 justify-content-center flex-container navLinksHolder">
			${navLinks}
		</div>
	`
	return navLinksHolder;

}

function loadScaffold(event, jobId, numApplicants, page = 1){

	event.stopPropagation() ;

	var divId = siteName + '/applicants/scaffold?jobId='+jobId+'&page='+page+'&numApplicants='+numApplicants;
	
	var hdrTable = createHomeHdr(activeTab = 'sdfsdf');

	var serverURL = siteName + '/php/jobs/applicants/scaffold.php?jobId='+jobId+'&page='+page+'&numApplicants='+numApplicants;

	loadTab(divId, serverURL, displayScaffold, hdrTable);

}

function loadShortListed(jobId, numApplicants, page = 1){

	var divId = siteName + '/applicants/shortlisted?jobId='+jobId+'&page='+page+'&numApplicants='+numApplicants;
		
	var hdrTable = createHomeHdr(activeTab = 'sdfsdf');

	var serverURL = siteName + '/php/jobs/applicants/shortlisted.php?jobId='+jobId+'&page='+page+'&numApplicants='+numApplicants;

	loadTab(divId, serverURL, displayShortListed, hdrTable);

}


function loadRejected(jobId, numApplicants, page = 1){
	var divId = siteName + '/applicants/rejected?jobId='+jobId+'&page='+page+'&numApplicants='+numApplicants;
	
	var hdrTable = createHomeHdr(activeTab = 'sdfsdf');

	var serverURL = siteName + '/php/jobs/applicants/shortlisted.php?jobId='+jobId+'&page='+page+'&numApplicants='+numApplicants;

	loadTab(divId, serverURL, displayRejected, hdrTable);	
}


function createSubHeaderForScaffold(activeTab, jobId, numApplicants){
	var top = returnTopOfMiddleMainContent();
	
	return `
	
	<div  class = "stickyLeftOrRight mt-4 mb-4  center-div text-center" style = "top: ${top}; z-index:2; max-width:400px; width:100%; margin: 0 auto; ">
		<div  class = "savedJobsSubHdrHolder">
			<table class = "savedJobsSubHdr">
				<tr>
					<td  onclick = "loadScaffold(event, ${jobId}, ${numApplicants} )" class = "${ (activeTab === 'all') ? 'activeSavedJobsSubHdr' : '' }  " >
						Applicants
					</td>
					<td onclick = "loadShortListed(${jobId}, ${numApplicants})" class = ${ (activeTab === 'shortlisted' ) ? 'activeSavedJobsSubHdr' : '' } >
						Shortlisted
					</td>
					<td onclick = "loadRejected(${jobId}, ${numApplicants})" class = ${ (activeTab === 'rejected' ) ? 'activeSavedJobsSubHdr' : '' } >
						Rejected
					</td>
				</tr>
			</table>
		</div>
	`;	
}

function  eachApplicantWithOptions(text, callback, shortListCallback, rejectCallback){
	return `
		<div id = "applicant_${text}" onclick = "${callback}" class = "jobMainInfo p-3">
			<div class = "flex-container align-items-center">
				<div>
					<i class = "fa fa-user-circle fa-2x"></i>
				</div>
				<div style="margin-left:10px">
					${text}
				</div>
				<div class = "flex-container  applicantOptions justfy-content-end">
					<div title="ShortList" onclick= "${shortListCallback}" class = "successIcon">
						<i class = "fa fa-check"></i>
					</div>
					<div title="Reject" class="dangerIcon" onclick="${rejectCallback}">
						<i class = "fa fa-trash"></i>
					</div>
				</div>
			</div>	

			<div>
				3 years of experience as Jr. R&D Engineer
			</div>

		</div>
	`
}


function shortList(event, loginName, jobId){

	event.stopPropagation();
	alert(loginName+', '+jobId);

}

function reject(event, loginName, jobId){
	
	event.stopPropagation();
	alert(loginName+', '+jobId);

}





const displayApplicants = (data, divId, activeTab) => {

	const applicants = data.applicants;

	var divContent = '';	
	
	var newDiv = document.createElement('div');
	
	newDiv.className = "gridHolderModified";
	
	newDiv.id = "grid_all_"+divId;

	for(var i = 0; i < applicants.length; i++){
		divContent += eachApplicantWithOptions('@'+applicants[i].login_name ,
		 `loadViewProfile( '${applicants[i].login_name}', jobId = ${data.jobId})`,
		 `shortList(event, '${applicants[i].login_name}', ${data.jobId})`,
		 `reject(event, '${applicants[i].login_name}', ${data.jobId})`
		 )
	}
	
	newDiv.innerHTML = divContent;

	document.getElementById(divId).innerHTML = createSubHeaderForScaffold(activeTab, data.jobId, data.numApplicants);

	document.getElementById(divId).appendChild(newDiv);

	if(parseInt(data.numApplicants) > 0){

		const navLinks = createNavLinks(parseInt(data.numApplicants), `loadScaffold(event, ${parseInt(data.jobId)}, ${parseInt(data.numApplicants)},`, activeLink = parseInt(data.page)+1)

		document.getElementById(divId).appendChild(navLinks);
	}
}



const displayScaffold = (data, divId) =>{
	displayApplicants(data, divId, 'all');
}



const displayShortListed = (data, divId) => {
	displayApplicants(data, divId);
}


const displayRejected = (data, divId) => {
	displayApplicants(data, divId);
}	
