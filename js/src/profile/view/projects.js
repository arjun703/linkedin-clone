
function createProjectOptions(project){
return`
	<div class = "spareDiv2">
	</div>
	<div class = "editDeleteOptions">
		<table class = "simpleTable" >
			<tr>
				<th onclick = 'displayEditProjectForm(${JSON.stringify(project)})' > 
					${ createPrimaryButton('Edit') } 
				</th>
				<th onclick = "deleteProject(${project.id})" > 
					${ deleteButton() } 
				</th>
			</tr>
		</table>
	</div>
`
}

const displayEachProject =  (project) => {


project.divId  = `project_${project.login_name}_${project.id}`


return `


		<div class = "fontSize20"> ${project.project_name} </div>
		<div class = "fontSize17"> ${project.description} </div>
		<div> ${project.link} </div>
		
		${ IS_LOGGED_IN
			? ( VIEWING_PROFILE_OF == LOGIN_NAME )
				? createProjectOptions(project)
				: ''
			: ''
		}
`

}



function displayProjects(projects){

var projectsHolder = ``;

if(projects.length > 0){
	for(var i = 0; i < projects.length; i++){
		
		var id  = `project_${projects[i].login_name}_${projects[i].id}`

		projectsHolder += `<div class="jobMainInfoClone" id = '${id}' >` 
							+  displayEachProject(projects[i])
							+ `</div>`	
	}
	
}


return `
	${ createProfileSubHeader('Projects', profileOwnershipRequired = true,  "Add New", "displayAddNewProjectForm()") }
	<div class = "gridHolderModified mt-3" id= "projects_${VIEWING_PROFILE_OF}">
		${projectsHolder}
	</div>
	<hr>
`

}

