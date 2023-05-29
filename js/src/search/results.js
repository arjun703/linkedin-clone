function loadSearchResults(){

	var job = getCookieValue('position').replace(/\s/g, "+")
	var loc = getCookieValue('location').replace(/\s/g, "+")

	var divId = siteName + '/search?j='+job+'&l='+loc;
	
	var hdrTable = createGeneralHdr(getCookieValue('position'));
	
	var serverURL = `php/search/results.php`;

	loadTab(divId, serverURL, displaySearchResults, hdrTable);


}

function createSearchFilter(){

window.filterChanged = false

return `
<div>
	<table class= "w-100">
		<tr>
			<th>Type</th>
			<th>Site</th>
			<th></th>
		</tr>
		<tr id = "filterHolder">
			<td>	
				<div class = "mt-1">
					<input  type = "checkbox" id = "jt_1" onchange = "handle(event, 'fu')">
					<label class = "ml5" for = "jt_1">Full Time</label>
				</div>
				<div class = "mt-1">
					<input onchange = "handle(event,'pa')"  type = "checkbox" id = "jt_2">
					<label class = "ml5" for = "jt_2">Part Time</label>
				</div>
				<div  class ="mt-1" >
					<input onchange = "handle(event, 'in')" type = "checkbox" id = "jt_3">
					<label  class = "ml5" for = "jt_3">Internship</label>
				</div>
				<div class = "mt-1" >
					<input onchange = "handle(event, 'co')" type = "checkbox" id = "jt_4">
					<label class="ml5" for = "jt_4" >Contract</label>
				</div>
			</td>
			<td>
				<div>
					<input  onchange = "handle(event, 'on')"  type = "checkbox" id = "js_1">
					<label class="ml5" for = "js_1">On-Site</label>
				</div>
				<div class = "mt-1">
					<input  onchange = "handle(event, 're')"  type = "checkbox" id = "js_2">
					<label class="ml5" for = "js_2">Remote</label>
				</div>
				<div class = "mt-1">
					<input  onchange = "handle(event, 'hy')"  type = "checkbox" id = "js_3">
					<label class="ml5" for = "js_3">Hybrid</label>
				</div>
			</td>
			<td class = "softLink" onclick = "resetFilters()">
				Reset
			</td>
		</tr>
	</table>
</div>

`


}

function handle(event, value){

	window.filterChanged = true;

	if(event.target.checked){
		document.cookie =event.target.id+"="+value;
	}
	else{
		document.cookie = event.target.id+'=;expires=Thu, 01 Jan 1970 00:00:00 UTC;';
	}
}	

function resetFilters(){

	var filterHolder = document.getElementById('filterHolder');

	var inputs = filterHolder.querySelectorAll('input');

	for(var i =0 ; i < inputs.length; i++ ){
		document.cookie = inputs[i].id+'=;expires=Thu, 01 Jan 1970 00:00:00 UTC;';
	}	
	checkTheCheckboxStatus();

}

function checkTheCheckboxStatus(){

	var filterHolder = document.getElementById('filterHolder');

	var inputs = filterHolder.querySelectorAll('input');

	for(var i =0 ; i < inputs.length; i++ ){
		if(getCookieValue(inputs[i].id) != "" ) inputs[i].checked = true
		else inputs[i].checked=false
	}	

}

function displayFilterPrompt(){
	displayPrompt('Edit Filters', createSearchFilter(), 'checkFilters()');

	checkTheCheckboxStatus();

}

const displaySearchResults = (searchResults, divIdd) =>{

const div = document.getElementById(divIdd);

div.className = "mt-3";

const searchResultSubHeader = createProfileSubHeader('Results', 
			profileOwnershipRequired = false , 
			btnText = 'Add Filters', 
			callback = 'displayFilterPrompt()');


const searchResultSubHeaderHolder = document.createElement('div');

searchResultSubHeaderHolder.innerHTML = searchResultSubHeader+`<hr>`;

div.appendChild(searchResultSubHeaderHolder);

const searchResultJobsHolder = document.createElement('div');

div.appendChild(searchResultJobsHolder);

display(searchResults, searchResultJobsHolder, callback = returnEachJob);


}



function refreshFilters(){


const str = document.location.toString();
const search = 'search';

const includesSearch = str.includes(search);

	if (includesSearch) 	loadSearchResults();
	else loadHome()


}


function checkFilters(){
	if(filterChanged){
		refreshFilters();
		hideOverlay();
	}

}