function deleteEducation(educationId){

	var text = `
		
		Are you sure to delete this education info?
	
	`

	displayPrompt('Delete Education?', 
					text,
					`proceedEducationDeletion(${educationId})`,
					 actionBtnDanger = true
				);

}


function proceedEducationDeletion(id){
	deletee(siteName+'/php/profile/delete.php?table=educations&id='+id, 'education_'+LOGIN_NAME+'_'+id);

}

