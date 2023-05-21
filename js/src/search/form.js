function createBackButton(){
	var backBtnHolder = document.createElement('td');
	backBtnHolder.className = "text-center"
	var backBtn = document.createElement('button');
	backBtn.className = "btn btn-primary";
	backBtn.innerHTML = "<i class = 'fas fa-arrow-left'></i>";
	backBtnHolder.appendChild(backBtn);
	backBtnHolder.onclick = () => history.back();

	return backBtnHolder
}



function createSearchBoxHdr(){

	var newTable = document.createElement('table');
	newTable.className = "generalHdrTable";

	var newRow = document.createElement('tr');

	var backBtnHolder = createBackButton();

	var jobAndLocationHolder = document.createElement('td');



	var newDiv = document.createElement('div');
	newDiv.className = "gridHolder";
	newDiv.style.gap = "5px";
	manageGrid(newDiv);

	var jobHolder = document.createElement('div');
	var textField = document.createElement('input');
	textField.placeholder = "Search job";
	textField.className = "form-control";
	jobHolder.appendChild(textField);

	var locationHolder = document.createElement('div');
	var textField = document.createElement('input');
	textField.placeholder = "Location";
	textField.className = "form-control";
	locationHolder.appendChild(textField);

	newDiv.appendChild(jobHolder);
	newDiv.appendChild(locationHolder);

	jobAndLocationHolder.appendChild(newDiv);

	newRow.appendChild(backBtnHolder);
	newRow.appendChild(jobAndLocationHolder);

	newTable.appendChild(newRow);

	return newTable;


}



function loadSearchBox(){
	
	var divId = siteName + '/searchBox';
	
	var hdrTable = createSearchBoxHdr();
	

	
	execFrontendOnlyFunction(divId, hdrTable, displaySearchBox);
	
}

const displaySearchBox =  () => {
	var divId = siteName + '/searchBox';
}