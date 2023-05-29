function createSubHeaderForSavedJobs(activeTab){
	var top = returnTopOfMiddleMainContent();
	return `
	
	<div  class = "stickyLeftOrRight mt-4 mb-4  center-div text-center" style = "top: ${top}; z-index:2; max-width:400px; width:100%; margin: 0 auto; ">
		<div  class = "savedJobsSubHdrHolder">
			<table class = "savedJobsSubHdr">
				<tr>
					<td  onclick = "loadAppliedJobs()" class = " ${ (activeTab === 'applied') ? 'activeSavedJobsSubHdr' : '' } ${EMPLOYER_MODE ? 'd-none' : '' } " >
						Applied
					</td>
					<td onclick = "loadPostedJobs()" class = ${ (activeTab === 'posted' ) ? 'activeSavedJobsSubHdr' : '' } >
						Posted
					</td>
					<td onclick = "loadClosedJobs()" class = ${ (activeTab === 'closed' ) ? 'activeSavedJobsSubHdr' : '' } >
						Closed
					</td>
				</tr>
			</table>
		</div>
	`;	
}

function loadSaved(type, callback, hardRefresh = false){

	var divId = siteName + `/jobs/saved/${type}`;
	
	var hdrTable = createHomeHdr(activeTab = 'applied');

	var serverURL = siteName + `/php/jobs/saved/${type}.php`;

	loadTab(divId, serverURL, callback, hdrTable, hardRefresh);
}

function loadAppliedJobs(){
	loadSaved('applied', displayApplied);
}

const displaySaved=  (divId, type, jobs) => {
	var div = document.getElementById(divId);

	div.innerHTML = createSubHeaderForSavedJobs(type);

	var displayInThisDiv = div;

	display(jobs, displayInThisDiv, callback = returnEachJob, divId); // library.js
}


const displayApplied = (jobs, divId) => {
	displaySaved(divId, 'applied', jobs);
}


function loadPostedJobs(hardRefresh = false){
	loadSaved('posted', displayPosted, hardRefresh);
}


const displayPosted = (jobs, divId) => {
	displaySaved(divId, 'posted', jobs);
}


function loadClosedJobs(){
	loadSaved('closed', displayClosed);
}


const displayClosed = (jobs, divId) => {
	displaySaved(divId, 'closed', jobs);
}