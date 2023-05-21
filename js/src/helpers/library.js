function deleteThisDiv(divId){
	var thisDiv = document.getElementById(divId);
	if(thisDiv){
		thisDiv.remove();
	}
	var newDiv = document.createElement('div');
	newDiv.id = divId;
	middleMainContent.appendChild(newDiv);
}

function hideAllDivsExceptDivWithThis(divId){
	var childrens = middleMainContent.children;

	for (var i = childrens.length - 1; i >= 0; i--) {
		childrens[i].style.display = "none";
	}

	document.getElementById(divId).style.display = "block";
}



function refresh(divId, serverFile, functionToBeCalled){
 	/*
 	 *
 	 divId: id of the div being refreshed
 	 functionToBeCalled: function to be Called after data is fetched
 						from server
	 serverFile: file to which request is sent
	 *
 	 */

 	let divIdd = divId;

	deleteThisDiv(divId);

	hideAllDivsExceptDivWithThis(divId);

	currentlyBeingLoadedURLs.push(divId);

	fetch(serverFile)
	.then(function(response){
		return response.json()
	})
	.then(function(data){

		currentlyBeingLoadedURLs = currentlyBeingLoadedURLs.filter(item => item != divIdd);

		functionToBeCalled(data, divIdd);
	})

}


function beforeLoadTab(divId, hdrTable, serverURL, callback){


	clearHdrAndPut(hdrTable);

	locationToHdrMapper[divId] = hdrTable; 
	

	loadTab(divId, serverURL, callback);
}



function loadTab(divId, serverURL, callback){

	/*
	 *
	 callback: fn to be called when loaded from server
	 *
	 */

	if(!currentlyBeingLoadedURLs.includes(divId)){
		if(document.location == divId){
			refresh(divId, serverURL, callback); //  library.js
		}
		else{

			push(divId);
			
			// check if the tab already exists 
			if(document.getElementById(divId)){
				hideAllDivsExceptDivWithThis(divId);
			}
			else{
				refresh(divId, serverURL, callback); //  library.js
			}
		}	
	} 
}



function display(data, inThisDiv, callback){

	if(data.length > 0){

		var newDiv = document.createElement('div');
		
		newDiv.className = "gridHolder";

		switch(noOfElementPerRow()){
			case 1:
				newDiv.style.gridTemplateColumns = '1fr'; // sets 3 columns of equal width
				break;
			case 2:
				newDiv.style.gridTemplateColumns = '1fr 1fr'; // sets 3 columns of equal width
				break;
			case 3:
				newDiv.style.gridTemplateColumns = 'repeat(3, 1fr)'; // sets 3 columns of equal width
				break;
		}

		inThisDiv.appendChild(newDiv);

		for(var i = 0; i<data.length; i++){
			newDiv.appendChild(callback(data[i]));
		}
	}
}


function noOfElementPerRow(){
	var middleMainContentWidth = middleMainContent.clientWidth;
	if(middleMainContentWidth <= 470){
		return 1;
	}
	else if(middleMainContentWidth <= 700){
		return 2;
	}
	else{
		return 3;
	}
}


function push(divId){
	history.pushState({}, '', divId)
}


function execFrontendOnlyFunction(divId, hdrTable,  callback, data = ''){
	
	clearHdrAndPut(hdrTable);

	locationToHdrMapper[divId] = hdrTable; 

	if(window.location != divId){
		push(divId);
	}

	if(document.getElementById(divId)){
		hideAllDivsExceptDivWithThis(divId);
	}
	else{
		deleteThisDiv(divId);
		hideAllDivsExceptDivWithThis(divId);
		callback(data);
	}

}


window.onpopstate =  (e) => {
	clearHdrAndPut(locationToHdrMapper[document.location]);
	hideAllDivsExceptDivWithThis(document.location);
}