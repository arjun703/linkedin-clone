
function createExperienceOptions(experience){

return`
<div class = "spareDiv2">
</div>
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


const displayEachExperience = (experience) => {


if(experience.currently_working_here == 1 ) experience._to = 'Present'

		experience.divId  = `experience_${experience.login_name}_${experience.id}`

return `
		<div class = "fontSize20"> ${experience.position}</div>
		<div class = "fontSize17"> ${experience.company}</div>
		<div>${experience.description}</div>
		<div> ${experience._from} to ${experience._to} </div>
		
		${ IS_LOGGED_IN
			? (VIEWING_PROFILE_OF == LOGIN_NAME)
				? createExperienceOptions(experience)
				: ''
			: ''
		}
`

}


function displayExperiences(experiences){

var experiencesHolder = ``;

if(experiences.length > 0){
	for(var i = 0; i < experiences.length; i++){
		var id  = `experience_${experiences[i].login_name}_${experiences[i].id}`

		experiencesHolder += `<div id = '${id}' class = "jobMainInfoClone" >` 
								+  displayEachExperience(experiences[i])	
							+ `</div>`	
	}	
}


return `
	
	${ createProfileSubHeader('Experiences', profileOwnershipRequired = true,  "Add New", "displayAddNewExperienceForm()") }
	<div class = "gridHolderModified mt-3" id= "experiences_${VIEWING_PROFILE_OF}">
		${experiencesHolder}
	</div>
	<hr>

`

}

