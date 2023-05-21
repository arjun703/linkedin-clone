function loadMenu(){
	var divId = siteName + '/menu';
	
	var hdrTable = createHomeHdr(activeTab = 'menu');

	
	execFrontendOnlyFunction(divId, hdrTable, displayMenu);
	
}

const displayMenu = () => {

	var divId = siteName + '/menu';

	document.getElementById(divId).innerHTML = document.getElementById('menuItems').innerHTML;

}

