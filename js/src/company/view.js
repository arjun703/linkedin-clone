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



function createCompanyView(data){

console.log(data);

return `

	<div class = 'mt-3 text-center'>
		<h4> ${data.company_name}</h4>
	</div>

	<hr>

	${ LOGIN_NAME == data.creator 
		?  data.active_status == 0
			? promptToActivate() 
			: '' 
		: '' 
	}

	<div>
		<table class = "mt-3 attractive-table w-100">
			<tr>
				<td> Email </td>
				<td>${data.company_email}</td>
			</tr>
			<tr>
				<td> Contact Number </td>
				<td> ${data.contact_number} </td>
			</tr>
			<tr>
				<td> Location </td>
				<td> ${data.company_location} </td>
			</tr>
			<tr>
				<td> Category </td>
				<td> ${data.category} </td>
			</tr>
			<tr>
				<td> About </td>
				<td> ${data.company_about} </td>
			</tr>
		</table>
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
	
	var serverURL = apiFolder + '/companyPage/view.php?id='+companyId;

	loadTab(divId, serverURL, displayCompanyPage, hdrTable);

}
