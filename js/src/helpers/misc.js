var menuShown = true;

function toggleMenuInDesktop(){
	document.getElementById('menuItems').style.display = menuShown == true ? 'none' : 'block'
	menuShown = !menuShown;
}

function logOut(){
	location.href = siteName + '/php/auth/logOut.php';
}

function createOverlayHeader(title){
	return`
		<div class = "overlayHeader">
			<table class = "fixedTable mt-2 mb-2">
				<tr>
					<td class = "h4">
						${title}
					</td>
					<th class = "cursorPointer" 
					 onclick = "hideOverlay()" style = "width:50px;text-align:center">
						<i class = "fa fa-close fa-2x"></i>
					</th>
				</tr>
			</table>
		</div>
	`
}


function createLoginAlertForm(title, message){

return `
	
		${createOverlayHeader(title)}

		<hr>
		<div style = "font-size:17px">
			You need to login to ${message}. Create new account if you 
			don't have one. It's 100% free and you are just a minute away!
		</div>
		<div class = "mt-2 mb-2">
			<table onclick = "hideOverlay()" class = "simpleTable">
				<tr>
					<td  class = "btnBordered" onclick = "loadLoginForm()">
						Login
					</td>
					<td class = "btnHighlighted btnSuccessMyOwn" onclick = "loadRegisterForm()">
						Create New Account
					</td>
				</tr>
			</table>
		</div>
	
`;	

}

function performOperationsOnBody(){
	document.body.style.overflowY = "hidden";
}



function createOverlayAndInsert(innerhtml){
var newDiv = document.createElement('div');

newDiv.innerHTML = `
	<div id = "outerOverlay" class  = "outerOverlay">
		<div class = "overlay" id = "overlay">
			${innerhtml}
		</div>
	</div>
`

document.body.appendChild(newDiv);

}


function displayLoginOverlay(title, message){

performOperationsOnBody();
createOverlayAndInsert(createLoginAlertForm(title, message))

}


function createOverlayFooterOptions(callback, actionBtnDanger){
	return`
		<div class = "mt-2 mb-2">
			<table class = "simpleTable">
				<tr>
					<td class = "btnBordered" onclick = "hideOverlay()">
						Cancel
					</td>
					<td id = 'overlayFooterAction' class = "btnHighlighted ${ actionBtnDanger ? 'btnDangerMyOwn' : 'btnSuccessMyOwn'  } " 
						onclick = "${callback}" >
						Continue
					</td>
				</tr>
			</table>
		</div>
	`
}

function createPrompt(title, text, callback, actionBtnDanger){
return `
	${createOverlayHeader(title)}

	<hr>

	<div>
		${text}			
	</div>

	${createOverlayFooterOptions(callback, actionBtnDanger)}
`
}

function displayPrompt(title, text, callback, actionBtnDanger = false){

performOperationsOnBody();
createOverlayAndInsert(createPrompt(title, text, callback, actionBtnDanger));

}



function getPartOfDay() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
}


function createPromptWithoutFooterOptions(title, text){

return `
	${createOverlayHeader(title)}

	<hr>

	<div>
		${text}			
	</div>

`
}

function displayPromptWithoutFooterOptions(title, text){

performOperationsOnBody();
createOverlayAndInsert(createPromptWithoutFooterOptions(title, text));

}


function putTextInInputField(elementId, text, callback = ''){
	document.getElementById(elementId).value = text;
	if(callback !=''){
		callback();
	}
}

function escapeSingleQuotes(str) {
  return str.replace(/'/g, "\\'");
}

function returnList(inputElementId, suggestions, callback = ''){
var ul = ``;	

	if(suggestions.length > 0){
		for(var i =0; i< suggestions.length; i++) {
			ul += `<li onclick = 'putTextInInputField("${inputElementId}", "${escapeSingleQuotes(suggestions[i])}", ${callback})' title = "${suggestions[i]}"  class = "option p-2"> ${suggestions[i]}  </li>`;
		};		
		return ul;
	}
	else{
		return '<p class = "text-center">No suggestions</p>'
	}

}


async function handleLocationInput(elementId, divId, URl){
	const autocompleteDiv = document.getElementById(divId);
	
	const inputValue = document.getElementById(elementId).value;
	
	if(inputValue.trim().length > 2){
		autocompleteDiv.innerHTML = '<p class="text-center">Loading</p>';			
		const response = await fetch(URl);
		const data = await response.json();
		const suggestions = data.features.map(feature => feature.properties.formatted);
		autocompleteDiv.innerHTML = returnList(elementId,  suggestions); 
	}
	else{
		autocompleteDiv.innerHTML = '<p class = "text-center">Enter Location</p>';
	}
}



function deperformOperationsOnBody(){
	document.body.style.overflowY = "scroll";
	if(document.getElementById('outerOverlay')){
		document.getElementById('outerOverlay').remove();
	}
}



function hideOverlay(){
	deperformOperationsOnBody();
}

function deactivateButton(id, text){

	document.getElementById(id).disabled = true;
	document.getElementById(id).innerText = text;
}

function activateButton(id, text){
	document.getElementById(id).disabled = false;
	document.getElementById(id).innerText = text;

}





function getCookieValue(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  
  return "";
}