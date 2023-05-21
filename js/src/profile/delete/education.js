function deleteEducation(educationId){

	var text = `
		
		Are you sure to delete this education info? Please be
		informed that this can't be
		undone.
	
	`

	displayPrompt('Delete Education?', 
					text,
					"proceedEducationDeletion(\'"+educationId+"\')",
					 actionBtnDanger = true
				);

}


function proceedEducationDeletion(id){

}

