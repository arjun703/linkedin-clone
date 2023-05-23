const displayHome =  (jobs, divIdd = '') => {
	
	var displayInThisDiv = document.getElementById(siteName + '/');

	display(jobs, displayInThisDiv, callback = returnEachJob); // library.js

}


function loadHome(){

	var divId = siteName + '/';
	
	var hdrTable = createHomeHdr(activeTab = 'home');

	
	var serverURL = apiFolder + '/home.php';

	loadTab(divId, serverURL, displayHome, hdrTable);;

}

const returnEachJob =  (job) => {


	var divContent  = `
			<div class = "fontSize20"> ${job.position}</div>
			<div class = "fontSize17"> ${job.for_company}</div>
			<div class = "flex-container">
				<div class = "simpleFlexItem position-relative">${job.job_type}<span class = "smallCircle position-absolute"></span></div>

				<div class = "simpleFlexItem position-relative  ">${job.job_site}<span class = "smallCircle position-absolute"></span></div>
				<div class = "simpleFlexItem position-relative">${job.location}<span class = "smallCircle position-absolute"></span></div>

				<div class = "simpleFlexItem">${job.num_applicants} Applicants</div>

			</div>
			<div class = "spareDiv"></div>
			<div class = "text-center viewApplicantHolder">
				<div class = "simpleButton">View All Applicants</div>
			</div>
	`

var newdiv = document.createElement('div');
newdiv.onclick = () => {loadEachJob(job)}
newdiv.className = "jobMainInfo";
newdiv.innerHTML = divContent;
return newdiv;

}

