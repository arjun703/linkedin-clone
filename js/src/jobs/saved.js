function createSubHeaderForSavedJobs(activeTab){
	var top = returnTopOfMiddleMainContent();
	return `
	
	<div  class = "stickyLeftOrRight mt-5  center-div text-center" style = "top: ${top}; max-width:400px; width:100%; margin: 0 auto ">
		<div  class = "savedJobsSubHdrHolder">
			<table class = "savedJobsSubHdr">
				<tr>
					<td onclick = "loadSavedJobs()" class = ${ (activeTab === 'applied') ? 'activeSavedJobsSubHdr' : '' } >
						Applied
					</td>
					<td onclick = "loadPostedJobs()" class = ${ (activeTab === 'posted' ) ? 'activeSavedJobsSubHdr' : '' } >
						Posted
					</td>
				</tr>
			</table>
		</div>
		</div>

		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
	`;	
}

function loadSavedJobs(){

	var divId = siteName + '/savedJobs/applied';
	
	var hdrTable = createHomeHdr(activeTab = 'savedJobs');

	clearHdrAndPut(hdrTable);

	locationToHdrMapper[divId] = hdrTable; 
	
	var serverURL = apiFolder + '/savedJobs/applied.php';

	execFrontendOnlyFunction(divId, displayApplied,  pushOrReplace = 'push');

}

const displayApplied = () => {
	document.getElementById(siteName + '/savedJobs/applied').innerHTML = createSubHeaderForSavedJobs('applied');	
}


function loadPostedJobs(){
	var divId = siteName + '/savedJobs/posted';
	
	var hdrTable = createHomeHdr(activeTab = 'savedJobs');

	clearHdrAndPut(hdrTable);

	locationToHdrMapper[divId] = hdrTable; 
		
	var serverURL = apiFolder + '/savedJobs/posted.php';

	execFrontendOnlyFunction(divId, displayPostedJobs,  pushOrReplace = 'push');

}

const displayPostedJobs = () => {
	document.getElementById(siteName + '/savedJobs/posted').innerHTML = createSubHeaderForSavedJobs('posted');		
}
