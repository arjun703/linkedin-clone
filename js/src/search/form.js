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

	var jobHolder = document.createElement('div');
	var textField = document.createElement('input');
	textField.placeholder = "Search job";
	textField.id = "searchBoxPositionInput";
	textField.className = "form-control";
	textField.onkeyup = (e) => { loadJobSuggestions(e.target.value); }
	jobHolder.appendChild(textField);

	var locationHolder = document.createElement('div');

	var textField = document.createElement('input');
	textField.id = "searchBoxLocationInput";
	textField.placeholder = "Location";
	textField.onkeyup = (e) => { loadLocationSuggestions(e.target.value); }
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

const handleSuggestionClicksInSearchBox = () => {
	const pos = document.getElementById('searchBoxPositionInput').value.trim();
	const loc = document.getElementById('searchBoxLocationInput').value.trim();
	
	if(pos != ''){
		document.cookie = 'position='+pos;
	}

	if(pos != '' && loc == '' ){
		document.getElementById('searchBoxLocationInput').focus();
		displaySearchBox();
	}
	
	if(loc != ''){
		document.cookie = 'location='+loc;
	}

	if(loc != '' && pos == ''){
		document.getElementById('searchBoxPositionInput').focus();
		displaySearchBox();			
	}
	

	if(pos.length > 2 && loc.length > 2 ){
		loadSearchResults();
	}

}


function createLoadingSign(id = ''){
	return `
			<div id = "${id}" class = "loadingSignHolder animationNone">
				<i class = 'loadingSign fa fa-spinner fa-spin'></i>
			</div>
		`;
}

function loadJobSuggestions(job){
	let divId = siteName + '/searchBox';
	if(job.trim().length > 2 ){
		document.getElementById(divId).innerHTML = createLoadingSign();

		fetch(`php/search/autocomplete.php?query=${job}&task=position`)
		.then(response => response.json())
		.then(data => {
			if( data.length == 0 ){
				document.getElementById(divId).innerHTML = "<div class = 'h4 text-center'>No Suggestions</h4>"
			}
			else{
				document.getElementById(divId).innerHTML  = `
					<div class = "listHolder">
				` + returnList('searchBoxPositionInput', data, handleSuggestionClicksInSearchBox) + '</div>';
			}
		})
	}
	else{
		document.getElementById(divId).innerHTML = defaultContentForSearchBox();
	}
}


function loadLocationSuggestions(location){
		let divId = siteName + '/searchBox';
	if(location.trim().length > 2 ){
		document.getElementById(divId).innerHTML = `
			<div class = "loadingSignHolder animationNone">
				<i class = 'loadingSign fa fa-spinner fa-spin'></i>
			</div>
		`
		fetch(`php/search/autocomplete.php?query=${location}&task=location`)
		.then(response => response.json())
		.then(data => {
			if( data.length == 0 ){
				document.getElementById(divId).innerHTML = "<div class = 'h4 text-center'>No Suggestions</h4>"
			}
			else{
				document.getElementById(divId).innerHTML  = `
					<div class = "listHolder">
				` + returnList('searchBoxLocationInput', data, handleSuggestionClicksInSearchBox) + '</div>';
			}
		})
	}
	else{
		document.getElementById(divId).innerHTML = defaultContentForSearchBox();
	}
}


function loadSearchBox(){
	
	var divId = siteName + '/searchBox';
	
	var hdrTable = createSearchBoxHdr();
	
	execFrontendOnlyFunction(divId, hdrTable, displaySearchBox);
	
}

function notLoggedInDefaultContent(){
	return`
		<div class = "text-center">
			<img class = "emptyContentImage" src = "files/tired.jpg">
		</div>
		<div class = "text-center mt-3" >
			<h4>Tired of Typing ? </h4>
			<div> 
				<span class = "softLink" onclick = "loadLoginForm()">Login</span> to access recent searches
			</div>
		</div>
	`
}


function loggedInDefaultContent(){
	return`
		<div>

		</div>

	`
}

function defaultContentForSearchBox(){
	return `

		<div class = "animationNone">
			
			${ IS_LOGGED_IN 
				? loggedInDefaultContent()
				: notLoggedInDefaultContent()	
			 }

		</div>

	`
}


const displaySearchBox =  () => {

	var divId = siteName + '/searchBox';

	document.getElementById(divId).innerHTML = defaultContentForSearchBox();


}