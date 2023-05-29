function createProjectForm(projectId = '', title = '', description = '', link = ''){

return `
	<div>
		<form id = "projectForm" method = "POST">

			<input type = "hidden" name = "projectId" value = "${projectId}">
			<div class = "gridHolderModified2">
				${createTextInput('Title', 'projectFormTitle' , title) }
				${createTextInput('Link', 'projectFormLink', link)}
			</div>
				${createTextarea('Project Description', 'descriptioon', description)}
		</form>
	</div>
`

}


function createEditProjectForm(project){
   
return createProjectForm(
		projectId = project.id,
		title = project.project_name,
		description = project.description,
		link = project.link
	)
}


function createAddNewProjectForm(){
	return createProjectForm()
}


function displayEditProjectForm(project){

	displayPrompt('Edit Project', createEditProjectForm(project), `handleEditProjectSubmit('${project.divId}')`);

}

function displayAddNewProjectForm(){
	displayPrompt('Add New Project', createAddNewProjectForm(), 'handleAddNewProjectSubmit()' );
}

function handleAddNewProjectSubmit(){
	handleAddNew('projectForm', 
					'projects_'+LOGIN_NAME, 
					displayEachProject,
					siteName+'/php/profile/create/project.php',
					'project'
	)
}



function handleEditProjectSubmit(divId){

	handleEdits('projectForm', 
					divId, 
					displayEachProject,
					siteName+'/php/profile/edit/project.php'
	)

}
