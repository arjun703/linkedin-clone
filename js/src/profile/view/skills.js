
function createAddSkillForm(){
return`
	<form method="POST" action = "" onsubmit = "return false">
		<input style = "border-radius:15px;text-align:center"
		  placeholder = "Add New Skill" 
		  class = "w-100" 
		  onkeyup = "handleSkillInput(event)" 
		  type = "text" 
		  name = "profileNewSkill"
		   id = "profileNewSkill">
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
			${ IS_LOGGED_IN
				? (VIEWING_PROFILE_OF == LOGIN_NAME) 
					? createDeleteSkillIcon(skill.id) 
					: ''
				: ''
			}
		</div>
	`

}


function displaySkills(skills){

var skillsHolder = ``;

if(skills.length > 0){
	for (var i =0; i <skills.length; i++){
		skillsHolder += `<div id ='skill_${skills[i].id}'>  ${displayEachSkill(skills[i])} </div>`;
	}
}

return `
	<div>
		<table class = "fixedTable">
			<tr>
				<td class = "h4"> Skills </td>
				<td>
					${ IS_LOGGED_IN
						?   ( VIEWING_PROFILE_OF == LOGIN_NAME ) 
							? createAddSkillForm() 
							: ''
						: ''
					}
				</td>
			</tr>
		</table>
	</div>


	<div class = "mt-3 flex-container " id = 'skills_${VIEWING_PROFILE_OF}'>
		${skillsHolder}
	</div>
	

	<hr>

`

}




function handleSkillInput(e){
	var skill = e.target.value.trim();
	if(skill.length>2&&event.keyCode === 13){
		e.target.value = '';
		fetch(siteName+'/php/profile/create/skill.php?skill='+skill)
		.then(response => response.json())
		.then(data => {
			if(data.error){
				alert(data.error);
			}
			else{
				var newDiv = document.createElement('div');
				newDiv.id = 'skill_'+data.id;
				newDiv.className = "scaleUpAnimation";
				newDiv.innerHTML = displayEachSkill(data);
				document.getElementById('skills_'+LOGIN_NAME).appendChild(newDiv);
			}
		})
	}
}