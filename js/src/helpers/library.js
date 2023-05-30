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

	var loadingSignHolder = document.createElement('div');
	loadingSignHolder.id = divIdd+ '_loadingSign'
	loadingSignHolder.innerHTML= createLoadingSign('');
	document.getElementById(divIdd).appendChild(loadingSignHolder);

	hideAllDivsExceptDivWithThis(divId);

	currentlyBeingLoadedURLs.push(divId);

	fetch(serverFile)
	.then(function(response){
		return response.json()
	})
	.then(function(data){

		document.getElementById(divIdd+ '_loadingSign').remove();

		currentlyBeingLoadedURLs = currentlyBeingLoadedURLs.filter(item => item != divIdd);

		functionToBeCalled(data, divIdd);
	})

}


function beforeLoadTab(divId, hdrTable, serverURL, callback){


	clearHdrAndPut(hdrTable);

	locationToHdrMapper[divId] = hdrTable; 
	

	loadTab(divId, serverURL, callback);
}



function loadTab(divId, serverURL, callback, hdrTable = '', hardRefresh = false, pOrR = 'push'){

	/*
	 *
	 callback: fn to be called when loaded from server
	 *
	 */

	clearHdrAndPut(hdrTable);

	locationToHdrMapper[divId] = hdrTable; 

	if(!currentlyBeingLoadedURLs.includes(divId)){
		if(document.location == divId){
			refresh(divId, serverURL, callback); //  library.js
		}
		else{

			pushOrReplace(divId, pOrR);
			
			// check if the tab already exists 
			if(document.getElementById(divId)){
				if(!hardRefresh) hideAllDivsExceptDivWithThis(divId);
				else refresh(divId, serverURL, callback);
			}
			else{
				refresh(divId, serverURL, callback); //  library.js
			}
		}	
	} 
}



function display(data, inThisDiv, callback, divIdd = ''){



	if(data.length > 0){

		var newDiv = document.createElement('div');
		
		newDiv.className = "gridHolderModified2";

		newDiv.id = "grid_" + divIdd;

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


function pushOrReplace(divId, pOrR = 'push'){

	if(pOrR == 'push') history.pushState({}, '', divId)
	else history.replaceState({}, '', divId);
}


function execFrontendOnlyFunction(divId, hdrTable,  callback, data = '', pOrR = 'push'){
	
	clearHdrAndPut(hdrTable);

	locationToHdrMapper[divId] = hdrTable; 

	if(window.location != divId){
		pushOrReplace(divId, pOrR);
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