function createPersonalHeader(data){

	data.divId = 'personal_' + data.login_name;
	var stringifiedData = JSON.stringify(data);

	return`
		${
			createProfileSubHeader('Personal', profileOwnershipRequired = true, 'Edit', "displayEditPersonalForm("+stringifiedData+")")
		}
	`;
}




const displayPersonal = (personal) => {
	return `
		
		<div>

			${ createPersonalHeader(personal) }
			
			<div class = "" id = "personal_${personal.login_name}">
				<div class = "mt-3">
					<table class = "attractive-table w-100">
						<tr>
							<td> Name </td>
							<td>${personal.name}</td>
						</tr>
						<tr>
							<td> Summary </td>
							<td> ${personal.summary} </td>
						</tr>
						<tr>
							<td> Email </td>
							<td> ${personal.email} </td>
						</tr>
						<tr>
							<td> Phone </td>
							<td> ${personal.phone} </td>
						</tr>
						<tr>
							<td> Website </td>
							<td> ${personal.website} </td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<hr>
	`
}