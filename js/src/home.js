const displayHome =  (jobs, divIdd = '') => {
	
	var displayInThisDiv = document.getElementById(siteName + '/');

	display(jobs, displayInThisDiv, callback = returnEachJob); // library.js

}


function loadHome(){

	var divId = siteName + '/';
	
	var hdrTable = createHomeHdr(activeTab = 'home');

	clearHdrAndPut(hdrTable);

	locationToHdrMapper[divId] = hdrTable; 
	
	var serverURL = apiFolder + '/home.php';

	loadTab(divId, serverURL, displayHome, pushOrReplace = 'replace');

}

const returnEachJob =  (job) => {


	var newDiv = document.createElement("div");
	newDiv.className = "jobMainInfo";


	var positionHolder = document.createElement('div');
	positionHolder.innerText = job.position;
	positionHolder.className = "fontSize20";


	var companyHolder = document.createElement('div');
	companyHolder.className = "fontSize17";
	companyHolder.innerText = job.company;

	var viewsHolder = document.createElement('div');
	viewsHolder.innerText = "250 Views";

	var noOfApplicantsHolder = document.createElement('div');
	noOfApplicantsHolder.innerText = "25 Applicants"

	var viewApplicantsLink = document.createElement('div');
	viewApplicantsLink.className = "softLink"
	viewApplicantsLink.innerText = "View all Applicants"
	viewApplicantsLink.style.fontWeight = "bold";

	newDiv.appendChild(positionHolder);
	newDiv.appendChild(companyHolder);
	newDiv.appendChild(viewsHolder);
	newDiv.appendChild(noOfApplicantsHolder);
	newDiv.appendChild(viewApplicantsLink);


	return newDiv;

}

