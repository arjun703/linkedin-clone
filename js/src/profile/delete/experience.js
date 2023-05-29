function deleteExperience(experienceId){

	var text = `
		
		Are you sure to delete this experience info? 
	
	`

	displayPrompt('Delete Experience?', 
					text ,
					`proceedExperienceDeletion(${experienceId})`,
					actionBtnDanger = true
				);

}


function proceedExperienceDeletion(id){
	deletee(siteName+'/php/profile/delete.php?table=experiences&id='+id, 'experience_'+LOGIN_NAME+'_'+id);
}

