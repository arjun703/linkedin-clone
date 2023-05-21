
function createExperienceOptions(experience){


return`
	<div class = "editDeleteOptions">
		<table class = 'simpleTable'>
			<tr>
				<th onclick = 'displayEditExperienceForm(${JSON.stringify(experience)})' > 
					${ createPrimaryButton('Edit') } 
				</th>
				<th onclick = 'deleteExperience(${experience.id})' > 
					${ deleteButton() } 
				</th>
			</tr>
		</table>
	</div>
`

}


function displayEachExperience(experience){

return `
	<div class = "editDeleteOptionsHolder" >
		<div class = "fontSize20"> ${experience.position}</div>
		<div class = "fontSize17"> ${experience.company}</div>
		<div>${experience.task_description}</div>
		<div> ${experience.from} to ${experience.to} </div>
		
		${ (VIEWING_PROFILE_OF == LOGIN_NAME)
			? createExperienceOptions(experience)
			: ''
		}

	</div>
`

}


function displayExperiences(experiences){

var experiencesHolder = ``;

if(experiences.length > 0){
	for(var i = 0; i < experiences.length; i++){
		experiencesHolder += displayEachExperience(experiences[i])
	}
}
else{
	experiencesHolder = '<div> No experiences to show. </div>';
}


return `
	
	${ createProfileSubHeader('Experiences', profileOwnershipRequired = true,  "Add New", "displayAddNewExperienceForm()") }
	<div class = "gridHolderModified">
		${experiencesHolder}
	</div>
	<hr>

`

}

