
function createAddSkillForm(){
return`
	<form>
		<input class = "border-round" placeholder = "Add New Skill" class = "w-100" onkeyup = "alert(1)" type = "text" name = "profileNewSkill" id = "profileNewSkill">
	</form>
`

}

function createDeleteSkillIcon(id){
	return`
		<span  style = "padding-left:5px; padding-right:5px; cursor:pointer " onclick = "deleteSkill(${id})">
			<i class = "fa fa-close"></i>
		</span>
	`
}

function displayEachSkill(skill){

	return `
		<div class = "flex-item">
			<span> ${skill.skill} </span>
			${ (VIEWING_PROFILE_OF == LOGIN_NAME) 
				? createDeleteSkillIcon(skill.id) 
				: ''
			}
		</div>
	`

}


function displaySkills(skills){

var skillsHolder = ``;

if(skills.length > 0){
	for (var i =0; i <skills.length; i++){
		skillsHolder += displayEachSkill(skills[i]);

	}
}
else{
	skillsHolder += '<div class = "h6"> No skills to show </div> ';
}

return `
	<div>
		<table class = "fixedTable">
			<tr>
				<td class = "h4"> Skills </td>
				<td>
					${ ( VIEWING_PROFILE_OF == LOGIN_NAME ) 
						? createAddSkillForm() 
						: ''
					}
				</td>
			</tr>
		</table>
	</div>


	<div class = "mt-3 flex-container">
		${skillsHolder}
	</div>
	

	<hr>

`

}
