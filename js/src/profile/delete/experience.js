function deleteExperience(experienceId){

	var text = `
		
		Are you sure to delete this experience info? Please be
		informed that this can't be
		undone.
	
	`

	displayPrompt('Delete Experience?', 
					text ,
					"proceedExperienceDeletion(\'"+experienceId+"\')",
					actionBtnDanger = true
				);

}


function proceedExperienceDeletion(id){

}

