
function loadScaffold(event, jobId, page = 1, pOrR = 'push'){

	event.stopPropagation() ;

	var divId = siteName + '/applicants/scaffold?jobId='+jobId+'&page='+page
	
	var hdrTable = createGeneralHdr('Viewing unfiltered Applicants ');

	var serverURL = siteName + '/php/jobs/applicants/scaffold.php?jobId='+jobId+'&page='+page

	loadTab(divId, serverURL, displayScaffold, hdrTable, hardRefresh = false, pOrR);

}



function loadShortListed(jobId, page = 1, pOrR = 'push'){

	var divId = siteName + '/applicants/shortlisted?jobId='+jobId+'&page='+page
		
	var hdrTable = createGeneralHdr('Viewing Shortlisted Applicants');

	var serverURL = siteName + '/php/jobs/applicants/shortlisted.php?jobId='+jobId+'&page='+page

	loadTab(divId, serverURL, displayShortListed, hdrTable, hardRefresh = false, pOrR);

}


function loadRejected(jobId, page = 1, pOrR = 'push'){
	var divId = siteName + '/applicants/rejected?jobId='+jobId+'&page='+page
	
	var hdrTable = createGeneralHdr('Viewing Rejected Applicants');

	var serverURL = siteName + '/php/jobs/applicants/rejected.php?jobId='+jobId+'&page='+page

	loadTab(divId, serverURL, displayRejected, hdrTable, hardRefresh = false,  pOrR);	
}


function createSubHeaderForScaffold(activeTab, jobId){
	var top = returnTopOfMiddleMainContent();
	
	return `
	
	<div  class = "stickyLeftOrRight mt-4 mb-4  center-div text-center" style = "top: ${top}; z-index:2; max-width:400px; width:100%; margin: 0 auto; ">
		<div  class = "savedJobsSubHdrHolder">
			<table class = "savedJobsSubHdr">
				<tr>
					<td  onclick = "loadScaffold(event, ${jobId}, 1, 'replace' )" class = "${ (activeTab === 'all') ? 'activeSavedJobsSubHdr' : '' }  " >
						Unfiltered
					</td>
					<td onclick = "loadShortListed(${jobId}, 1, 'replace')" class = ${ (activeTab === 'shortlisted' ) ? 'activeSavedJobsSubHdr' : '' } >
						Shortlisted
					</td>
					<td onclick = "loadRejected(${jobId}, 1, 'replace')" class = ${ (activeTab === 'rejected' ) ? 'activeSavedJobsSubHdr' : '' } >
						Rejected
					</td>
				</tr>
			</table>
		</div>
	`;	
}

function  eachApplicantWithOptions(text,  callback, shortListCallback, rejectCallback, applicationId){
	return `
		<div id = "applicant_${applicationId}" onclick = "${callback}" class = "jobMainInfo p-3">
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

		</div>
	`
}


function shortList(event, loginName, jobId, applicationId){

	event.stopPropagation();
	var serverURL = siteName + '/php/jobs/applicants/action/shortlist.php?loginName='+loginName+'&jobId='+jobId
	divId = 'applicant_'+applicationId;
	deletee(serverURL, divId);


}

function reject(event, loginName, jobId, applicationId){
	
	event.stopPropagation();
	var serverURL = siteName + '/php/jobs/applicants/action/reject.php?loginName='+loginName+'&jobId='+jobId
	divId = 'applicant_'+applicationId;
	deletee(serverURL, divId);

}


function createEachLink(pageNumber, callback, activeLink){

	return `
		<div   onclick = "${ pageNumber != activeLink ? callback + pageNumber + ', \'refresh\')' : ''}" class = "nav-flex-item ${pageNumber == activeLink ? 'activeNavLink' : ''} ">
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




const displayApplicants = (data, divId, activeTab) => {

	const applicants = data.applicants;

	var divContent = '';	
	
	var newDiv = document.createElement('div');
	
	newDiv.className = "gridHolderModified";
	
	newDiv.id = "grid_all_"+divId;

	for(var i = 0; i < applicants.length; i++){
		divContent += eachApplicantWithOptions('@'+applicants[i].login_name ,
		 `loadViewProfile( '${applicants[i].login_name}', jobId = ${data.jobId})`,
		 `shortList(event, '${applicants[i].login_name}', ${data.jobId}, ${applicants[i].id})`,
		 `reject(event, '${applicants[i].login_name}', ${data.jobId}, ${applicants[i].id})`,
		 applicants[i].id
		 )
	}
	
	newDiv.innerHTML = divContent;

	document.getElementById(divId).innerHTML = createSubHeaderForScaffold(activeTab, data.jobId);

	document.getElementById(divId).appendChild(newDiv);


	if(parseInt(data.numApplicants) > 0){

		switch(activeTab){
			case 'all':
				var callback = 	`loadScaffold(event, ${parseInt(data.jobId)},`
			break;
			case 'shortlisted':
				var callback = 	`loadShortListed(${parseInt(data.jobId)},`
			break;
			case 'rejected':
				var callback = 	`loadRejected(${parseInt(data.jobId)},`				
			break;
		}

		const navLinks = createNavLinks(parseInt(data.numApplicants), callback , activeLink = parseInt(data.page)+1)

		document.getElementById(divId).appendChild(navLinks);
	}
}



const displayScaffold = (data, divId) =>{
	displayApplicants(data, divId, 'all');
}



const displayShortListed = (data, divId) => {
	displayApplicants(data, divId, 'shortlisted');
}


const displayRejected = (data, divId) => {
	displayApplicants(data, divId, 'rejected');
}	
