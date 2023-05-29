function deleteProject(projectId){

	var text = `
		
		Are you sure to delete this project info? 
	
	`

	displayPrompt('Delete Project?', text , `proceedProjectDeletion(${projectId})` , actionBtnDanger = true);

}


function proceedProjectDeletion(id){

	deletee(siteName+'/php/profile/delete.php?table=projects&id='+id, 'project_'+LOGIN_NAME+'_'+id);

}

