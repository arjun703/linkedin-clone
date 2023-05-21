
function createProjectOptions(project){
return`
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

function displayEachProject(project){

return `
	<div class = "editDeleteOptionsHolder" >
		<div class = "fontSize20"> ${project.title} </div>
		<div class = "fontSize17"> ${project.description} </div>
		<div> ${project.link} </div>
		
		${ ( VIEWING_PROFILE_OF == LOGIN_NAME )
			? createProjectOptions(project)
			: ''
		}

	</div>
`
}

function displayProjects(projects){

var projectsHolder = ``;

if(projects.length > 0){
	for(var i = 0; i < projects.length; i++){
		projectsHolder += displayEachProject(projects[i])
	}
}
else{
	projectsHolder += '<div class = "h6" > No projects to show. </div>'
}


return `
	${ createProfileSubHeader('Projects', profileOwnershipRequired = true,  "Add New", "displayAddNewProjectForm()") }
	<div class = "gridHolderModified ">
		${projectsHolder}
	</div>
	<hr>
`

}

