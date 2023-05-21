function createEducationOptions(education){
return`
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

function displayEachEducation(education){
  return `
    <div class="editDeleteOptionsHolder bb">
       <div style="font-weight:bold" class="fontSize17">${education.level}</div>

      <div class="fontSize20">
      	${ education.field !== undefined
      		? education.field
      		: '---------'
      	}
      </div>
      <div class="fontSize17">${education.institution}</div>
      <div>${education.from} to ${education.to}</div>
      
      ${ (VIEWING_PROFILE_OF == LOGIN_NAME)
        ? createEducationOptions(education)
        : ''
      }
    </div>
  `;
}


function displayEducations(educations){

var educationsHolder = ``;

if(educations.length > 0){
	for(var i = 0; i < educations.length; i++){
		educationsHolder += displayEachEducation(educations[i])
	}
}
else{
	educationsHolder += '<div class = "h6" > No education info to show. </div>'
}


return `
	${ createProfileSubHeader('Education', profileOwnershipRequired = true,  "Add New", "displayAddNewEducationForm()") }
	
	<div class = "gridHolderModified">
		${educationsHolder}
	</div>
	
`

}