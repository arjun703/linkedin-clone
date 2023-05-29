
function createEditPersonalForm(data){

return `
	<div>
		<form id = "editPersonalForm" method = "POST">
			<div class = "gridHolderModified2">
				${createTextInput('Name', 'editPersonalName', data.name)}
				${createTextInput('Email', 'editPersonalEmail', data.email)}
				${createTextInput('Phone', 'editPersonalPhone', data.phone)}
				${createTextInput('Website', 'editPersonalWebsite', data.website)}
			</div>
			<div class = "mt-2">
				<label for = "editPersonalSummary">
					Summary <small> (Not more than 3 lines) </small>
				</label>
				<textarea w-100 id = "editPersonalSummary" name = "editPersonalSummary">${data.summary}</textarea>
			</div>
		</form>
	</div>

`

}


function displayEditPersonalForm(data){

	displayPrompt( 
			'Edit Personal Info', 
			createEditPersonalForm(data), 
			`handleEditPersonalSubmit('${data.divId}')`
			);

}



function handleEditPersonalSubmit(divId){
	


	handleEdits('editPersonalForm', 
					divId, 
					displayPersonal,
					siteName+'/php/profile/edit/personal.php'
	);

}