function createPersonalHeader(data){

	var stringifiedData = JSON.stringify(data);

	return`
		${
			createProfileSubHeader('Personal', profileOwnershipRequired = true, 'Edit', "displayEditPersonalForm("+stringifiedData+")" )
		}
	`;
}

function displayPersonal(personal){
	return `
		
		${
			displayProfileHeader(VIEWING_PROFILE_OF)
		}

		<div>

			${ createPersonalHeader(personal) }
			<div class = "mt-3">
				<table class = "attractive-table w-100">
					<tr>
						<td> Name </td>
						<td>${personal.name}</td>
					</tr>
					<tr>
						<td> Summary </td>
						<td> ${personal.Summary} </td>
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
						<td> Portfolio </td>
						<td> ${personal.portfolio} </td>
					</tr>
				</table>
			</div>
		</div>
		<hr>
	`
}

