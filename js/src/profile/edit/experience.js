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
	
	var value  =  !isNaN(new Date(value).getTime()) ? value : ''; 

	return createInput(type = 'date', label, name, value, disabled, id, onchangeCallback)

}


function createExperienceForm(experienceId = '', position = '', company = '', taskDescription = '', from = '', to = '', currentlyWorkingHere = false){

return `
	<div>
		<form id = "experienceForm" method = "POST">

			<input type = "hidden" name = "id" value = "${experienceId}">


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
		taskDescription = experience.description,
		from = experience._from,
		to = experience._to,
		currentlyWorkingHere = experience._to == 'Present' ? true : false
	)
}


function createAddNewExperienceForm(){
	return createExperienceForm()
}



function displayEditExperienceForm(experience){

	displayPrompt('Edit Experience', createEditExperienceForm(experience), `handleEditExperienceSubmit('${experience.divId}')`);

}

function displayAddNewExperienceForm(){
	displayPrompt('Add New Experience', createAddNewExperienceForm(), 'handleAddNewExperienceSubmit()' );
}



function handleEdits(formId, divId, callback, serverURL){
	var formData = new FormData(document.getElementById(formId));	
	var xmlhttp = new XMLHttpRequest();
	var personalHolder = document.getElementById(divId);
	personalHolder.classList.add('fadeOutAnimation');
	xmlhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var data = JSON.parse(this.responseText);
			personalHolder.classList.remove('fadeOutAnimation');
			if(data.error){
				alert('Error - ' + data.error);
			}
			else{
				personalHolder.innerHTML = callback(data);
			}
		}
	}
	
	xmlhttp.open('POST', serverURL);
	xmlhttp.send(formData);
	hideOverlay();
}



function handleAddNew(formId, divId, callback, serverURL, preId){

	var formData = new FormData(document.getElementById(formId));
	var overlayFooterAction = document.getElementById('overlayFooterAction');
	overlayFooterAction.classList.add('fadeOutAnimation');
	var xmlhttp = new XMLHttpRequest();
	var contentHolder = document.getElementById(divId);
	xmlhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var data = JSON.parse(this.responseText);
			if(data.error){
				alert('Error - ' + data.error);
				overlayFooterAction.classList.remove('fadeOutAnimation');
			}
			else{
				hideOverlay();
				let newDiv = document.createElement('div');
				newDiv.className = "jobMainInfoClone";
				newDiv.id = preId + '_'+ data.login_name +'_'+ data.id;
				newDiv.classList.add("scaleUpAnimation");
				newDiv.innerHTML = callback(data);
				contentHolder.appendChild(newDiv);
				setTimeout(() => {newDiv.classList.remove('scaleUpAnimation')}, 1000);

			}
		}
	}
	
	xmlhttp.open('POST', serverURL);
	xmlhttp.send(formData);
}


function handleAddNewExperienceSubmit(){
	handleAddNew('experienceForm', 
					'experiences_'+LOGIN_NAME, 
					displayEachExperience,
					siteName+'/php/profile/create/experience.php',
					'experience'
	)
}



function handleEditExperienceSubmit(divId){

	handleEdits('experienceForm', 
					divId, 
					displayEachExperience,
					siteName+'/php/profile/edit/experience.php'
	)

}


function handleExperienceFormCbChange(){

	// find the status of the checkbox

	if(document.getElementById('experienceFormCb').checked) document.getElementById('experienceFormTo_holder').style.display = "none" 
	else {document.getElementById('experienceFormTo').disabled = false; document.getElementById('experienceFormTo_holder').style.display = "block"}

}

function handleExperienceFormToChange(){
	document.getElementById('experienceFormCb_holder').style.display = "none";
}