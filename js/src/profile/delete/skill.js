function deletee(serverURL, divId, copyToAnother = ''){
	hideOverlay();
	let div = document.getElementById(divId);
	document.getElementById(divId).classList.add('fadeOutAnimation');

	let divIdd = divId;

	fetch(serverURL)
	.then(response => {
		return response.json()
	})
	.then(data =>{ 
			document.getElementById(divId).classList.remove('fadeOutAnimation');

		if(data.error){
			alert(data.error);
		}
		else{

			if(copyToAnother != ''){
								// Get reference to the div element
				let myDiv = document.getElementById(copyToAnother);
				// Insert the new element at the beginning of the div
				
				
				setTimeout(()=>{myDiv.insertBefore(div, myDiv.firstChild);}, 1500);

			}
			removeDiv(divId);


		}
	})

}


function removeDiv(divId){
	let div =document.getElementById(divId);
	div.classList.add('scaleDownAnimation');
	setTimeout(()=>{div.remove()}, 1000);
}	




function deleteSkill(skillId){
	deletee(siteName+'/php/profile/delete.php?table=skills&id='+skillId, 'skill_'+skillId)

}