function createEducationForm(educationId = '', level = '', field = '', institution = '', from = '', to = ''){

return `
	<div>
		<form id = "educationForm" method = "POST">

			<input type = "hidden" name = "educationId" value = "${educationId}">


			<div class = "gridHolderModified2">

				<div>
					<label>Level</label>
					<select name = "educationFormLevel">
						<option value = 'Intermediate' ${level == 'Intermediate' ? 'selected' : '' } >Intermediate</option>
						<option value = 'Bachelor' ${level == 'Bachelor' ? 'selected' : '' } >Bachelor</option>
						<option value = 'Master' ${level == 'Master' ? 'selected' : '' }>Master</option>
						<option value = 'PhD' ${level == 'PhD' ? 'selected' : '' }>PhD</option>
					</select>
				</div>

				${createTextInput('Field', 'educationFormField' , field) }
				${createTextInput('Institution', 'educationFormInstitution', institution)}
				${createDateInput('From', 'educationFormFrom', from)}
				${createDateInput('To', 'educationFormTo', from)}

			</div>
			
			
			

		</form>
	</div>
`

}


function createEditEducationForm(education){
   
return createEducationForm(
		educationId = education.id,
		level = education.level,
		field = education.field,
		institution = education.institution,
		from = education._from,
		to = education._to
	)
}


function createAddNewEducationForm(){
	return createEducationForm()
}



function displayEditEducationForm(education){

	displayPrompt('Edit Education', createEditEducationForm(education), `handleEditEducationSubmit('${education.divId}')`);
}

function displayAddNewEducationForm(){
	displayPrompt('Add New education', createAddNewEducationForm(), 'handleAddNewEducationSubmit()' );
}



function handleEditEducationSubmit(divId){

	handleEdits('educationForm', 
					divId, 
					displayEachEducation,
					siteName+'/php/profile/edit/education.php'
	)

}


function handleAddNewEducationSubmit(){
	handleAddNew('educationForm', 
					'educations_'+LOGIN_NAME, 
					displayEachEducation,
					siteName+'/php/profile/create/education.php',
					'education'
	)
}
