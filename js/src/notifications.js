const displayNoti = (notis, divIdd) => {
	var displayInThisDiv = document.getElementById(divIdd);

	display(notis, displayInThisDiv, callback = returnEachNoti); // library.js

}

function loadNoti(){

	var divId = siteName + '/notifications';
	
	var hdrTable = createHomeHdr(activeTab = 'noti');

	var serverURL = apiFolder + '/notifications.php';

	loadTab(divId, serverURL, displayNoti, hdrTable);
}

function returnEachNoti(noti){
	var newDiv = document.createElement("div");
	newDiv.className = "jobMainInfo";

	newDiv.innerText = noti.notification;

	return newDiv;
}