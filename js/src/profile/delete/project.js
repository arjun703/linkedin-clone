function deleteProject(projectId){

	var text = `
		
		Are you sure to delete this project info? Please be
		informed that this can't be
		undone.
	
	`

	displayPrompt('Delete Project?', text , "proceedProjectDeletion(\'"+projectId+"\')" , actionBtnDanger = true);

}


function proceedProjectDeletion(id){
alert(id);
}

