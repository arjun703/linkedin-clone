
const  createHomeHdr = (activeTab) => {

var newTable = document.createElement('table');

newTable.className = "hdrTable homeHdr ";

var newRow =document.createElement('tr');

var newDataForHome = document.createElement('td');
if(activeTab == 'home') newDataForHome.className = `activeTab `;
newDataForHome.onclick =  () =>  loadHome()
newDataForHome.innerHTML = "<i class = 'fa fa-home'> </i> <br> <small>Home</small> ";
if(EMPLOYER_MODE) newDataForHome.classList.add('d-none')

var newDataForNoti = document.createElement('td');
newDataForNoti.className = "requiresLogin";
if(activeTab == 'noti') newDataForNoti.className = "activeTab"
newDataForNoti.onclick = () => (IS_LOGGED_IN) ? loadNoti() : displayLoginOverlay('Notifications', 'view notifications.');
newDataForNoti.innerHTML = "<i class = 'fa fa-bell'> </i> <br> <small>Notifications</small> ";


var newDataForMyJobs = document.createElement('td');
newDataForMyJobs.className = "requiresLogin";
if(activeTab == 'applied') newDataForMyJobs.className = "activeTab"
newDataForMyJobs.onclick = () => IS_LOGGED_IN ? EMPLOYER_MODE ? loadPostedJobs() : loadAppliedJobs() : displayLoginOverlay('Saved Jobs', 'view applied and posted jobs');
newDataForMyJobs.innerHTML = "<i class = 'fa fa-bookmark'> </i> <br> <small>Saved Jobs</small> ";

var newwDataForSearch = document.createElement('td');
newwDataForSearch.onclick = () => loadSearchBox();
newwDataForSearch.innerHTML = "<i class ='fa fa-search'> </i> <br> <small>Search</small>  "
if(EMPLOYER_MODE) newwDataForSearch.classList.add('d-none')

var uploadJobPost = document.createElement('td');
uploadJobPost.className  = "d-none d-md-block"
if(activeTab == 'jobPostForm') uploadJobPost.className = "activeTab"
uploadJobPost.onclick = () => loadPostJobForm();
uploadJobPost.innerHTML = "<i class ='fa fa-suitcase'> </i> <br> <small>Post Job</small>  "

var menuHolder = document.createElement('td');
menuHolder.className  = "d-xs-block d-sm-block d-md-none"
menuHolder.onclick = () => loadMenu();
menuHolder.innerHTML = "<i class ='fa fa-bars'> </i> <br> <small>Menu</small>  "

if(activeTab == 'menu') menuHolder.className = "activeTab"



newRow.appendChild(newDataForHome);
newRow.appendChild(newDataForMyJobs);
newRow.appendChild(uploadJobPost);
newRow.appendChild(newDataForNoti);
newRow.appendChild(newwDataForSearch);
newRow.appendChild(menuHolder);

newTable.appendChild(newRow);

return newTable;

}


function createGeneralHdr(hdrText){
	
var newTable = document.createElement('table');
newTable.className  = "generalHdrTable";

var newRow = document.createElement('tr');

var backBtnHolder = createBackButton(); //function from searchBox.js

var hdrTextHolder = document.createElement('th');

hdrTextHolder.innerText = hdrText;

newRow.appendChild(backBtnHolder);
newRow.appendChild(hdrTextHolder);
newRow.appendChild(createHomeButton());

newTable.appendChild(newRow);
return newTable;


}


function createHomeButton(){
	var backBtnHolder = document.createElement('td');
	backBtnHolder.className = "text-center"
	var backBtn = document.createElement('button');
	backBtn.className = "btn btn-primary";
	backBtn.innerHTML = "<i class = 'fas fa-home'></i>";
	backBtnHolder.appendChild(backBtn);
	backBtnHolder.onclick = () => loadHome();

	return backBtnHolder
}


function clearHdrAndPut(thisContent){
	var middlePartOfHdr = document.getElementById('middlePartOfHdr');
	middlePartOfHdr.innerHTML = '';
	middlePartOfHdr.appendChild(thisContent);
}
