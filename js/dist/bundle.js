function setup(){fetch(siteName+"/php/auth/checkLoginStatus.php").then(e=>e.json()).then(e=>{handleCheckLoginStatusData(e)})}function handleCheckLoginStatusData(e){e.isNotLoggedIn?window.IS_LOGGED_IN=!1:(window.IS_LOGGED_IN=!0,window.PROFILE_VISITS_COUNT=e.profileVisitsCount,window.CV_DOWNLOADS_COUNT=e.CVdownloadsCount,window.LOGIN_NAME=e.loginName,window.HAS_COMPANY_PAGE=e.hasCompanyPage,window.HAS_COMPANY_PAGE&&(window.COMPANY_ID=e.companyId)),""!=getCookieValue("employerMode")?window.EMPLOYER_MODE=!0:window.EMPLOYER_MODE=!1,document.getElementById("preLoaderHolder").remove(),manageSidebars(),(EMPLOYER_MODE&&IS_LOGGED_IN?loadPostedJobs:EMPLOYER_MODE?loadPostJobForm:loadHome)()}function returnTopOfMiddleMainContent(){return document.getElementById("middleMainContent").getBoundingClientRect().top+5+"px"}function makeSidebarsSticky(){for(var e=document.getElementsByClassName("stickyLeftOrRight"),t=0;t<e.length;t++){var o=returnTopOfMiddleMainContent();e[t].style.top=o}}function manageSidebars(){document.getElementById("hdrLeftPart").innerHTML=handleHdrLeftPart(),document.getElementById("hdrRightPart").innerHTML=handleHdrRightPart(),document.getElementById("rightSidebar").innerHTML=createRightSidebar(),window.middleMainContent=document.getElementById("middleMainContent"),EMPLOYER_MODE?(document.getElementById("leftSidebar").remove(),document.getElementById("middleMainContent").classList.remove("col-md-6"),document.getElementById("middleMainContent").classList.add("col-md-9")):document.getElementById("leftSidebar").innerHTML=createLeftSidebar(),makeSidebarsSticky()}function handleHdrLeftPart(){return`
		<div style="margin-left: 15px; ">
			<span class="h4">MyDJ</span>
			<br>
			<small style="font-size: 12px;">Meet your Dream Job!</small>
		</div>
	`}function handleHdrRightPart(){return`
		<div  class="d-flex justify-content-center" >
			<div class="topRightIcon" onclick="toggleMenuInDesktop()">
				<table>
					<tr>
						<td>
							<i class="fa fa-circle-user"></i>
						</td>
						<td style="padding-left: 5px;" class= "loginNameHolder">
							@${IS_LOGGED_IN?LOGIN_NAME:"guest"}
						</td>
						<td style="font-size: 10px;padding-left: 5px;">
							▼ 
						</td>
					</tr>
				</table>
			</div>
		</div>
	`}function createLeftSidebar(){return`
		<div class="stickyLeftOrRight">

			<div class="animateScaleUP ${EMPLOYER_MODE?"d-none":""} leftSidebarOptionsHolder">
				
				<div  class="text-center pt-2">
					Good ${getPartOfDay()}, 
					<span  class = 'loginNameHolder'>
							
						@${IS_LOGGED_IN?LOGIN_NAME:"guest"}
					</span>
				</div>
				<hr>
				<div  class="lso">
					<div class="fontSize17">Your Profile Visited By</div>
					<div id="ProfileVisitsCountHolder">
							${IS_LOGGED_IN?PROFILE_VISITS_COUNT+" Employers":'<span onclick = "loadLoginForm()" class = "softLink">Login</span> to view'}
					</div>							
				</div>
				<hr>
				<div class="lso mb-3">
					<div class="fontSize17">Your CV Downloaded By</div>
					<div  id="CVdownloadsCountHolder">
							${IS_LOGGED_IN?CV_DOWNLOADS_COUNT+" Employers":'<span onclick = "loadLoginForm()" class = "softLink">Login</span> to view'}
					</div>
				</div>
			</div>

			<div class = "rightSidebarOptionsHolder  ${EMPLOYER_MODE?"d-none":""} ">
				<h6 class="text-center">Jobs Categories</h6>
				<span class = "softLink" onclick ="loadJobsByCategory('so')">Software</span>
				<br>
				<span class = "softLink" onclick ="loadJobsByCategory('ne')" >Networking and Hardware</span>
				<br>
				<span class = "softLink" onclick ="loadJobsByCategory('hu')">Human Resources</span>
				<br>
			</div>
		</div>
	`}function setEmployerMode(){""==getCookieValue("employerMode")?document.cookie="employerMode=true":document.cookie="employerMode=",document.getElementById("employerMode").classList.add("rotateAnimation"),setTimeout(()=>{location.href=siteName},1e3)}function createRightSidebar(){return`
		<div class="stickyLeftOrRight">
			<div id="menuItems" class="animateScaleUP rightSidebarOptionsHolder">
				<li class = "option ${IS_LOGGED_IN?"d-none":""} " id="registerOption"  onclick="loadRegisterForm()">
					<i class ="fa fa-user-plus"></i>Create New Account
				</li>
				
				<li class = " option ${IS_LOGGED_IN?"d-none":""}" id="logInOption" onclick="loadLoginForm()">
					<i class="fa fa-sign-in"></i>Log In
				</li>
				
				<li onclick =  "${IS_LOGGED_IN?" viewOwnProfile() ":"displayLoginOverlay('View Profile', 'view your profile')"} "   class="option requiresLogin">
					<i class="fa fa-eye"></i>View your Profile
				</li>
				
				<li class="option"
				 onclick=" ${IS_LOGGED_IN&&HAS_COMPANY_PAGE?"loadCompanyPage("+COMPANY_ID+")":"loadCreateCompanyPage()"}
				  		" 
				>
					${IS_LOGGED_IN&&HAS_COMPANY_PAGE?"<i class = 'fa fa-building'></i>Your Company Page":"<i class = 'fa fa-plus'></i>Create Company Page"} 
				</li>
				<li class="option" onclick="toggle()">
					<i class="fa fa-moon"></i>Day/Night Mode
				</li>
				<li class="option" onclick="setEmployerMode()">
					<i id ="employerMode" class="fa fa-toggle-off"></i>Employer/Employee Mode
				</li>
				<li class = " option ${IS_LOGGED_IN?"":"d-none"}" id="logOutOption" onclick="logOut()">
					<i class="fa fa-sign-out"></i>Log Out
				</li>
			</div>



			<div class="rso  text-center">
				<a href=""> About us </a> 
				<a href=""> Careers </a>  
				<a href=""> Privacy Policy </a>
				<a href=""> Give us Feedback </a>
				<a href=""> Get our App </a>
			</div>

		</div>
	`}const displayNoti=(e,t)=>{display(e,document.getElementById(t),callback=returnEachNoti)};function loadNoti(){var e=siteName+"/notifications",t=createHomeHdr(activeTab="noti");loadTab(e,apiFolder+"/notifications.php",displayNoti,t)}function returnEachNoti(e){var t=document.createElement("div");return t.className="jobMainInfo",t.innerText=e.notification,t}function loadMenu(){execFrontendOnlyFunction(siteName+"/menu",createHomeHdr(activeTab="menu"),displayMenu)}const displayMenu=()=>{var e=siteName+"/menu";document.getElementById(e).innerHTML=document.getElementById("menuItems").innerHTML};function loadSearchResults(){var e=getCookieValue("position").replace(/\s/g,"+"),t=getCookieValue("location").replace(/\s/g,"+"),e=siteName+"/search?j="+e+"&l="+t,t=createGeneralHdr(getCookieValue("position"));loadTab(e,"php/search/results.php",displaySearchResults,t)}function createSearchFilter(){return window.filterChanged=!1,`
<div>
	<table class= "w-100">
		<tr>
			<th>Type</th>
			<th>Site</th>
			<th></th>
		</tr>
		<tr id = "filterHolder">
			<td>	
				<div class = "mt-1">
					<input  type = "checkbox" id = "jt_1" onchange = "handle(event, 'fu')">
					<label class = "ml5" for = "jt_1">Full Time</label>
				</div>
				<div class = "mt-1">
					<input onchange = "handle(event,'pa')"  type = "checkbox" id = "jt_2">
					<label class = "ml5" for = "jt_2">Part Time</label>
				</div>
				<div  class ="mt-1" >
					<input onchange = "handle(event, 'in')" type = "checkbox" id = "jt_3">
					<label  class = "ml5" for = "jt_3">Internship</label>
				</div>
				<div class = "mt-1" >
					<input onchange = "handle(event, 'co')" type = "checkbox" id = "jt_4">
					<label class="ml5" for = "jt_4" >Contract</label>
				</div>
			</td>
			<td>
				<div>
					<input  onchange = "handle(event, 'on')"  type = "checkbox" id = "js_1">
					<label class="ml5" for = "js_1">On-Site</label>
				</div>
				<div class = "mt-1">
					<input  onchange = "handle(event, 're')"  type = "checkbox" id = "js_2">
					<label class="ml5" for = "js_2">Remote</label>
				</div>
				<div class = "mt-1">
					<input  onchange = "handle(event, 'hy')"  type = "checkbox" id = "js_3">
					<label class="ml5" for = "js_3">Hybrid</label>
				</div>
			</td>
			<td class = "softLink" onclick = "resetFilters()">
				Reset
			</td>
		</tr>
	</table>
</div>

`}function handle(e,t){window.filterChanged=!0,e.target.checked?document.cookie=e.target.id+"="+t:document.cookie=e.target.id+"=;expires=Thu, 01 Jan 1970 00:00:00 UTC;"}function resetFilters(){for(var e=document.getElementById("filterHolder").querySelectorAll("input"),t=0;t<e.length;t++)document.cookie=e[t].id+"=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";checkTheCheckboxStatus()}function checkTheCheckboxStatus(){for(var e=document.getElementById("filterHolder").querySelectorAll("input"),t=0;t<e.length;t++)""!=getCookieValue(e[t].id)?e[t].checked=!0:e[t].checked=!1}function displayFilterPrompt(){displayPrompt("Edit Filters",createSearchFilter(),"checkFilters()"),checkTheCheckboxStatus()}const displaySearchResults=(e,t)=>{var t=document.getElementById(t),o=(t.className="mt-3",createProfileSubHeader("Results",profileOwnershipRequired=!1,btnText="Add Filters",callback="displayFilterPrompt()")),n=document.createElement("div"),o=(n.innerHTML=o+"<hr>",t.appendChild(n),document.createElement("div"));t.appendChild(o),display(e,o,callback=returnEachJob)};function refreshFilters(){(document.location.toString().includes("search")?loadSearchResults:loadHome)()}function checkFilters(){filterChanged&&(refreshFilters(),hideOverlay())}function createBackButton(){var e=document.createElement("td"),t=(e.className="text-center",document.createElement("button"));return t.className="btn btn-primary",t.innerHTML="<i class = 'fas fa-arrow-left'></i>",e.appendChild(t),e.onclick=()=>history.back(),e}function createSearchBoxHdr(){var e=document.createElement("table"),t=(e.className="generalHdrTable",document.createElement("tr")),o=createBackButton(),n=document.createElement("td"),i=document.createElement("div"),a=(i.className="gridHolder",i.style.gap="5px",document.createElement("div")),r=document.createElement("input"),d=(r.placeholder="Search job",r.id="searchBoxPositionInput",r.className="form-control",r.onkeyup=e=>{loadJobSuggestions(e.target.value)},a.appendChild(r),document.createElement("div"));return(r=document.createElement("input")).id="searchBoxLocationInput",r.placeholder="Location",r.onkeyup=e=>{loadLocationSuggestions(e.target.value)},r.className="form-control",d.appendChild(r),i.appendChild(a),i.appendChild(d),n.appendChild(i),t.appendChild(o),t.appendChild(n),e.appendChild(t),e}const handleSuggestionClicksInSearchBox=()=>{var e=document.getElementById("searchBoxPositionInput").value.trim(),t=document.getElementById("searchBoxLocationInput").value.trim();""!=e&&(document.cookie="position="+e),""!=e&&""==t&&(document.getElementById("searchBoxLocationInput").focus(),displaySearchBox()),""!=t&&(document.cookie="location="+t),""!=t&&""==e&&(document.getElementById("searchBoxPositionInput").focus(),displaySearchBox()),2<e.length&&2<t.length&&loadSearchResults()};function createLoadingSign(e=""){return`
			<div id = "${e}" class = "loadingSignHolder animationNone">
				<i class = 'loadingSign fa fa-spinner fa-spin'></i>
			</div>
		`}function loadJobSuggestions(e){let t=siteName+"/searchBox";2<e.trim().length?(document.getElementById(t).innerHTML=createLoadingSign(),fetch(`php/search/autocomplete.php?query=${e}&task=position`).then(e=>e.json()).then(e=>{0==e.length?document.getElementById(t).innerHTML="<div class = 'h4 text-center'>No Suggestions</h4>":document.getElementById(t).innerHTML=`
					<div class = "listHolder">
				`+returnList("searchBoxPositionInput",e,handleSuggestionClicksInSearchBox)+"</div>"})):document.getElementById(t).innerHTML=defaultContentForSearchBox()}function loadLocationSuggestions(e){let t=siteName+"/searchBox";2<e.trim().length?(document.getElementById(t).innerHTML=`
			<div class = "loadingSignHolder animationNone">
				<i class = 'loadingSign fa fa-spinner fa-spin'></i>
			</div>
		`,fetch(`php/search/autocomplete.php?query=${e}&task=location`).then(e=>e.json()).then(e=>{0==e.length?document.getElementById(t).innerHTML="<div class = 'h4 text-center'>No Suggestions</h4>":document.getElementById(t).innerHTML=`
					<div class = "listHolder">
				`+returnList("searchBoxLocationInput",e,handleSuggestionClicksInSearchBox)+"</div>"})):document.getElementById(t).innerHTML=defaultContentForSearchBox()}function loadSearchBox(){execFrontendOnlyFunction(siteName+"/searchBox",createSearchBoxHdr(),displaySearchBox)}function notLoggedInDefaultContent(){return`
		<div class = "text-center">
			<img class = "emptyContentImage" src = "files/tired.jpg">
		</div>
		<div class = "text-center mt-3" >
			<h4>Tired of Typing ? </h4>
			<div> 
				<span class = "softLink" onclick = "loadLoginForm()">Login</span> to access recent searches
			</div>
		</div>
	`}function loggedInDefaultContent(){return`
		<div>

		</div>

	`}function defaultContentForSearchBox(){return`

		<div class = "animationNone">
			
			${(IS_LOGGED_IN?loggedInDefaultContent:notLoggedInDefaultContent)()}

		</div>

	`}const displaySearchBox=()=>{var e=siteName+"/searchBox";document.getElementById(e).innerHTML=defaultContentForSearchBox()};function loadViewProfile(e,t=""){var o=siteName+"/profile/"+e,n=createHomeHdr(activeTab="sdfdsf");loadTab(o,siteName+"/php/profile/view.php?of="+e+"&fromJobId="+t,displayProfile,n)}const displayProfile=(e,t)=>{var o=e.personal.login_name,o=displayProfileHeader(window.VIEWING_PROFILE_OF=o,e.jobId)+`<div id = "personal_${o}">`+displayPersonal(e.personal)+"</div>",n=displayExperiences(e.experiences),i=displaySkills(e.skills),a=displayProjects(e.projects),e=displayEducations(e.educations);document.getElementById(t).innerHTML=o+n+i+a+e};function createTd(e,t){return`
		<td style = "text-align:right"  
			onclick = '${e}' >
			${createPrimaryButton(t)}
		</td>
	`}function createProfileSubHeader(e,t,o="",n=""){return`
		<div>
			<table class = 'fixedTable'>
				<tr>
					<td class = "h5">
						${e}
					</td>
					${!t||IS_LOGGED_IN&&VIEWING_PROFILE_OF==LOGIN_NAME?createTd(n,o):""}

				</tr>
			</table>
		</div>
	`}function createSuccessButton(e){return`
		<button class = "btn btn-success">
			${e}
		</button>
	`}function displayProfileHeader(e,t=""){return`
		
		<div  class = "profileHader p-2 mt-4 mb-5"
				style = " max-width:350px; background: var(--bgColorOfCards); top: ${returnTopOfMiddleMainContent()}"
			> 
				<table class= "fixedTable">
					<tr>
						<td style="font-weight:bold;text-align:center">
							@${e}
						</td>


						${createTd("dowloadCV('"+e+"', "+t+")","Download CV")}

					</tr>
				</table>

		</div>
		<hr>
	`}function deleteButton(){return`
		<button class= "btn  btn-danger">
			Delete
		</button>
	`}function createAddNewTd(e){return`
		<td style = "text-align:right" onclick = "${e}">
			${createPrimaryButton("Add New")}
		</td>
	`}function createPrimaryButton(e){return`
		<button class = "btn btn-primary">
			${e}
		</button>
	`}function createDangerButton(e){return`
		<button class = "btn btn-danger">
			${e}
		</button>
	`}function viewOwnProfile(){loadViewProfile(LOGIN_NAME)}function createAddSkillForm(){return`
	<form method="POST" action = "" onsubmit = "return false">
		<input style = "border-radius:15px;text-align:center"
		  placeholder = "Add New Skill" 
		  class = "w-100" 
		  onkeyup = "handleSkillInput(event)" 
		  type = "text" 
		  name = "profileNewSkill"
		   id = "profileNewSkill">
	</form>
`}function createDeleteSkillIcon(e){return`
		<span  style = "padding-left:5px; padding-right:5px; cursor:pointer " onclick = "deleteSkill(${e})">
			<i class = "fa fa-close"></i>
		</span>
	`}function displayEachSkill(e){return`
		<div class = "flex-item">
			<span> ${e.skill} </span>
			${IS_LOGGED_IN&&VIEWING_PROFILE_OF==LOGIN_NAME?createDeleteSkillIcon(e.id):""}
		</div>
	`}function displaySkills(e){var t="";if(0<e.length)for(var o=0;o<e.length;o++)t+=`<div id ='skill_${e[o].id}'>  ${displayEachSkill(e[o])} </div>`;return`
	<div>
		<table class = "fixedTable">
			<tr>
				<td class = "h4"> Skills </td>
				<td>
					${IS_LOGGED_IN&&VIEWING_PROFILE_OF==LOGIN_NAME?createAddSkillForm():""}
				</td>
			</tr>
		</table>
	</div>


	<div class = "mt-3 flex-container " id = 'skills_${VIEWING_PROFILE_OF}'>
		${t}
	</div>
	

	<hr>

`}function handleSkillInput(e){var t=e.target.value.trim();2<t.length&&13===event.keyCode&&(e.target.value="",fetch(siteName+"/php/profile/create/skill.php?skill="+t).then(e=>e.json()).then(e=>{var t;e.error?alert(e.error):((t=document.createElement("div")).id="skill_"+e.id,t.className="scaleUpAnimation",t.innerHTML=displayEachSkill(e),document.getElementById("skills_"+LOGIN_NAME).appendChild(t))}))}function createProjectOptions(e){return`
	<div class = "spareDiv2">
	</div>
	<div class = "editDeleteOptions">
		<table class = "simpleTable" >
			<tr>
				<th onclick = 'displayEditProjectForm(${JSON.stringify(e)})' > 
					${createPrimaryButton("Edit")} 
				</th>
				<th onclick = "deleteProject(${e.id})" > 
					${deleteButton()} 
				</th>
			</tr>
		</table>
	</div>
`}const displayEachProject=e=>(e.divId=`project_${e.login_name}_`+e.id,`


		<div class = "fontSize20"> ${e.project_name} </div>
		<div class = "fontSize17"> ${e.description} </div>
		<div> ${e.link} </div>
		
		${IS_LOGGED_IN&&VIEWING_PROFILE_OF==LOGIN_NAME?createProjectOptions(e):""}
`);function displayProjects(e){var t="";if(0<e.length)for(var o=0;o<e.length;o++)t+=`<div class="jobMainInfoClone" id = '${`project_${e[o].login_name}_`+e[o].id}' >`+displayEachProject(e[o])+"</div>";return`
	${createProfileSubHeader("Projects",profileOwnershipRequired=!0,"Add New","displayAddNewProjectForm()")}
	<div class = "gridHolderModified mt-3" id= "projects_${VIEWING_PROFILE_OF}">
		${t}
	</div>
	<hr>
`}function createPersonalHeader(e){e.divId="personal_"+e.login_name;e=JSON.stringify(e);return`
		${createProfileSubHeader("Personal",profileOwnershipRequired=!0,"Edit","displayEditPersonalForm("+e+")")}
	`}const displayPersonal=e=>`
		
		<div>

			${createPersonalHeader(e)}
			
			<div class = "" id = "personal_${e.login_name}">
				<div class = "mt-3">
					<table class = "attractive-table w-100">
						<tr>
							<td> Name </td>
							<td>${e.name}</td>
						</tr>
						<tr>
							<td> Summary </td>
							<td> ${e.summary} </td>
						</tr>
						<tr>
							<td> Email </td>
							<td> ${e.email} </td>
						</tr>
						<tr>
							<td> Phone </td>
							<td> ${e.phone} </td>
						</tr>
						<tr>
							<td> Website </td>
							<td> ${e.website} </td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<hr>
	`;function createExperienceOptions(e){return`
<div class = "spareDiv2">
</div>
	<div class = "editDeleteOptions">
		<table class = 'simpleTable'>
			<tr>
				<th onclick = 'displayEditExperienceForm(${JSON.stringify(e)})' > 
					${createPrimaryButton("Edit")} 
				</th>
				<th onclick = 'deleteExperience(${e.id})' > 
					${deleteButton()} 
				</th>
			</tr>
		</table>
	</div>
`}const displayEachExperience=e=>(1==e.currently_working_here&&(e._to="Present"),e.divId=`experience_${e.login_name}_`+e.id,`
		<div class = "fontSize20"> ${e.position}</div>
		<div class = "fontSize17"> ${e.company}</div>
		<div>${e.description}</div>
		<div class="fontSize17"> ${e._from} to ${e._to} </div>
		
		${IS_LOGGED_IN&&VIEWING_PROFILE_OF==LOGIN_NAME?createExperienceOptions(e):""}
`);function displayExperiences(e){var t="";if(0<e.length)for(var o=0;o<e.length;o++)t+=`<div id = '${`experience_${e[o].login_name}_`+e[o].id}' class = "jobMainInfoClone" >`+displayEachExperience(e[o])+"</div>";return`
	
	${createProfileSubHeader("Experiences",profileOwnershipRequired=!0,"Add New","displayAddNewExperienceForm()")}
	<div class = "gridHolderModified mt-3" id= "experiences_${VIEWING_PROFILE_OF}">
		${t}
	</div>
	<hr>

`}function createEducationOptions(e){return`
<div class = "spareDiv2">
	</div>
	<div class = "editDeleteOptions ">
		<table class = "simpleTable">
			<tr>
				<th onclick = 'displayEditEducationForm(${JSON.stringify(e)})'' > 
					${createPrimaryButton("Edit")} 
				</th>
				<th onclick = "deleteEducation(${e.id})" > 
					${deleteButton()} 
				</th>
			</tr>
		</table>
	</div> 
`}const displayEachEducation=e=>(e.divId=`education_${e.login_name}_`+e.id,`
       <div class="fontSize20">${e.level}</div>

      <div  style="font-weight:bold" class = "fontSize17">
      	${void 0!==e.field?e.field:"---------"}
      </div>
      <div class="fontSize17">${e.institution}</div>
      <div>${e._from} to ${e._to}</div>
      
      ${IS_LOGGED_IN&&VIEWING_PROFILE_OF==LOGIN_NAME?createEducationOptions(e):""}
  `);function displayEducations(e){var t="";if(0<e.length)for(var o=0;o<e.length;o++)t+=`<div class =  "jobMainInfoClone" id = '${`education_${e[o].login_name}_`+e[o].id}' >`+displayEachEducation(e[o])+"</div>";return`
	${createProfileSubHeader("Education",profileOwnershipRequired=!0,"Add New","displayAddNewEducationForm()")}
	
	<div class = "gridHolderModified mt-3" id= "educations_${VIEWING_PROFILE_OF}">
		${t}
	</div>
	
`}function createProjectForm(e="",t="",o="",n=""){return`
	<div>
		<form id = "projectForm" method = "POST">

			<input type = "hidden" name = "projectId" value = "${e}">
			<div class = "gridHolderModified2">
				${createTextInput("Title","projectFormTitle",t)}
				${createTextInput("Link","projectFormLink",n)}
			</div>
				${createTextarea("Project Description","descriptioon",o)}
		</form>
	</div>
`}function createEditProjectForm(e){return createProjectForm(projectId=e.id,title=e.project_name,description=e.description,link=e.link)}function createAddNewProjectForm(){return createProjectForm()}function displayEditProjectForm(e){displayPrompt("Edit Project",createEditProjectForm(e),`handleEditProjectSubmit('${e.divId}')`)}function displayAddNewProjectForm(){displayPrompt("Add New Project",createAddNewProjectForm(),"handleAddNewProjectSubmit()")}function handleAddNewProjectSubmit(){handleAddNew("projectForm","projects_"+LOGIN_NAME,displayEachProject,siteName+"/php/profile/create/project.php","project")}function handleEditProjectSubmit(e){handleEdits("projectForm",e,displayEachProject,siteName+"/php/profile/edit/project.php")}function createEditPersonalForm(e){return`
	<div>
		<form id = "editPersonalForm" method = "POST">
			<div class = "gridHolderModified2">
				${createTextInput("Name","editPersonalName",e.name)}
				${createTextInput("Email","editPersonalEmail",e.email)}
				${createTextInput("Phone","editPersonalPhone",e.phone)}
				${createTextInput("Website","editPersonalWebsite",e.website)}
			</div>
			<div class = "mt-2">
				<label for = "editPersonalSummary">
					Summary <small> (Not more than 3 lines) </small>
				</label>
				<textarea w-100 id = "editPersonalSummary" name = "editPersonalSummary">${e.summary}</textarea>
			</div>
		</form>
	</div>

`}function displayEditPersonalForm(e){displayPrompt("Edit Personal Info",createEditPersonalForm(e),`handleEditPersonalSubmit('${e.divId}')`)}function handleEditPersonalSubmit(e){handleEdits("editPersonalForm",e,displayPersonal,siteName+"/php/profile/edit/personal.php")}function createTextarea(e,t,o){return`
		<div class = "mt-2">
			<label>
				${e}
			</label>
			<textarea class = 'w-100' name = "${t}">${o}</textarea>
		</div>
	`}function createInput(e,t,o,n,i=!1,a="",r=""){return`
		<div id = "${a}_holder" >
			<label>
				${t}
			</label>
			<input type="${e}"  name="${o}" value="${n}" 
				 id = "${a}" ${i?"disabled":""} onchange = "${r}">
		</div>
	`}function createTextInput(e,t,o){return createInput(type="text",e,t,o)}function createCheckbox(e,t,o,n=!1,i=""){return`
	<div id = "${t}_holder">
		<label for = "${t}">${e}</label>
		<input style  ="font-size:20px" onchange = "${i}" type = "checkbox" id ="${t}" name = "${o}"  ${n?"checked":""}>
	</div>
`}function createDateInput(e,t,o,n=!1,i="",a=""){o=isNaN(new Date(o).getTime())?"":o;return createInput(type="date",e,t,o,n,i,a)}function createExperienceForm(e="",t="",o="",n="",i="",a="",r=!1){return`
	<div>
		<form id = "experienceForm" method = "POST">

			<input type = "hidden" name = "id" value = "${e}">


			<div class = "gridHolderModified2">
				${createTextInput("Position","experienceFormPosition",t)}
				${createTextInput("Company","experienceFormCompany",o)}
			</div>
			
			${createTextarea("Task Description (optional) ","experienceFormTaskDescription",n)}
			
			<div class = "gridHolderModified2">
				${createDateInput("From","experienceFormFrom",i)}
				
				${createCheckbox("Currently Working Here","experienceFormCb","experienceFormCb",checkedStatus=r,onchangeCallback="handleExperienceFormCbChange()")}
				
				${createDateInput("To","experienceFormTo",a,disabled=r,"experienceFormTo",onchangeCallback="handleExperienceFormToChange()")}
			
			</div>

		</form>
	</div>
`}function createEditExperienceForm(e){return createExperienceForm(experienceId=e.id,position=e.position,company=e.company,taskDescription=e.description,from=e._from,to=e._to,currentlyWorkingHere="Present"==e._to)}function createAddNewExperienceForm(){return createExperienceForm()}function displayEditExperienceForm(e){displayPrompt("Edit Experience",createEditExperienceForm(e),`handleEditExperienceSubmit('${e.divId}')`)}function displayAddNewExperienceForm(){displayPrompt("Add New Experience",createAddNewExperienceForm(),"handleAddNewExperienceSubmit()")}function handleEdits(e,t,o,n){var e=new FormData(document.getElementById(e)),i=new XMLHttpRequest,a=document.getElementById(t);a.classList.add("fadeOutAnimation"),i.onreadystatechange=function(){var e;4==this.readyState&&200==this.status&&(e=JSON.parse(this.responseText),a.classList.remove("fadeOutAnimation"),e.error?alert("Error - "+e.error):a.innerHTML=o(e))},i.open("POST",n),i.send(e),hideOverlay()}function handleAddNew(e,t,o,n,i){var e=new FormData(document.getElementById(e)),a=document.getElementById("overlayFooterAction"),r=(a.classList.add("fadeOutAnimation"),new XMLHttpRequest),d=document.getElementById(t);r.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var t=JSON.parse(this.responseText);if(t.error)alert("Error - "+t.error),a.classList.remove("fadeOutAnimation");else{hideOverlay();let e=document.createElement("div");e.className="jobMainInfoClone",e.id=i+"_"+t.login_name+"_"+t.id,e.classList.add("scaleUpAnimation"),e.innerHTML=o(t),d.appendChild(e),setTimeout(()=>{e.classList.remove("scaleUpAnimation")},1e3)}}},r.open("POST",n),r.send(e)}function handleAddNewExperienceSubmit(){handleAddNew("experienceForm","experiences_"+LOGIN_NAME,displayEachExperience,siteName+"/php/profile/create/experience.php","experience")}function handleEditExperienceSubmit(e){handleEdits("experienceForm",e,displayEachExperience,siteName+"/php/profile/edit/experience.php")}function handleExperienceFormCbChange(){document.getElementById("experienceFormCb").checked?document.getElementById("experienceFormTo_holder").style.display="none":(document.getElementById("experienceFormTo").disabled=!1,document.getElementById("experienceFormTo_holder").style.display="block")}function handleExperienceFormToChange(){document.getElementById("experienceFormCb_holder").style.display="none"}function createEducationForm(e="",t="",o="",n="",i="",a){return`
	<div>
		<form id = "educationForm" method = "POST">

			<input type = "hidden" name = "educationId" value = "${e}">


			<div class = "gridHolderModified2">

				<div>
					<label>Level</label>
					<select name = "educationFormLevel">
						<option value = 'Intermediate' ${"Intermediate"==t?"selected":""} >Intermediate</option>
						<option value = 'Bachelor' ${"Bachelor"==t?"selected":""} >Bachelor</option>
						<option value = 'Master' ${"Master"==t?"selected":""}>Master</option>
						<option value = 'PhD' ${"PhD"==t?"selected":""}>PhD</option>
					</select>
				</div>

				${createTextInput("Field","educationFormField",o)}
				${createTextInput("Institution","educationFormInstitution",n)}
				${createDateInput("From","educationFormFrom",i)}
				${createDateInput("To","educationFormTo",i)}

			</div>
			
			
			

		</form>
	</div>
`}function createEditEducationForm(e){return createEducationForm(educationId=e.id,level=e.level,field=e.field,institution=e.institution,from=e._from,to=e._to)}function createAddNewEducationForm(){return createEducationForm()}function displayEditEducationForm(e){displayPrompt("Edit Education",createEditEducationForm(e),`handleEditEducationSubmit('${e.divId}')`)}function displayAddNewEducationForm(){displayPrompt("Add New education",createAddNewEducationForm(),"handleAddNewEducationSubmit()")}function handleEditEducationSubmit(e){handleEdits("educationForm",e,displayEachEducation,siteName+"/php/profile/edit/education.php")}function handleAddNewEducationSubmit(){handleAddNew("educationForm","educations_"+LOGIN_NAME,displayEachEducation,siteName+"/php/profile/create/education.php","education")}function deletee(e,t,o=""){hideOverlay();let n=document.getElementById(t);document.getElementById(t).classList.add("fadeOutAnimation");fetch(e).then(e=>e.json()).then(e=>{if(document.getElementById(t).classList.remove("fadeOutAnimation"),e.error)alert(e.error);else{if(""!=o){let e=document.getElementById(o);setTimeout(()=>{e.insertBefore(n,e.firstChild)},1500)}removeDiv(t)}})}function removeDiv(e){let t=document.getElementById(e);t.classList.add("scaleDownAnimation"),setTimeout(()=>{t.remove()},1e3)}function deleteSkill(e){deletee(siteName+"/php/profile/delete.php?table=skills&id="+e,"skill_"+e)}function deleteProject(e){displayPrompt("Delete Project?",`
		
		Are you sure to delete this project info? 
	
	`,`proceedProjectDeletion(${e})`,actionBtnDanger=!0)}function proceedProjectDeletion(e){deletee(siteName+"/php/profile/delete.php?table=projects&id="+e,"project_"+LOGIN_NAME+"_"+e)}function deleteExperience(e){displayPrompt("Delete Experience?",`
		
		Are you sure to delete this experience info? 
	
	`,`proceedExperienceDeletion(${e})`,actionBtnDanger=!0)}function proceedExperienceDeletion(e){deletee(siteName+"/php/profile/delete.php?table=experiences&id="+e,"experience_"+LOGIN_NAME+"_"+e)}function deleteEducation(e){displayPrompt("Delete Education?",`
		
		Are you sure to delete this education info?
	
	`,`proceedEducationDeletion(${e})`,actionBtnDanger=!0)}function proceedEducationDeletion(e){deletee(siteName+"/php/profile/delete.php?table=educations&id="+e,"education_"+LOGIN_NAME+"_"+e)}function loadEachJob(e){execFrontendOnlyFunction(siteName+"/job/"+e.id,createGeneralHdr(e.position),displayJob,data=e)}function isJobPoster(e){return e.job_poster==LOGIN_NAME}function closeJob(e){displayPrompt("Close job?",`
		Job seekers won't see this job post any more. Are you sure to close the job?
	`,`proceedJobClosing(${e})`,!0)}function proceedJobClosing(e){loadPostedJobs();var t=siteName+"/php/jobs/close.php?jobId="+e,o="job_"+e,e=(document.getElementById(o),document.getElementById("applyTo_"+e)),e=(e.classList.add("disabled"),e.innerHTML="Closed",e.onclick=()=>{},siteName+"/jobs/saved/closed"),e="grid_"+e;document.getElementById(e)?deletee(t,o,e):deletee(t,o)}function activateJob(e){VerifyYourEmail(),document.getElementById("applyTo_"+e).style.display="none"}const displayJob=e=>{var t=siteName+"/job/"+e.id,e=`
		<DIV class="jobMainInfoClone">
			<div>
				 
				<div class = "h5">Job Overview </div>

				<div class = "fontSize20"> ${e.position}</div>
				

				<div class = "fontSize17 cursorPointer" onclick = "loadCompanyPage(${e.company_id})" > ${e.company_name}</div>
				<div class = "flex-container">
					<div class = "simpleFlexItem position-relative">${jobTypeFull(e.job_type)}<span class = "smallCircle position-absolute"></span></div>

					<div class = "simpleFlexItem position-relative  ">${jobSiteFull(e.job_site)}<span class = "smallCircle position-absolute"></span></div>
					<div class = "simpleFlexItem position-relative">${e.location}<span class = "smallCircle position-absolute"></span></div>

					<div class = "simpleFlexItem">${e.num_applicants} Applicants</div>

				</div>

			</div>	

			<div class = " mt-2 mb-2 text-center">

				<table class = "simpleTable">
					<tr>
						<td id = "applyTo_${e.id}" 

							class = "btnHighlighted ${IS_LOGGED_IN&&isJobPoster(e)?"btnDangerMyOwn":"btnPrimaryMyOwn"}
									${IS_LOGGED_IN?isJobPoster(e)?"0"!=e.active_status||"0"==e.verified?"":"disabled":hasApplied(e)?"disabled":"":""}
								  "
							onclick = "${IS_LOGGED_IN?isJobPoster(e)?"0"==e.active_status?"0"==e.verified?"activateJob("+e.id+")":"":"closeJob("+e.id+")":hasApplied(e)?"":"applyToJob("+e.id+")":"displayLoginOverlay('Apply', 'apply to jobs')"}"
						>
							${IS_LOGGED_IN?isJobPoster(e)?"0"==e.active_status?"0"==e.verified?"Activate Job":"Closed":"Close Job":hasApplied(e)?"Applied":"Apply":"Apply"}

						</td>
						<td class = "btnBordered" 
						 onclick = "${viewApplicantOnclick(e.job_poster,e.id,e.num_applicants)}"
						 >
							View all Applicants
						</td>
					</tr>
				</table>
			</div>

		</div>
		
		<div class = "mt-3 jobMainInfoClone">
			<div class = "h5">Job Description</div>

			<div>${e.description}</div>
		</div>

	`;document.getElementById(t).innerHTML=e};function applyToJob(e){let t=document.getElementById("applyTo_"+e);t.classList.add("fadeOutAnimation"),t.classList.add("disabled"),fetch(siteName+"/php/jobs/apply.php?id="+e).then(e=>e.json()).then(e=>{e.error?(alert("Error - "+e.error),t.classList.remove("fadeOutAnimation"),t.classList.remove("disabled")):(t.innerHTML="Applied",t.onclick="",t.classList.remove("fadeOutAnimation"))}).catch(e=>alert(e))}function createSubHeaderForSavedJobs(e){return`
	
	<div  class = "stickyLeftOrRight mt-4 mb-4  center-div text-center" style = "top: ${returnTopOfMiddleMainContent()}; z-index:2; max-width:400px; width:100%; margin: 0 auto; ">
		<div  class = "savedJobsSubHdrHolder">
			<table class = "savedJobsSubHdr">
				<tr>
					<td  onclick = "loadAppliedJobs()" class = " ${"applied"===e?"activeSavedJobsSubHdr":""} ${EMPLOYER_MODE?"d-none":""} " >
						Applied
					</td>
					<td onclick = "loadPostedJobs()" class = ${"posted"===e?"activeSavedJobsSubHdr":""} >
						Posted
					</td>
					<td onclick = "loadClosedJobs()" class = ${"closed"===e?"activeSavedJobsSubHdr":""} >
						Closed
					</td>
				</tr>
			</table>
		</div>
	`}function loadSaved(e,t,o=!1){var n=siteName+"/jobs/saved/"+e,i=createHomeHdr(activeTab="applied");loadTab(n,siteName+`/php/jobs/saved/${e}.php`,t,i,o)}function loadAppliedJobs(){loadSaved("applied",displayApplied)}const displaySaved=(e,t,o)=>{var n=document.getElementById(e);n.innerHTML=createSubHeaderForSavedJobs(t),display(o,n,callback=returnEachJob,e)},displayApplied=(e,t)=>{displaySaved(t,"applied",e)};function loadPostedJobs(e=!1){loadSaved("posted",displayPosted,e)}const displayPosted=(e,t)=>{displaySaved(t,"posted",e)};function loadClosedJobs(){loadSaved("closed",displayClosed)}const displayClosed=(e,t)=>{displaySaved(t,"closed",e)},displayHome=(e,t="")=>{var o=document.getElementById(t),n=createProfileSubHeader("Jobs Based On Your Preferences",profileOwnershipRequired=!1,btnText="Edit Filters",callback="displayFilterPrompt()"),i=document.createElement("div");i.innerHTML=n+"<hr>",o.appendChild(i);display(e.filter(e=>"re"!=e.job_site),o,callback=returnEachJob,t);n=document.createElement("div");n.innerHTML=`
	
		<h5 class = "mt-4"> Remote Jobs based on your Location </h4>
		<hr>
	`,o.appendChild(n),display(e.filter(e=>"re"==e.job_site),o,callback=returnEachJob,t)};function loadHome(){var e=siteName+"/",t=createHomeHdr(activeTab="home");loadTab(e,apiFolder+"/home.php",displayHome,t)}function displayAppliedBadge(e){return e.hasOwnProperty("has_applied")&&"true"==e.has_applied?`

				<div class  = "simpleFlexItem position-relative">
					<span class="myOwnBadge">Applied</span>
				</div>
			`:""}function displayPendingBadge(e){return IS_LOGGED_IN&&isJobPoster(e)&&"0"==e.active_status&&"0"==e.verified?`
							<div class  = "simpleFlexItem position-relative">
								<span class="myOwnBadge">Pending</span>
							</div>
						`:""}function hasApplied(e){return"true"==e.has_applied}function jobTypeFull(e){return"fu"==e?"Full-Time":"pa"==e?"Part-Time":"Internship"}function jobSiteFull(e){return"on"==e?"On-Site":"re"==e?"Remote":"Hybrid"}function createJobContent(e){return`
		<div class = "fontSize20"> ${e.position}</div>
		<div class = "fontSize17"> ${e.company_name}</div>
		<div class = "flex-container">
			<div class = "simpleFlexItem position-relative">${jobTypeFull(e.job_type)}<span class = "smallCircle position-absolute"></span></div>

			<div class = "simpleFlexItem position-relative  ">${jobSiteFull(e.job_site)}<span class = "smallCircle position-absolute"></span></div>
			
			<div class = "simpleFlexItem position-relative">${e.location}<span class = "smallCircle position-absolute"></span></div>

			<div class = "simpleFlexItem position-relative">${e.num_applicants} Applicants</div>

			${displayAppliedBadge(e)}
			${displayPendingBadge(e)}

		</div>
		<div class = "spareDiv"></div>
		<div class = "text-center viewApplicantHolder">
			<div class = "simpleButton"
			onclick = "${viewApplicantOnclick(e.job_poster,e.id,e.num_applicants)}"

			>View All Applicants</div>
		</div>

	`}const returnEachJob=e=>{var t=createJobContent(e),o=document.createElement("div");return o.onclick=()=>{loadEachJob(e)},o.className="jobMainInfo",o.id="job_"+e.id,o.innerHTML=t,o};function viewApplicantOnclick(e,t,o){return IS_LOGGED_IN&&LOGIN_NAME==e?`loadScaffold(event, ${t})`:"limitedApplicantsScaffold(event, "+t+", "+o+")"}function loadPostJobForm(){execFrontendOnlyFunction(siteName+"/postJobForm",createHomeHdr(activeTab="jobPostForm"),displayPostJobForm)}const displayPostJobForm=()=>{var e=siteName+"/postJobForm",t=`
<div class = "formHolder" style = "background: var(--bgColorOfCards)">
<h4 class = "text-center" >Post a Job </h4>

<hr>

<p class = "text-warning text-center">
	${IS_LOGGED_IN?HAS_COMPANY_PAGE?"":'<small>You need to </small><span class = "softLink" onclick="loadCreateCompanyPage()">create a company page</span> <small>before you can post jobs</small><HR>':'<small>You need to</small> <span class = "softLink" onclick="loadCreateCompanyPage()">create a company page</span> <small>before you can post jobs</small><HR>'}
</p>

<p class = "text-center">
	${EMPLOYER_MODE?"":'<small>You can switch to </small> <span class="softLink" onclick = "setEmployerMode()">Employer Mode</span><small> for more clean user interface (UI)</small> <HR> '}
</p>

<form id = "postJobForm" method = "POST">

	<div id = "postJobForm_step_1" class = "animationSlideRight">

		<div class = "gridHolder" >
			
			<div>
				<label for = "position"> Position </label>
				<input required  name = "jobPostJobPosition" id = "position" >
			</div>
			

			
				
			<div id = "companyHolderInPostJobForm" style = "position:relative">
				<label for = "companyNameInput">Company Name</label>
				<input onkeyup = "handleCompanyInputInPostJobForm()" 
				 required name = "jobPostCompanyName" 
				 placeholder = "search"
				 id = "companyNameInputInJobPost">
				<div id = "companyNameAutocomplete" class = "locatioNameAutoComplete"
					style = "position:absolute">
						<p class = "text-center">Enter Company Name</p>

					</div>
			</div>

			<input type = "hidden" value = "" id= "hiddenCompanyWebsite"
			 name = "hiddenCompanyWebsite">

			<div id = "locationHolder" style = "position:relative">
				<label for = "locationNameInputPostJobForm">Location</label>
				<input required type="text"
						name = "jobPostLocation"
						placeholder = "search" 
						id = "locationNameInputPostJobForm"
						onkeyup = "handleLocationInputInPostJobForm()">
				<div id="locatioNameAutoComplete" 
				style = "position:absolute" 
				class = "locatioNameAutoComplete">
					<p class = "text-center">Enter Location</p>
				</div> 
			</div> 

		

			<div>
				<label for="jobPostJobType">Select Job Type</label>
				<select name = "jobPostJobType" required id="jobPostJobType">
				    <option value="fu">Full Time</option>
				    <option value="pa">Part Time</option>
				    <option value="in">Internship</option>
				</select>
			</div>



		</div>

	</div>

	<div id = 'postJobForm_step_2' class = "animationSlideRight">
		<div class = "gridHolderModified2">
			<div>
				<label for="jobPostJobSite">Select Job Site</label>
				<select required  id="jobPostJobSite" name = 'jobPostJobSite'>
				    <option value="on">On-Site</option>
				    <option value="re">Remote</option>
				    <option value="hy">Hybrid</option>
				</select>
			</div>


			<div>
				<label for="jobPostJobIndustry">Select Job Industry</label>
				<select required name = "jobPostJobIndustry" id="jobPostJobIndustry">
				    <option value="so">Software</option>
				    <option value="ne">Networking and Hardware</option>
				    <option value="hu">Human Resources</option>
				    <option value="te">Teacher / Instructer</option>
				</select>
			</div>
		</div>	

		<div class = "mt-3">
			<label for = "jobPostJobDescription"> Job Description </label>
			<textarea required rows = "8" 
			name = "jobPostJobDescription"
			style = "width:100%" id = "jobPostJobDescription" name="jobDescription"></textarea>
		</div>

	</div>


	<div id = "postJobForm_step_3" class = "animationSlideRight">
		<div>
			<label for = "postJobFormEmployeeEmail"> Enter your email provided by this
			company to you
			</label>
			<input class = "mt-3" type = "mail" 
			for = "postJobFormEmployeeEmail" name = "postJobFormEmployeeEmail">
		</div>
	</div>


</form>
	<hr>
	<div class = 'mt-3' style = "font-weight:bold" id = 'controlHolder'>
		<div class = "text-center">
			<button onclick = "loadSubTab(2)" 
			class = "btn btn-primary" id = "controlButton">
				Continue
			</button>
		</div>
	</div>
</div>
`;document.getElementById(e).innerHTML=t,loadSubTab(1)};function VerifyYourEmail(e=!1){displayPrompt("Enter Verification Code",`

		${e?'<div class = "text-center text-danger h5"> Invalid code. Enter it again </div> ':'<div class = "text-danger text-center" style = "font-weight:bold"> The job was posted successfully, but it remains inactive unless you verify your email.</div> Verification code has been sent to the email you provided before. It may take up to 5 minutes to receive an email. <br>Don\'t forget to give a look at the spam folder.'}
		
		<div class = "mt-2">
			<form>
				<label for = 'verifyYourEmailBeforePostingJob'>Enter the Code</label>
				<input id = "verifyYourEmailBeforePostingJob" type = "text" placeholder = "Enter code" name = "verifyYourEmailBeforePostingJob">
			</form>
		</div>
	`,"proceedJobUploadVerifyCode()")}function proceedJobUploadVerifyCode(){var e=document.getElementById("verifyYourEmailBeforePostingJob").value;0!=e.trim().length&&(hideOverlay(),displayPromptWithoutFooterOptions("Please Wait...",`
		<div>
				Please wait while we check the code you sent. Your job post will
				be activated if the code is correct.
				<br>
		</div>

	`),fetch(siteName+"/php/jobs/verify.php?token="+e).then(e=>e.json()).then(e=>{hideOverlay(),e.error?VerifyYourEmail(error=!0):displayPromptWithoutFooterOptions("Success!",`
				<div class = "h5">Job Posted Successfully!</div>
				<span class ="softLink" onclick = "hideOverlay(); loadPostedJobs(true)" >
					Click Here
				</span> to view the posted jobs
				<br><br>
			`)}))}function handleJobUpload(){displayPrompt(title="Verify Job Data",`Are you sure that the data is valid? Click 
					on cancel if you are unsure, otherwise click continue
				to confirm and post the new job.`,callback="uploadJob()")}function uploadJob(){hideOverlay();var e=document.getElementById("postJobForm"),e=new FormData(e),t=(document.getElementById("controlHolder").style.display="none",displayPromptWithoutFooterOptions("Please Wait...","Please wait while we process your data<br><br>"),new XMLHttpRequest);t.onreadystatechange=function(){var e;4==this.readyState&&200==this.status&&(console.log(this.responseText),hideOverlay(),(e=JSON.parse(this.responseText)).error?(alert(e.error),document.getElementById("controlHolder").style.display="block"):e.jobPosted&&VerifyYourEmail())},t.open("POST",siteName+"/php/jobs/post.php"),t.send(e)}function loadSubTab(e){for(var t=1;t<=3;t++)document.getElementById("postJobForm_step_"+t).style.display="none";document.getElementById("postJobForm_step_"+e).style.display="block";e=`
		<table class = "w-100">
			<tr>
				<td style = "text-align:center" >
					<button class = "btn btn-primary" 
						onclick = "loadSubTab(${e-1})" style = "${1==e?"":"font-weight: bold"}" title = "Step ${e-1}" ${1==e?"disabled":""}
					>
						Previous Step
					</button>
				</td>
				<td style = "text-align:center">
					<button style = "font-weight:bold" class = "btn btn-primary"  title = "Step ${e+1}"
						onclick = "${3==e?"handleJobUpload()":"loadSubTab("+(e+1)+")"}"		
					>
						Next Step
					</button>
				</td>
			</tr>
		</table>

	`;document.getElementById("controlHolder").innerHTML=e}async function handleLocationInputInPostJobForm(){handleLocationInput("locationNameInputPostJobForm","locatioNameAutoComplete",`https://api.geoapify.com/v1/geocode/autocomplete?text=${document.getElementById("locationNameInputPostJobForm").value.trim()}&apiKey=8a4e247166574725a8de05e06f3c9d74`)}function updateCompanyNameInputField(e){document.getElementById("companyNameInputInJobPost").value=e.company_name,document.getElementById("hiddenCompanyWebsite").value=e.company_website}function companyNameSuggestions(e){var t="";if(0<e.length){for(var o=0;o<e.length;o++)t+=`<li onclick = 'updateCompanyNameInputField( ${JSON.stringify(e[o])} )' title = "${e[o].company_name}"  class = "option p-2"> ${e[o].company_name}  </li>`;return t}return'<p class = "text-center">No suggestions</p>'}async function handleCompanyInputInPostJobForm(){var e=document.getElementById("companyNameInputInJobPost").value;2<=e.trim().length?(document.getElementById("companyNameAutocomplete").innerHTML='<p class="text-center">Loading</p>',fetch("php/companyPage/suggestions.php?incompleteName="+e).then(e=>e.json()).then(e=>{document.getElementById("companyNameAutocomplete").innerHTML=companyNameSuggestions(e)})):document.getElementById("companyNameAutocomplete").innerHTML='<p class ="text-center">Enter Company Name</p>'}function loadJobsByCategory(e){var t=siteName+"/jobs/category/"+e,o=createGeneralHdr("Jobs by Category - "+e);loadTab(t,siteName+"/php/jobs/category.php?category="+e,displayJobsByCategory,o)}const displayJobsByCategory=(e,t)=>{display(e,document.getElementById(t),callback=returnEachJob,t)};function loadScaffold(e,t,o=1,n="push"){e.stopPropagation();var e=siteName+"/applicants/scaffold?jobId="+t+"&page="+o,i=createGeneralHdr("Viewing unfiltered Applicants ");loadTab(e,siteName+"/php/jobs/applicants/scaffold.php?jobId="+t+"&page="+o,displayScaffold,i,hardRefresh=!1,n)}function loadShortListed(e,t=1,o="push"){var n=siteName+"/applicants/shortlisted?jobId="+e+"&page="+t,i=createGeneralHdr("Viewing Shortlisted Applicants");loadTab(n,siteName+"/php/jobs/applicants/shortlisted.php?jobId="+e+"&page="+t,displayShortListed,i,hardRefresh=!1,o)}function loadRejected(e,t=1,o="push"){var n=siteName+"/applicants/rejected?jobId="+e+"&page="+t,i=createGeneralHdr("Viewing Rejected Applicants");loadTab(n,siteName+"/php/jobs/applicants/rejected.php?jobId="+e+"&page="+t,displayRejected,i,hardRefresh=!1,o)}function createSubHeaderForScaffold(e,t){return`
	
	<div  class = "stickyLeftOrRight mt-4 mb-4  center-div text-center" style = "top: ${returnTopOfMiddleMainContent()}; z-index:2; max-width:400px; width:100%; margin: 0 auto; ">
		<div  class = "savedJobsSubHdrHolder">
			<table class = "savedJobsSubHdr">
				<tr>
					<td  onclick = "loadScaffold(event, ${t}, 1, 'replace' )" class = "${"all"===e?"activeSavedJobsSubHdr":""}  " >
						Unfiltered
					</td>
					<td onclick = "loadShortListed(${t}, 1, 'replace')" class = ${"shortlisted"===e?"activeSavedJobsSubHdr":""} >
						Shortlisted
					</td>
					<td onclick = "loadRejected(${t}, 1, 'replace')" class = ${"rejected"===e?"activeSavedJobsSubHdr":""} >
						Rejected
					</td>
				</tr>
			</table>
		</div>
	`}function eachApplicantWithOptions(e,t,o,n,i){return`
		<div id = "applicant_${i}" onclick = "${t}" class = "jobMainInfo p-3">
			<div class = "flex-container align-items-center">
				<div>
					<i class = "fa fa-user-circle fa-2x"></i>
				</div>
				<div style="margin-left:10px">
					${e}
				</div>
				<div class = "flex-container  applicantOptions justfy-content-end">
					<div title="ShortList" onclick= "${o}" class = "successIcon">
						<i class = "fa fa-check"></i>
					</div>
					<div title="Reject" class="dangerIcon" onclick="${n}">
						<i class = "fa fa-trash"></i>
					</div>
				</div>
			</div>	

		</div>
	`}function shortList(e,t,o,n){e.stopPropagation(),deletee(siteName+"/php/jobs/applicants/action/shortlist.php?loginName="+t+"&jobId="+o,divId="applicant_"+n)}function reject(e,t,o,n){e.stopPropagation(),deletee(siteName+"/php/jobs/applicants/action/reject.php?loginName="+t+"&jobId="+o,divId="applicant_"+n)}function createEachLink(e,t,o){return`
		<div   onclick = "${e!=o?t+e+", 'refresh')":""}" class = "nav-flex-item ${e==o?"activeNavLink":""} ">
			${e}
		</div>
	`}function createNavLinks(e,t,o){for(var n=Math.ceil(10),i=document.createElement("div"),a="",r=1;r<=n;r++)a+=createEachLink(r,t,o);return i.innerHTML=`
		<div  class  = "mt-4 justify-content-center flex-container navLinksHolder">
			${a}
		</div>
	`,i}const displayApplicants=(e,t,o)=>{var n=e.applicants,i="",a=document.createElement("div");a.className="gridHolderModified",a.id="grid_all_"+t;for(var r=0;r<n.length;r++)i+=eachApplicantWithOptions("@"+n[r].login_name,`loadViewProfile( '${n[r].login_name}', jobId = ${e.jobId})`,`shortList(event, '${n[r].login_name}', ${e.jobId}, ${n[r].id})`,`reject(event, '${n[r].login_name}', ${e.jobId}, ${n[r].id})`,n[r].id);if(a.innerHTML=i,document.getElementById(t).innerHTML=createSubHeaderForScaffold(o,e.jobId),document.getElementById(t).appendChild(a),0<parseInt(e.numApplicants)){switch(o){case"all":var d=`loadScaffold(event, ${parseInt(e.jobId)},`;break;case"shortlisted":d=`loadShortListed(${parseInt(e.jobId)},`;break;case"rejected":d=`loadRejected(${parseInt(e.jobId)},`}a=createNavLinks(parseInt(e.numApplicants),d,activeLink=parseInt(e.page)+1);document.getElementById(t).appendChild(a)}},displayScaffold=(e,t)=>{displayApplicants(e,t,"all")},displayShortListed=(e,t)=>{displayApplicants(e,t,"shortlisted")},displayRejected=(e,t)=>{displayApplicants(e,t,"rejected")};function loadLimitedContentOfApplicants(e,t,o){var n=siteName+`/jobs/${o}/limited/`+e,e=createGeneralHdr("Applicant #"+e);loadTab(n,siteName+"/php/profile/limitedView.php?jobId="+o+"&preLimit="+t,displayLimitedView,e)}const displayLimitedView=(e,t)=>{window.VIEWING_PROFILE_OF="DSFSDFAFAFDASFAFDSFFSDFSF";var o="";o+=displayExperiences(e.experiences)+displaySkills(e.skills)+displayProjects(e.projects)+displayEducations(e.educations),document.getElementById(t).innerHTML=o};function limitedApplicantsScaffold(e,t,o){e.stopPropagation(),execFrontendOnlyFunction(siteName+"/job/"+t+"/applicants/scaffold",createGeneralHdr("View Applicants"),displayLimitedApplicantScaffold,data=[t,o])}function eachApplicant(e,t){return`
		<div onclick = "${t}" class = "jobMainInfo p-3">
			<div class = "flex-container align-items-center">
				<div>
					<i class = "fa fa-user-circle fa-2x"></i>
				</div>
				<div style="margin-left:10px">
					${e}
				</div>
			</div>
		</div>
	`}const displayLimitedApplicantScaffold=([e,t])=>{for(var o=siteName+"/job/"+e+"/applicants/scaffold",n='<div class = "gridHolderModified2">',i=0,a=t;t-10<a&&0<a;a--)n+=eachApplicant("Applicant #"+a,`loadLimitedContentOfApplicants(${a}, ${i}, ${e})`),i++;document.getElementById(o).innerHTML=n};var menuShown=!0;function toggleMenuInDesktop(){document.getElementById("menuItems").style.display=1==menuShown?"none":"block",menuShown=!menuShown}function logOut(){location.href=siteName+"/php/auth/logOut.php"}function createOverlayHeader(e){return`
		<div class = "overlayHeader">
			<table class = "fixedTable mt-2 mb-2">
				<tr>
					<td class = "h4">
						${e}
					</td>
					<th class = "cursorPointer" 
					 onclick = "hideOverlay()" style = "width:50px;text-align:center">
						<i class = "fa fa-close fa-2x"></i>
					</th>
				</tr>
			</table>
		</div>
	`}function createLoginAlertForm(e,t){return`
	
		${createOverlayHeader(e)}

		<hr>
		<div style = "font-size:17px">
			You need to login to ${t}. Create new account if you 
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
	
`}function performOperationsOnBody(){document.body.style.overflowY="hidden"}function createOverlayAndInsert(e){var t=document.createElement("div");t.innerHTML=`
	<div id = "outerOverlay" class  = "outerOverlay">
		<div class = "overlay" id = "overlay">
			${e}
		</div>
	</div>
`,document.body.appendChild(t)}function displayLoginOverlay(e,t){performOperationsOnBody(),createOverlayAndInsert(createLoginAlertForm(e,t))}function createOverlayFooterOptions(e,t){return`
		<div class = "mt-2 mb-2">
			<table class = "simpleTable">
				<tr>
					<td class = "btnBordered" onclick = "hideOverlay()">
						Cancel
					</td>
					<td id = 'overlayFooterAction' class = "btnHighlighted ${t?"btnDangerMyOwn":"btnSuccessMyOwn"} " 
						onclick = "${e}" >
						Continue
					</td>
				</tr>
			</table>
		</div>
	`}function createPrompt(e,t,o,n){return`
	${createOverlayHeader(e)}

	<hr>

	<div>
		${t}			
	</div>

	${createOverlayFooterOptions(o,n)}
`}function displayPrompt(e,t,o,n=!1){performOperationsOnBody(),createOverlayAndInsert(createPrompt(e,t,o,n))}function getPartOfDay(){var e=(new Date).getHours();return 5<=e&&e<12?"Morning":12<=e&&e<18?"Afternoon":"Evening"}function createPromptWithoutFooterOptions(e,t){return`
	${createOverlayHeader(e)}

	<hr>

	<div>
		${t}			
	</div>

`}function displayPromptWithoutFooterOptions(e,t){performOperationsOnBody(),createOverlayAndInsert(createPromptWithoutFooterOptions(e,t))}function putTextInInputField(e,t,o=""){document.getElementById(e).value=t,""!=o&&o()}function escapeSingleQuotes(e){return e.replace(/'/g,"\\'")}function returnList(e,t,o=""){var n="";if(0<t.length){for(var i=0;i<t.length;i++)n+=`<li onclick = 'putTextInInputField("${e}", "${escapeSingleQuotes(t[i])}", ${o})' title = "${t[i]}"  class = "option p-2"> ${t[i]}  </li>`;return n}return'<p class = "text-center">No suggestions</p>'}async function handleLocationInput(e,t,o){t=document.getElementById(t);2<document.getElementById(e).value.trim().length?(t.innerHTML='<p class="text-center">Loading</p>',o=(await(await fetch(o)).json()).features.map(e=>e.properties.formatted),t.innerHTML=returnList(e,o)):t.innerHTML='<p class = "text-center">Enter Location</p>'}function deperformOperationsOnBody(){document.body.style.overflowY="scroll",document.getElementById("outerOverlay")&&document.getElementById("outerOverlay").remove()}function hideOverlay(){deperformOperationsOnBody()}function deactivateButton(e,t){document.getElementById(e).disabled=!0,document.getElementById(e).innerText=t}function activateButton(e,t){document.getElementById(e).disabled=!1,document.getElementById(e).innerText=t}function getCookieValue(e){for(var t=e+"=",o=decodeURIComponent(document.cookie).split(";"),n=0;n<o.length;n++){for(var i=o[n];" "===i.charAt(0);)i=i.substring(1);if(0===i.indexOf(t))return i.substring(t.length,i.length)}return""}function deleteThisDiv(e){var t=document.getElementById(e),t=(t&&t.remove(),document.createElement("div"));t.id=e,middleMainContent.appendChild(t)}function hideAllDivsExceptDivWithThis(e){for(var t=middleMainContent.children,o=t.length-1;0<=o;o--)t[o].style.display="none";document.getElementById(e).style.display="block"}function refresh(e,t,o){let n=e;deleteThisDiv(e);var i=document.createElement("div");i.id=n+"_loadingSign",i.innerHTML=createLoadingSign(""),document.getElementById(n).appendChild(i),hideAllDivsExceptDivWithThis(e),currentlyBeingLoadedURLs.push(e),fetch(t).then(function(e){return e.json()}).then(function(e){document.getElementById(n+"_loadingSign").remove(),currentlyBeingLoadedURLs=currentlyBeingLoadedURLs.filter(e=>e!=n),o(e,n)})}function beforeLoadTab(e,t,o,n){clearHdrAndPut(t),locationToHdrMapper[e]=t,loadTab(e,o,n)}function loadTab(e,t,o,n="",i=!1,a="push"){clearHdrAndPut(n),locationToHdrMapper[e]=n,currentlyBeingLoadedURLs.includes(e)||(document.location==e||(pushOrReplace(e,a),!document.getElementById(e))||i?refresh(e,t,o):hideAllDivsExceptDivWithThis(e))}function display(e,t,o,n=""){if(0<e.length){var i=document.createElement("div");i.className="gridHolderModified2",i.id="grid_"+n,t.appendChild(i);for(var a=0;a<e.length;a++)i.appendChild(o(e[a]))}}function noOfElementPerRow(){var e=middleMainContent.clientWidth;return e<=470?1:e<=700?2:3}function pushOrReplace(e,t="push"){"push"==t?history.pushState({},"",e):history.replaceState({},"",e)}function execFrontendOnlyFunction(e,t,o,n="",i="push"){clearHdrAndPut(t),locationToHdrMapper[e]=t,window.location!=e&&pushOrReplace(e,i),document.getElementById(e)?hideAllDivsExceptDivWithThis(e):(deleteThisDiv(e),hideAllDivsExceptDivWithThis(e),o(n))}window.onpopstate=e=>{clearHdrAndPut(locationToHdrMapper[document.location]),hideAllDivsExceptDivWithThis(document.location)};const createHomeHdr=e=>{var t=document.createElement("table"),o=(t.className="hdrTable homeHdr ",document.createElement("tr")),n=document.createElement("td"),i=("home"==e&&(n.className="activeTab "),n.onclick=()=>loadHome(),n.innerHTML="<i class = 'fa fa-home'> </i> <br> <small>Home</small> ",EMPLOYER_MODE&&n.classList.add("d-none"),document.createElement("td")),a=(i.className="requiresLogin","noti"==e&&(i.className="activeTab"),i.onclick=()=>IS_LOGGED_IN?loadNoti():displayLoginOverlay("Notifications","view notifications."),i.innerHTML="<i class = 'fa fa-bell'> </i> <br> <small>Notifications</small> ",document.createElement("td")),r=(a.className="requiresLogin","applied"==e&&(a.className="activeTab"),a.onclick=()=>IS_LOGGED_IN?(EMPLOYER_MODE?loadPostedJobs:loadAppliedJobs)():displayLoginOverlay("Saved Jobs","view applied and posted jobs"),a.innerHTML="<i class = 'fa fa-bookmark'> </i> <br> <small>Saved Jobs</small> ",document.createElement("td")),d=(r.onclick=()=>loadSearchBox(),r.innerHTML="<i class ='fa fa-search'> </i> <br> <small>Search</small>  ",EMPLOYER_MODE&&r.classList.add("d-none"),document.createElement("td")),l=(d.className="d-none d-md-block","jobPostForm"==e&&(d.className="activeTab"),d.onclick=()=>loadPostJobForm(),d.innerHTML="<i class ='fa fa-suitcase'> </i> <br> <small>Post Job</small>  ",document.createElement("td"));return l.className="d-xs-block d-sm-block d-md-none",l.onclick=()=>loadMenu(),l.innerHTML="<i class ='fa fa-bars'> </i> <br> <small>Menu</small>  ","menu"==e&&(l.className="activeTab"),o.appendChild(n),o.appendChild(a),o.appendChild(d),o.appendChild(i),o.appendChild(r),o.appendChild(l),t.appendChild(o),t};function createGeneralHdr(e){var t=document.createElement("table"),o=(t.className="generalHdrTable",document.createElement("tr")),n=createBackButton(),i=document.createElement("th");return i.innerText=e,o.appendChild(n),o.appendChild(i),o.appendChild(createHomeButton()),t.appendChild(o),t}function createHomeButton(){var e=document.createElement("td"),t=(e.className="text-center",document.createElement("button"));return t.className="btn btn-primary",t.innerHTML="<i class = 'fas fa-home'></i>",e.appendChild(t),e.onclick=()=>loadHome(),e}function clearHdrAndPut(e){var t=document.getElementById("middlePartOfHdr");t.innerHTML="",t.appendChild(e)}const siteName="http://mydj.great-site.net",apiFolder="php";var loadedURLs=[],currentlyBeingLoadedURLs=[],middleMainContent=document.getElementById("middleMainContent"),locationToHdrMapper={},dark=0;const root=document.documentElement;function toggle(){0==dark?(dark=1,root.style.setProperty("--border","1px solid rgba(255, 255, 255, 0.7"),root.style.setProperty("--bgColorOfCards","black"),root.style.setProperty("--bgColorOfBody","rgba(0, 0, 0, 0.85)"),root.style.setProperty("--colorOfBody","white"),root.style.setProperty("--fontSize17Color","lightgreen"),root.style.setProperty("--fontSize20Color","yellow"),root.style.setProperty("--divBackground","rgba(255, 255, 255, 0.2"),root.style.setProperty("--boxShadow","0px 10px 20px rgba(255, 255, 255, 0.3)")):(dark=0,root.style.setProperty("--border","1px solid rgba(0, 0, 0, 0.2"),root.style.setProperty("--bgColorOfCards","white"),root.style.setProperty("--bgColorOfBody","#f2f2f2"),root.style.setProperty("--colorOfBody","black"),root.style.setProperty("--fontSize17Color","green"),root.style.setProperty("--fontSize20Color","green"),root.style.setProperty("--divBackground","rgba(0, 0, 0, 0.05"),root.style.setProperty("--boxShadow","0px 10px 20px rgba(0, 0, 0, 0.3)"))}function promptToActivate(){return`

<div class = "text-danger text-center" style = 'font-weight:bold' >

	You can't post the jobs unless you verify the email of company and activate the page.
	<br>
	<button onclick = "activateCompanyPage()"
			class = " mt-2 btn btn-primary">
		Activate Now
	</button>

</div>


`}function createCompanySubHeader(e,t,o){return`
	<div  class = "stickyLeftOrRight mt-4 mb-4  center-div text-center" style = "top: ${returnTopOfMiddleMainContent()}; z-index:2; max-width:400px; width:100%; margin: 0 auto; ">
		<div  class = "savedJobsSubHdrHolder">
			<table class = "savedJobsSubHdr">
				<tr>
					<td  onclick = "${t}" class = "${"about"===e?"activeSavedJobsSubHdr":""}  " >
						About Company
					</td>
					<td onclick = "${o}" class = ${"jobs"===e?"activeSavedJobsSubHdr":""} >
						Jobs Posted
					</td>
				</tr>
			</table>
		</div>
	</div>

	`}function editCompanyPageForm(e){displayPrompt("Edit Company Info",`

	<div>
		<form id = "editCompanyForm" method = "POST">
			<div class = "gridHolder">
				${createTextInput("Name","companyName",e.company_name)}
				${createTextInput("Location","companyLocation",e.company_location)}
				${createTextInput("Phone","companyPhone",e.contact_number)}
			</div>
			<div class = "mt-2">
				${createTextarea("About ","companyAbout",e.company_about)}
			</div>
		</form>
	</div>
	
`,`handleEditCompanySubmit(${e.id})`)}function handleEditCompanySubmit(t){var e=new FormData(document.getElementById("editCompanyForm")),o=new XMLHttpRequest,n=document.getElementById("editCompanyForm"),i=(n.classList.add("fadeOutAnimation"),siteName+"/php/companyPage/edit.php");o.onreadystatechange=function(){var e;4==this.readyState&&200==this.status&&(e=JSON.parse(this.responseText),console.log(e),n.classList.remove("fadeOutAnimation"),e.error?alert("Error - "+e.error):(hideOverlay(),loadCompanyPage(t)))},o.open("POST",i),o.send(e)}function companyPageHeader(e,t="about"){return`
	

	${createCompanySubHeader(t,"loadCompanyPage("+e.id+")","loadCompanyJobs("+e.id+")")}

	<hr>

	${IS_LOGGED_IN&&LOGIN_NAME==e.creator&&0==e.active_status?promptToActivate():""}

 `}function createCompanyView(e){return`

	${companyPageHeader(e)}


	${IS_LOGGED_IN&&e.creator==LOGIN_NAME?createProfileSubHeader(e.company_name,profileOwnershipRequired=!1,btnText="Edit",callback="editCompanyPageForm("+JSON.stringify(e)+")"):'<div class = "mt-3"><h4>'+e.company_name+"</h4></div>"}

	<div>
		
		<div> <strong> Location: </strong> ${e.company_location} </div>
		<div> <strong> Website: </strong> ${e.company_website} </div>		
		<div> <strong> Email: </strong> ${e.company_email} </div>
		<div> <strong> Phone: </strong> ${e.contact_number} </div>
		<div> <strong> Category: </strong> ${e.category} </div>
		<div class = "mt-3"> <strong> Description</strong> <div> ${e.company_about} </div> </div>
	
	</div>

`}const displayCompanyPage=(e,t="")=>{(t=document.getElementById(t)).innerHTML=createCompanyView(e)};function loadCompanyPage(e){var t=siteName+"/companyPage/"+e,o=createHomeHdr(activeTab="ddd");loadTab(t,siteName+"/php/companyPage/view.php?id="+e,displayCompanyPage,o)}function loadCompanyJobs(e){var t=siteName+"/companyPage/"+e+"/jobs",o=createHomeHdr(activeTab="ddd");loadTab(t,siteName+"/php/companyPage/jobs.php?id="+e,displayCompanyJobs,o)}const displayCompanyJobs=(e,t)=>{var o=document.getElementById(t);o.innerHTML=companyPageHeader(e,"jobs"),display(e.jobs,o,callback=returnEachJob,t)},displayCreateCompanyPage=()=>{var e=siteName+"/createCompanyPage";document.getElementById(e).innerHTML=`
	
	<div class = "h5 text-center"> Create Company Page </div>

	<hr>

	<form id = "companyPageForm" method = "POST" >

	<div class = "gridHolder" id="formHolderForCreateCompanyPage">
		
		<div>
			<label for = "companyPageCompanyName"> Company Name </label>
			<input required   name = "companyPageCompanyName" id = "companyPageCompanyName" >
		</div>
		
		<div id = "locationHolderCCA" style = "position:relative">
			<label for = "locationNameInputCCA">Location</label>
			<input required type="text"
			name = "companyPageCompanyLocation" 
					id = "locationNameInputCCA"
					placeholder = "Search"
					onkeyup = "handleLocationInputInCreateCompanyPage()">
			<div id="locatioNameAutoCompleteInCreateCompanyPage" 
			style = "position:absolute" class = "locatioNameAutoComplete"></div> 
		</div> 

		<div>
			<label for = "companyPageCompanyWebsite"> Company Website </label>
			<input required   
			placeholder ="http://abc.com"
			name = "companyPageCompanyWebsite" id = "companyPageCompanyWebsite" >
		</div>

		<div>
			<label for = "companyPageCompanyEmail">Company Email </label>
			
			<input required   name = "companyPageCompanyEmail" id = "companyPageCompanyEmail" >

		</div>

		<div>
			<label for = "companyPageCompanyPhone"> Contact Number </label>
			
			<input required   name = "companyPageCompanyPhone" id = "companyPageCompanyPhone" >

		</div>

		<div>
			<label for="companyPageIndustry">Industry</label>
			<select name = "companyPageIndustry" required  id="companyPageIndustry">

			    <option value="Software">Software</option>
			    <option value="Networking and Hardware">Networking and Hardware</option>
			    <option value="Educational Institution">Educational Institution</option>
				
			</select>
		</div>
	</div>
	<div>
		<label for = "companyPageAboutCompany"> About Company </label>
		<textarea name = "companyPageAboutCompany" 
		required rows = "8" style = "width:100%" 
		id = "companyPageAboutCompany" name="companyPageAboutCompany"></textarea>
	</div>
	
</form>
<div class = "text-center mt-3">
	<button id  = "createCompanyPageButton"
		onclick = " (IS_LOGGED_IN) ? handleCompanyCreation() : displayLoginOverlay('Create Company Page', 'create the company page')"
	 class = "longButton btn btn-primary" 
	 style = "font-weight:bold">
		Create Company Page
	</button>
</div>
`,document.getElementById("formHolderForCreateCompanyPage")};function loadCreateCompanyPage(){execFrontendOnlyFunction(siteName+"/createCompanyPage",createHomeHdr(activeTab="null"),displayCreateCompanyPage)}async function handleLocationInputInCreateCompanyPage(){handleLocationInput("locationNameInputCCA","locatioNameAutoCompleteInCreateCompanyPage",`https://api.geoapify.com/v1/geocode/autocomplete?text=${document.getElementById("locationNameInputCCA").value.trim()}&apiKey=8a4e247166574725a8de05e06f3c9d74`)}function handleCompanyCreation(){displayPrompt(title="Verify Company Data",`Are you sure that the data is valid? Click 
					on cancel if you are unsure, otherwise click continue
				to confirm and create the company page.`,callback="createCompanyPage()")}function createCompanyPage(){hideOverlay(),displayPromptWithoutFooterOptions("Please wait...","Please wait while we process your data.");var e=document.getElementById("companyPageForm"),e=new FormData(e),t=(deactivateButton("createCompanyPageButton","Please Wait..."),new XMLHttpRequest);t.onreadystatechange=function(){var e;4==this.readyState&&200==this.status&&((e=JSON.parse(this.responseText)).error?(alert(e.error),activateButton("createCompanyPageButton","Create Company Page"),hideOverlay()):e.companyPageCreated&&(verifyOfficialCompanyEmail(),document.getElementById("createCompanyPageButton").style.display="none"))},t.open("POST",siteName+"/php/companyPage/create.php"),t.send(e)}function verifyOfficialCompanyEmail(e=!1){hideOverlay(),displayPrompt("Enter Verification Code",`

		${e?'<h4 class = "text-danger">Invalid code. Please enter it again</h4> ':"A verification code has been sent to the company email. It may take up to 5 minutes to receive the email."}

		${e?"":"<p> Don't forget to give a look to the spam page.</p>"}

		
		<div class = "mt-3">
			<form>
				<label>Enter the Code</label>
				<input id = "verifyCompanyEmailBeforeCreatingPage"  
				type = "number">
			</form>
		</div>
	`,"proceedCompanyCreationVerifyCode()")}function activateCompanyPage(){displayPrompt("Enter Verification Code",`

		A verification code has already been sent to the company email you 
		entered while creating the page.
		
		<p>
			Don't forget to give a look at the spam page.
		</p>

		<div class = "mt-3">
			<form>
				<label>Enter the Code</label>
				<input id = "verifyCompanyEmailBeforeCreatingPage"  
				type = "number">
			</form>
		</div>

	

	`,"proceedCompanyCreationVerifyCode()")}function proceedCompanyCreationVerifyCode(){document.getElementById("verifyCompanyEmailBeforeCreatingPage")&&(window.codeEnteredByUser=document.getElementById("verifyCompanyEmailBeforeCreatingPage").value),""==codeEnteredByUser.trim().length?alert("Invalid Code. Enter it again"):(hideOverlay(),displayPromptWithoutFooterOptions("Please Wait...",`
		<div>
				Please wait while we check the code you sent. The company page will
				be activated if the code is correct.
				<br>
		</div>

	`),fetch("php/companyPage/verify.php?code="+codeEnteredByUser).then(e=>e.json()).then(e=>{e.error?verifyOfficialCompanyEmail(error=!0):e.companyPageVerified&&(hideOverlay(),displayPromptWithoutFooterOptions("Success!","You have successfully created a company page. Now jobs can be posted for this compaany"))}).catch(e=>console.log(e)))}function loadRegisterForm(){execFrontendOnlyFunction(siteName+"/register",createHomeHdr(activeTab="ddd"),displayRegisterForm)}function createRegisterForm(){return`
	<div class = "formHolder" style = "background: var(--bgColorOfCards)">
	<h5 class = "text-center">Create New Account</h5>
	<hr>
		<form id = "registerForm" method = "POST">
			<div>
				<label for = "registerName">Name</label>
				<input id = 'registerName'  type = "text" required name = "registerName">
			</div>
			<div class  = "mt-2">
				<label for = "registerLoginName">Login_name</label>
				 ( 
				<small>It is used while logging in the next time.</small>
				 )
				<input id = "registerLoginName"  required type = "text" name = "registerLoginName">
			</div>
			<div class = "mt-2">
				<label for = "registerPassword">Password</label>
				<input  type = "password" id = "registerPassword" required name = "registerPassword">
			</div>
		
			

		</form>


		<div class = 'text-center mt-2'>
				<button onclick = "handleRegister()"  class= "longButton btn mt-2 btn-primary" id = "registerButton">
					Create New Account
				</button>
		</div>

		<div class = "text-center">
			<div class = "mt-2" style = "position:relative">
				<span class =  "orHolder" > Or </span>
			</div>
			<div onclick = "loadLoginForm()">
				<span class = "softLink  ">Login</span>
		</div>
	</div>

	</div>
	`}const displayRegisterForm=()=>{var e=siteName+"/register";document.getElementById(e).innerHTML=createRegisterForm()};function handleRegister(){var e=document.getElementById("registerLoginName").value,t=(document.getElementById("registerButton").disabled=!0,document.getElementById("registerButton").innerHTML="Please Wait...",document.getElementById("registerButton").classList.add("fadeOutAnimation"),document.getElementById("registerPassword").value),o=document.getElementById("registerName").value;fetch(siteName+"/php/auth/register.php?registerLoginName="+e+"&registerPassword="+t+"&registerName="+o).then(e=>e.json()).then(e=>{document.getElementById("registerButton").classList.remove("fadeOutAnimation"),e.error?(alert("error"),document.getElementById("registerButton").disabled=!1,document.getElementById("registerButton").innerHTML="Create New Account"):location.href=siteName}).catch(e=>{document.getElementById("registerButton").disabled=!1,document.getElementById("registerButton").innerHTML="Create New Account",console.log(e)})}function loadLoginForm(){execFrontendOnlyFunction(siteName+"/login",createHomeHdr(activeTab="ddd"),displayLoginForm)}function createLoginForm(){return`
	<div class = "formHolder" style = "background: var(--bgColorOfCards)">
	<h5 class = "text-center">Login to our Website</h5>
	<hr>
		<form id = "loginForm" method = "POST">
			<div>
				<label for = "loginLoginName">Login_name</label>
				<input id = "loginLoginName"  type = "text" required name = "loginLoginName">
			</div>
			<div class = "mt-2">
				<label for = "loginPassword">Password</label>
				<input id = "loginPassword"   type = "password"  required name = "loginPassword">
			</div>


		</form>

		<div class = 'text-center mt-2'>
			<button id = "loginButton" class= "longButton btn mt-2 btn-primary" onclick = "handleLogin()">
				Log In
			</button>
		</div>

		<div class = "text-center">
			<div class = "mt-2" style = "position:relative">
				<span class =  "orHolder" > Or </span>
			</div>
			<div onclick = "loadRegisterForm()">
				<span class = "softLink  ">Create New Account</span>
			</div>
		</div>

	</div>
	`}const displayLoginForm=()=>{var e=siteName+"/login";document.getElementById(e).innerHTML=createLoginForm()};function handleLogin(){var e=document.getElementById("loginLoginName").value,t=document.getElementById("loginPassword").value;document.getElementById("loginButton").disabled=!0,document.getElementById("loginButton").innerText="Please Wait...",document.getElementById("loginButton").classList.add("fadeOutAnimation"),fetch(siteName+"/php/auth/login.php?loginLoginName="+e+"&loginPassword="+t).then(e=>e.json()).then(e=>{document.getElementById("loginButton").classList.remove("fadeOutAnimation"),e.error?(alert("Incorrect username or password!"),document.getElementById("loginButton").disabled=!1,document.getElementById("loginButton").innerText="Log In"):location.href=siteName}).catch(e=>alert(e))}