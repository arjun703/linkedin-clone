function createTextarea(label, name, value){
	return`
		<div class = "mt-2">
			<label>
				${label}
			</label>
			<textarea class = 'w-100' name = "${name}">${value}</textarea>
		</div>
	`
}

function createInput(type, label, name, value, disabled = false, id = '', onchangeCallback = ''){
	return`
		<div id = "${id}_holder" >
			<label>
				${label}
			</label>
			<input type="${type}"  name="${name}" value="${value}" 
				 id = "${id}" ${disabled ? 'disabled' : '' } onchange = "${onchangeCallback}">
		</div>
	`
}

function createTextInput(label, name,  value){
	return createInput(type = 'text', label, name, value)
}

function createCheckbox(label, id, name, checkedStatus = false, onchangeCallback = ''){

return`
	<div id = "${id}_holder">
		<label for = "${id}">${label}</label>
		<input style  ="font-size:20px" onchange = "${onchangeCallback}" type = "checkbox" id ="${id}" name = "${name}"  ${checkedStatus ? 'checked' : '' }>
	</div>
`	
}

function createDateInput(label,  name, value, disabled = false, id = '', onchangeCallback = '' ){
	
	return createInput(type = 'date', label, name, value, disabled, id, onchangeCallback)

}


function createExperienceForm(experienceId = '', position = '', company = '', taskDescription = '', from = '', to = '', currentlyWorkingHere = false){

return `
	<div>
		<form id = "experienceForm" method = "POST">

			<input type = "hidden" name = "experienceId" value = "${experienceId}">


			<div class = "gridHolderModified2">
				${createTextInput('Position', 'experienceFormPosition' , position) }
				${createTextInput('Company', 'experienceFormCompany', company)}
			</div>
			
			${createTextarea('Task Description (optional) ', 'experienceFormTaskDescription', taskDescription )}
			
			<div class = "gridHolderModified2">
				${createDateInput('From', 'experienceFormFrom', from)}
				
				${createCheckbox('Currently Working Here',  
								 'experienceFormCb',
								 'experienceFormCb',
								  checkedStatus = currentlyWorkingHere,
								  onchangeCallback = "handleExperienceFormCbChange()" 
								  )
				}
				
				${createDateInput( 'To', 
									'experienceFormTo', 
									to, 
									disabled = currentlyWorkingHere,
									'experienceFormTo',
									onchangeCallback = 'handleExperienceFormToChange()'
								)
				}
			
			</div>

		</form>
	</div>
`

}


function createEditExperienceForm(experience){
   
return createExperienceForm(
		experienceId = experience.id,
		position = experience.position,
		company = experience.company,
		taskDescription = experience.task_description,
		from = experience.from,
		to = experience.to == 'Present' ? '' : experience.to ,
		currentlyWorkingHere = experience.to == 'Present' ? true : false
	)
}


function createAddNewExperienceForm(){
	return createExperienceForm()
}



function displayEditExperienceForm(experience){

	displayPrompt('Edit Experience', createEditExperienceForm(experience), 'handleEditExperienceSubmit()');

}

function displayAddNewExperienceForm(){
	displayPrompt('Add New Experience', createAddNewExperienceForm(), 'handleAddNewExperienceSubmit()' );
}



function handleEditExperienceSubmit(){


}


function handleExperienceFormCbChange(){

	// find the status of the checkbox

	if(document.getElementById('experienceFormCb').checked) document.getElementById('experienceFormTo_holder').style.display = "none" 
	else {document.getElementById('experienceFormTo').disabled = false; document.getElementById('experienceFormTo_holder').style.display = "block"}

}

function handleExperienceFormToChange(){
	document.getElementById('experienceFormCb_holder').style.display = "none";
}