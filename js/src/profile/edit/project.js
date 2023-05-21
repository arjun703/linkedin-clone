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
		title = project.title,
		description = project.description,
		link = project.link
	)
}


function createAddNewProjectForm(){
	return createProjectForm()
}



function displayEditProjectForm(project){

	displayPrompt('Edit Project', createEditProjectForm(project), 'handleEditProjectSubmit()');

}

function displayAddNewProjectForm(){
	displayPrompt('Add New Project', createAddNewProjectForm(), 'handleAddNewProjectSubmit()' );
}



function handleEditProjectSubmit(){


}

