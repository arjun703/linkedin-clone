function createEducationOptions(education){
return`
<div class = "spareDiv2">
	</div>
	<div class = "editDeleteOptions ">
		<table class = "simpleTable">
			<tr>
				<th onclick = 'displayEditEducationForm(${JSON.stringify(education)})'' > 
					${ createPrimaryButton('Edit') } 
				</th>
				<th onclick = "deleteEducation(${education.id})" > 
					${ deleteButton() } 
				</th>
			</tr>
		</table>
	</div> 
`
}

const displayEachEducation = (education) => {
  
	education.divId  = `education_${education.login_name}_${education.id}`

  return `
       <div class="fontSize20">${education.level}</div>

      <div  style="font-weight:bold" class = "fontSize17">
      	${ education.field !== undefined
      		? education.field
      		: '---------'
      	}
      </div>
      <div class="fontSize17">${education.institution}</div>
      <div>${education._from} to ${education._to}</div>
      
      ${ IS_LOGGED_IN
      	?  (VIEWING_PROFILE_OF == LOGIN_NAME)
		        ? createEducationOptions(education)
		        : ''
		: ''
      }
  `;
}


function displayEducations(educations){

var educationsHolder = ``;

if(educations.length > 0){
	for(var i = 0; i < educations.length; i++){
		var id  = `education_${educations[i].login_name}_${educations[i].id}`
		educationsHolder += `<div class =  "jobMainInfoClone" id = '${id}' >` 
							+  displayEachEducation(educations[i])
							+ `</div>`	
	}
}


return `
	${ createProfileSubHeader('Education', profileOwnershipRequired = true,  "Add New", "displayAddNewEducationForm()") }
	
	<div class = "gridHolderModified mt-3" id= "educations_${VIEWING_PROFILE_OF}">
		${educationsHolder}
	</div>
	
`

}