function promptToActivate(){
return `

<div class = "text-danger text-center" style = 'font-weight:bold' >

	You can't post the jobs unless you verify the email of company and activate the page.
	<br>
	<button onclick = "activateCompanyPage()"
			class = " mt-2 btn btn-primary">
		Activate Now
	</button>

</div>


`

}


function createCompanySubHeader(activeTab, callback1, callback2){
		var top = returnTopOfMiddleMainContent();


	return `
	<div  class = "stickyLeftOrRight mt-4 mb-4  center-div text-center" style = "top: ${top}; z-index:2; max-width:400px; width:100%; margin: 0 auto; ">
		<div  class = "savedJobsSubHdrHolder">
			<table class = "savedJobsSubHdr">
				<tr>
					<td  onclick = "${callback1}" class = "${ (activeTab === 'about') ? 'activeSavedJobsSubHdr' : '' }  " >
						About Company
					</td>
					<td onclick = "${callback2}" class = ${ (activeTab === 'jobs' ) ? 'activeSavedJobsSubHdr' : '' } >
						Jobs Posted
					</td>
				</tr>
			</table>
		</div>
	</div>

	`
}



function editCompanyPageForm(data){

const form = `

	<div>
		<form id = "editCompanyForm" method = "POST">
			<div class = "gridHolder">
				${createTextInput('Name', 'companyName', data.company_name)}
				${createTextInput('Location', 'companyLocation', data.company_location)}
				${createTextInput('Phone', 'companyPhone', data.contact_number)}
			</div>
			<div class = "mt-2">
				${createTextarea('About ', 'companyAbout', data.company_about)}
			</div>
		</form>
	</div>
	
`

displayPrompt('Edit Company Info', 
					form,
					 `handleEditCompanySubmit(${data.id})`
			);



}

function handleEditCompanySubmit(companyId){

	var formData = new FormData(document.getElementById('editCompanyForm'));	
	var xmlhttp = new XMLHttpRequest();
	var personalHolder = document.getElementById('editCompanyForm');
	personalHolder.classList.add('fadeOutAnimation');

	const serverURL = siteName + '/php/companyPage/edit.php';

	xmlhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			
			var data = JSON.parse(this.responseText);
			console.log(data);
			personalHolder.classList.remove('fadeOutAnimation');
			if(data.error){
				alert('Error - ' + data.error);
			}
			else{
				hideOverlay();
				loadCompanyPage(companyId);
			}
		}
	}
	
	xmlhttp.open('POST', serverURL);
	xmlhttp.send(formData);

}


function companyPageHeader(data, activeTab = 'about'){



return `
	

	${
		createCompanySubHeader(activeTab, 'loadCompanyPage('+data.id+')', 'loadCompanyJobs('+data.id+')')
	}

	<hr>

	${ IS_LOGGED_IN
		? LOGIN_NAME == data.creator 
			?  data.active_status == 0
				? promptToActivate() 
				: '' 
			: ''
		: '' 
	}

 `
}

function createCompanyView(data){



var header = companyPageHeader(data);


return `

	${header}


	${ IS_LOGGED_IN
		? data.creator == LOGIN_NAME
			? createProfileSubHeader(data.company_name, profileOwnershipRequired = false, btnText = 'Edit', callback = 'editCompanyPageForm('+JSON.stringify(data)+')')   
			: '<div class = "mt-3"><h4>'+ data.company_name + '</h4></div>'
 		: '<div class = "mt-3"><h4>'+ data.company_name + '</h4></div>'

 	}

	<div>
		
		<div> <strong> Location: </strong> ${data.company_location} </div>
		<div> <strong> Website: </strong> ${data.company_website} </div>		
		<div> <strong> Email: </strong> ${data.company_email} </div>
		<div> <strong> Phone: </strong> ${data.contact_number} </div>
		<div> <strong> Category: </strong> ${data.category} </div>
		<div class = "mt-3"> <strong> Description</strong> <div> ${data.company_about} </div> </div>
	
	</div>

`


}

const displayCompanyPage =  (data, divIdd = '') => {

	var divIdd = document.getElementById(divIdd);

	divIdd.innerHTML = createCompanyView(data);
	
}


function loadCompanyPage(companyId){

	var divId = siteName + '/companyPage/'+companyId;
	
	var hdrTable = createHomeHdr(activeTab = 'ddd');
	
	var serverURL = siteName + '/php/companyPage/view.php?id='+companyId;

	loadTab(divId, serverURL, displayCompanyPage, hdrTable);

}


function loadCompanyJobs(companyId){
	

	var divId = siteName + '/companyPage/'+companyId+'/jobs';
	
	var hdrTable = createHomeHdr(activeTab = 'ddd');
	
	var serverURL = siteName + '/php/companyPage/jobs.php?id='+companyId;

	loadTab(divId, serverURL, displayCompanyJobs, hdrTable);


}



const displayCompanyJobs = (data, divId) => {

	let div = document.getElementById(divId);

	div.innerHTML =  companyPageHeader(data, 'jobs');

	display(data.jobs, div, callback = returnEachJob, divId); // library.js


}