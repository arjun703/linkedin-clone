function loadJobsByCategory(category){
	var divId = siteName + '/jobs/category/'+category;
	
	var hdrTable = createGeneralHdr('Jobs by Category - '+category);
	
	var serverURL = siteName + '/php/jobs/category.php?category='+category;

	loadTab(divId, serverURL, displayJobsByCategory, hdrTable);

}

const displayJobsByCategory = (jobs, divId) => {

	var displayInThisDiv = document.getElementById(divId);
	
	display(jobs, displayInThisDiv, callback = returnEachJob, divId); // library.js


}