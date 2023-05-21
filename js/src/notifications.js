const displayNoti = (notis, divIdd) => {
	var displayInThisDiv = document.getElementById(divIdd);

	display(notis, displayInThisDiv, callback = returnEachNoti); // library.js

}

function loadNoti(){

	var divId = siteName + '/notifications';
	
	var hdrTable = createHomeHdr(activeTab = 'noti');

	clearHdrAndPut(hdrTable);

	locationToHdrMapper[divId] = hdrTable;

	var serverURL = apiFolder + '/notifications.php';

	loadTab(divId, serverURL, displayNoti);
}

function returnEachNoti(noti){
	var newDiv = document.createElement("div");
	newDiv.className = "jobMainInfo";

	newDiv.innerText = noti.notification;

	return newDiv;
}