function setup(){fetch(siteName+"/php/auth/checkLoginStatus.php").then(e=>e.json()).then(e=>{handleCheckLoginStatusData(e)})}function handleCheckLoginStatusData(e){e.isNotLoggedIn?window.IS_LOGGED_IN=!1:(window.IS_LOGGED_IN=!0,window.PROFILE_VISITS_COUNT=e.profileVisitsCount,window.CV_DOWNLOADS_COUNT=e.CVdownloadsCount,window.LOGIN_NAME=e.loginName),document.getElementById("preLoaderHolder").remove(),manageSidebars(),loadHome()}function returnTopOfMiddleMainContent(){return document.getElementById("middleMainContent").getBoundingClientRect().top+5+"px"}function makeSidebarsSticky(){for(var e=document.getElementsByClassName("stickyLeftOrRight"),t=0;t<e.length;t++){var o=returnTopOfMiddleMainContent();e[t].style.top=o}}function manageSidebars(){document.getElementById("hdrLeftPart").innerHTML=handleHdrLeftPart(),document.getElementById("hdrRightPart").innerHTML=handleHdrRightPart(),document.getElementById("leftSidebar").innerHTML=createLeftSidebar(),document.getElementById("rightSidebar").innerHTML=createRightSidebar(),makeSidebarsSticky(),window.middleMainContent=document.getElementById("middleMainContent")}function handleHdrLeftPart(){return`
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

			<div class="animateScaleUP leftSidebarOptionsHolder">
				
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
			<div class="rso  text-center">
				<a href=""> About us </a> 
				<a href=""> Careers </a>  
				<a href=""> Privacy Policy </a>
				<a href=""> Give us Feedback </a>
				<a href=""> Get our App </a>
			</div>
		</div>
	`}function createRightSidebar(){return`
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
				 onclick="loadCreateCompanyPage()"
				>
					<i class="fa fa-plus"></i>Create Company Page
				</li>
				<li class="option" onclick="toggle()">
					<i class="fa fa-moon"></i>Night Mode
				</li>
				<li class="option" onclick="alert('Next time you open this website, you will see your posted jobs instead of home feed.')">
					<i class="fa fa-toggle-off"></i>Employer Mode
				</li>
				<li class = " option ${IS_LOGGED_IN?"":"d-none"}" id="logOutOption" onclick="logOut()">
					<i class="fa fa-sign-out"></i>Log Out
				</li>
			</div>
			<div class = "rightSidebarOptionsHolder">
				<h6>Jobs Categories</h6>
				<a href="">Networking and Hardware</a>
				<br>
				<a href="">Human Resources</a>
				<br>
				<a href="">Software</a>
				<br>
				<a href="">Internships</a>
				<br>
				<a href="">Full Time</a>
				<br>
				<a href="">Part Time</a>
				<br>
				<a href="">Contract</a>
			</div>
		</div>
	`}const displayNoti=(e,t)=>{display(e,document.getElementById(t),callback=returnEachNoti)};function loadNoti(){var e=siteName+"/notifications",t=createHomeHdr(activeTab="noti");clearHdrAndPut(t),locationToHdrMapper[e]=t,loadTab(e,apiFolder+"/notifications.php",displayNoti)}function returnEachNoti(e){var t=document.createElement("div");return t.className="jobMainInfo",t.innerText=e.notification,t}function loadMenu(){execFrontendOnlyFunction(siteName+"/menu",createHomeHdr(activeTab="menu"),displayMenu)}const displayMenu=()=>{var e=siteName+"/menu";document.getElementById(e).innerHTML=document.getElementById("menuItems").innerHTML},displayHome=(e,t=0)=>{display(e,document.getElementById(siteName+"/"),callback=returnEachJob)};function loadHome(){var e=siteName+"/",t=createHomeHdr(activeTab="home");clearHdrAndPut(t),locationToHdrMapper[e]=t,loadTab(e,apiFolder+"/home.php",displayHome,pushOrReplace="replace")}const returnEachJob=e=>{var t=document.createElement("div"),o=(t.className="jobMainInfo",document.createElement("div")),n=(o.innerText=e.position,o.className="fontSize20",document.createElement("div")),e=(n.className="fontSize17",n.innerText=e.company,document.createElement("div")),i=(e.innerText="250 Views",document.createElement("div")),a=(i.innerText="25 Applicants",document.createElement("div"));return a.className="softLink",a.innerText="View all Applicants",a.style.fontWeight="bold",t.appendChild(o),t.appendChild(n),t.appendChild(e),t.appendChild(i),t.appendChild(a),t};function createBackButton(){var e=document.createElement("td"),t=(e.className="text-center",document.createElement("button"));return t.className="btn btn-primary",t.innerHTML="<i class = 'fas fa-arrow-left'></i>",e.appendChild(t),e.onclick=()=>history.back(),e}function createSearchBoxHdr(){var e=document.createElement("table"),t=(e.className="generalHdrTable",document.createElement("tr")),o=createBackButton(),n=document.createElement("td"),i=document.createElement("div"),a=(i.className="gridHolder",i.style.gap="5px",manageGrid(i),document.createElement("div")),r=document.createElement("input"),l=(r.placeholder="Search job",r.className="form-control",a.appendChild(r),document.createElement("div"));return(r=document.createElement("input")).placeholder="Location",r.className="form-control",l.appendChild(r),i.appendChild(a),i.appendChild(l),n.appendChild(i),t.appendChild(o),t.appendChild(n),e.appendChild(t),e}function loadSearchBox(){execFrontendOnlyFunction(siteName+"/searchBox",createSearchBoxHdr(),displaySearchBox)}const displaySearchBox=()=>{siteName};function loadViewProfile(e){execFrontendOnlyFunction(siteName+"/viewProfile/"+e+"/personal",createHomeHdr(activeTab="sdfdsf"),displayProfile)}const displayProfile=()=>{window.VIEWING_PROFILE_OF=LOGIN_NAME;var e=siteName+"/viewProfile/"+LOGIN_NAME+"/personal";const t={name:"Arjun Poudel",summary:" Very talentd  Very talentd  Very talentd ",email:"arjunpoudel703@gmail.com",phone:"9840030080",portfolio:"https://mydj.great-site.net",address:"Dahachowk, Kathmandu, Nepal"},o=[{id:12,position:"PHP Developer",company:"Javra Software",task_description:"Handling all the website",from:"2020-12-15",to:"Present"},{id:14,position:"Network Administrator",company:"Sanskriti School",task_description:"Handling Network Devices",from:"2020-02-15",to:"2023-02-12"}],n=[{id:1,skill:"PHP"},{id:3,skill:"Javascript"},{id:6,skill:"SEO"},{id:43,skill:"Marketing"},{id:45,skill:"CSS"},{id:444,skill:"HTML"}],i=[{id:34,title:"Mimicly",description:"video sharingsharing sharing sharing sharing sharing sharing sharing sharing sharing sharing  website",link:"http://mimicly.rf.gd"},{id:35,title:"GodJob",description:"LinkedIn",link:"http://godjob.rf.gd"},{id:36,title:"itsVidTime",description:"video calling website",link:"http://abc.rf.gd"}],a=[{id:33,level:"Intermediate",institution:"Pulchowk Campus",from:"2020-03-03",to:"2020-03-04",grade:"91%"},{id:3,level:"Bachelor",field:"Electronics",institution:"Pulchowk Campus",from:"2020-03-03",to:"2020-03-04",grade:"81%"},{id:35,level:"Master",field:"VLSI",institution:"Pulchowk Campus",from:"2020-03-03",to:"2020-03-04",grade:"91%"}];var r="",r=(r=(r=(r=(r+=displayPersonal(t))+displayExperiences(o))+displaySkills(n))+displayProjects(i))+displayEducations(a);document.getElementById(e).innerHTML=r};function createTd(e,t){return`
		<td style = "text-align:right"  
			onclick = '${e}' >
			${createPrimaryButton(t)}
		</td>
	`}function createProfileSubHeader(e,t,o="",n=""){return`
		<div>
			<table class = 'fixedTable'>
				<tr>
					<td class = "h4">
						${e}
					</td>
					${!t||VIEWING_PROFILE_OF==LOGIN_NAME?createTd(n,o):""}
				</tr>
			</table>
		</div>
	`}function displayProfileHeader(e){return`
		<div  class = "stickyMiddle p-2 mt-5 mb-5"
				style = "background: var(--bgColorOfCards); top: ${returnTopOfMiddleMainContent()}"
			> 
				${createProfileSubHeader("@"+e+"'s Profile",profileOwnershipRequired=!1,"Dowwnload CV","downloadCV('"+e+"'')")}

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
	<form>
		<input class = "border-round" placeholder = "Add New Skill" class = "w-100" onkeyup = "alert(1)" type = "text" name = "profileNewSkill" id = "profileNewSkill">
	</form>
`}function createDeleteSkillIcon(e){return`
		<span style = "padding-left:5px; padding-right:5px; cursor:pointer " onclick = "deleteSkill(${e})">
			<i class = "fa fa-close"></i>
		</span>
	`}function displayEachSkill(e){return`
		<div class = "flex-item">
			<span> ${e.skill} </span>
			${VIEWING_PROFILE_OF==LOGIN_NAME?createDeleteSkillIcon(e.id):""}
		</div>
	`}function displaySkills(e){var t="";if(0<e.length)for(var o=0;o<e.length;o++)t+=displayEachSkill(e[o]);else t+='<div class = "h6"> No skills to show </div> ';return`
	<div>
		<table class = "fixedTable">
			<tr>
				<td class = "h4"> Skills </td>
				<td>
					${VIEWING_PROFILE_OF==LOGIN_NAME?createAddSkillForm():""}
				</td>
			</tr>
		</table>
	</div>


	<div class = "mt-3 flex-container">
		${t}
	</div>
	

	<hr>

`}function createProjectOptions(e){return`
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
`}function displayEachProject(e){return`
	<div class = "editDeleteOptionsHolder" >
		<div class = "fontSize20"> ${e.title} </div>
		<div class = "fontSize17"> ${e.description} </div>
		<div> ${e.link} </div>
		
		${VIEWING_PROFILE_OF==LOGIN_NAME?createProjectOptions(e):""}

	</div>
`}function displayProjects(e){var t="";if(0<e.length)for(var o=0;o<e.length;o++)t+=displayEachProject(e[o]);else t+='<div class = "h6" > No projects to show. </div>';return`
	${createProfileSubHeader("Projects",profileOwnershipRequired=!0,"Add New","displayAddNewProjectForm()")}
	<div class = "gridHolderModified ">
		${t}
	</div>
	<hr>
`}function createPersonalHeader(e){e=JSON.stringify(e);return`
		${createProfileSubHeader("Personal",profileOwnershipRequired=!0,"Edit","displayEditPersonalForm("+e+")")}
	`}function displayPersonal(e){return`
		
		${displayProfileHeader(VIEWING_PROFILE_OF)}

		<div>

			${createPersonalHeader(e)}
			<div class = "mt-3">
				<table class = "attractive-table w-100">
					<tr>
						<td> Name </td>
						<td>${e.name}</td>
					</tr>
					<tr>
						<td> Summary </td>
						<td> ${e.Summary} </td>
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
						<td> Portfolio </td>
						<td> ${e.portfolio} </td>
					</tr>
				</table>
			</div>
		</div>
		<hr>
	`}function createExperienceOptions(e){return`
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
`}function displayEachExperience(e){return`
	<div class = "editDeleteOptionsHolder" >
		<div class = "fontSize20"> ${e.position}</div>
		<div class = "fontSize17"> ${e.company}</div>
		<div>${e.task_description}</div>
		<div> ${e.from} to ${e.to} </div>
		
		${VIEWING_PROFILE_OF==LOGIN_NAME?createExperienceOptions(e):""}

	</div>
`}function displayExperiences(e){var t="";if(0<e.length)for(var o=0;o<e.length;o++)t+=displayEachExperience(e[o]);else t="<div> No experiences to show. </div>";return`
	
	${createProfileSubHeader("Experiences",profileOwnershipRequired=!0,"Add New","displayAddNewExperienceForm()")}
	<div class = "gridHolderModified">
		${t}
	</div>
	<hr>

`}function createEducationOptions(e){return`
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
`}function displayEachEducation(e){return`
    <div class="editDeleteOptionsHolder bb">
       <div style="font-weight:bold" class="fontSize17">${e.level}</div>

      <div class="fontSize20">
      	${void 0!==e.field?e.field:"---------"}
      </div>
      <div class="fontSize17">${e.institution}</div>
      <div>${e.from} to ${e.to}</div>
      
      ${VIEWING_PROFILE_OF==LOGIN_NAME?createEducationOptions(e):""}
    </div>
  `}function displayEducations(e){var t="";if(0<e.length)for(var o=0;o<e.length;o++)t+=displayEachEducation(e[o]);else t+='<div class = "h6" > No education info to show. </div>';return`
	${createProfileSubHeader("Education",profileOwnershipRequired=!0,"Add New","displayAddNewEducationForm()")}
	
	<div class = "gridHolderModified">
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
`}function createEditProjectForm(e){return createProjectForm(projectId=e.id,title=e.title,description=e.description,link=e.link)}function createAddNewProjectForm(){return createProjectForm()}function displayEditProjectForm(e){displayPrompt("Edit Project",createEditProjectForm(e),"handleEditProjectSubmit()")}function displayAddNewProjectForm(){displayPrompt("Add New Project",createAddNewProjectForm(),"handleAddNewProjectSubmit()")}function handleEditProjectSubmit(){}function createEditPersonalForm(e){return console.log(e),`
	<div>
		<form id = "editPersonalForm" method = "POST">
			<div class = "gridHolderModified2">
				${createTextInput("Name","editPersonalName",e.name)}
				${createTextInput("Email","editPersonalEmail",e.email)}
				${createTextInput("Phone","editPersonalPhone",e.phone)}
				${createTextInput("PortFolio","editPersonalPortfolio",e.portfolio)}
			</div>
			<div class = "mt-2">
				<label for = "editPersonalSummary">
					Summary <small> (Not more than 3 lines) </small>
				</label>
				<textarea w-100 id = "editPersonalSummary" name = "editPersonalSummary">${e.summary}</textarea>
			</div>
		</form>
	</div>

`}function displayEditPersonalForm(e){displayPrompt("Edit Personal Info",createEditPersonalForm(e),handleEditPersonalSubmit())}function handleEditPersonalSubmit(){}function createTextarea(e,t,o){return`
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
`}function createDateInput(e,t,o,n=!1,i="",a=""){return createInput(type="date",e,t,o,n,i,a)}function createExperienceForm(e="",t="",o="",n="",i="",a="",r=!1){return`
	<div>
		<form id = "experienceForm" method = "POST">

			<input type = "hidden" name = "experienceId" value = "${e}">


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
`}function createEditExperienceForm(e){return createExperienceForm(experienceId=e.id,position=e.position,company=e.company,taskDescription=e.task_description,from=e.from,to="Present"==e.to?"":e.to,currentlyWorkingHere="Present"==e.to)}function createAddNewExperienceForm(){return createExperienceForm()}function displayEditExperienceForm(e){displayPrompt("Edit Experience",createEditExperienceForm(e),"handleEditExperienceSubmit()")}function displayAddNewExperienceForm(){displayPrompt("Add New Experience",createAddNewExperienceForm(),"handleAddNewExperienceSubmit()")}function handleEditExperienceSubmit(){}function handleExperienceFormCbChange(){document.getElementById("experienceFormCb").checked?document.getElementById("experienceFormTo_holder").style.display="none":(document.getElementById("experienceFormTo").disabled=!1,document.getElementById("experienceFormTo_holder").style.display="block")}function handleExperienceFormToChange(){document.getElementById("experienceFormCb_holder").style.display="none"}function createEducationForm(e="",t="",o="",n="",i="",a){return`
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
				${createDateInput("To","educationFormFrom",i)}

			</div>
			
			
			

		</form>
	</div>
`}function createEditEducationForm(e){return createEducationForm(educationId=e.id,level=e.level,field=e.field,institution=e.institution,from=e.from,to=e.to)}function createAddNewEducationForm(){return createEducationForm()}function displayEditEducationForm(e){displayPrompt("Edit Education",createEditEducationForm(e),"handleEditEducationSubmit()")}function displayAddNewEducationForm(){displayPrompt("Add New education",createAddNewEducationForm(),"handleAddNewEducationSubmit()")}function handleEditEducationSubmit(){}function deleteSkill(e){}function deleteProject(e){displayPrompt("Delete Project?",`
		
		Are you sure to delete this project info? Please be
		informed that this can't be
		undone.
	
	`,"proceedProjectDeletion('"+e+"')",actionBtnDanger=!0)}function proceedProjectDeletion(e){alert(e)}function deleteExperience(e){displayPrompt("Delete Experience?",`
		
		Are you sure to delete this experience info? Please be
		informed that this can't be
		undone.
	
	`,"proceedExperienceDeletion('"+e+"')",actionBtnDanger=!0)}function proceedExperienceDeletion(e){}function deleteEducation(e){displayPrompt("Delete Education?",`
		
		Are you sure to delete this education info? Please be
		informed that this can't be
		undone.
	
	`,"proceedEducationDeletion('"+e+"')",actionBtnDanger=!0)}function proceedEducationDeletion(e){}function createSubHeaderForSavedJobs(e){return`
	
	<div  class = "stickyLeftOrRight mt-5  center-div text-center" style = "top: ${returnTopOfMiddleMainContent()}; max-width:400px; width:100%; margin: 0 auto ">
		<div  class = "savedJobsSubHdrHolder">
			<table class = "savedJobsSubHdr">
				<tr>
					<td onclick = "loadSavedJobs()" class = ${"applied"===e?"activeSavedJobsSubHdr":""} >
						Applied
					</td>
					<td onclick = "loadPostedJobs()" class = ${"posted"===e?"activeSavedJobsSubHdr":""} >
						Posted
					</td>
				</tr>
			</table>
		</div>
		</div>

		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
		<h1> hello world </h1>
	`}function loadSavedJobs(){var e=siteName+"/savedJobs/applied",t=createHomeHdr(activeTab="savedJobs");clearHdrAndPut(t),locationToHdrMapper[e]=t,apiFolder;execFrontendOnlyFunction(e,displayApplied,pushOrReplace="push")}const displayApplied=()=>{document.getElementById(siteName+"/savedJobs/applied").innerHTML=createSubHeaderForSavedJobs("applied")};function loadPostedJobs(){var e=siteName+"/savedJobs/posted",t=createHomeHdr(activeTab="savedJobs");clearHdrAndPut(t),locationToHdrMapper[e]=t,apiFolder;execFrontendOnlyFunction(e,displayPostedJobs,pushOrReplace="push")}const displayPostedJobs=()=>{document.getElementById(siteName+"/savedJobs/posted").innerHTML=createSubHeaderForSavedJobs("posted")};function loadPostJobForm(){execFrontendOnlyFunction(siteName+"/postJobForm",createHomeHdr(activeTab="jobPostForm"),displayPostJobForm)}const displayPostJobForm=()=>{var e=siteName+"/postJobForm";document.getElementById(e).innerHTML=`
<h4 class = "text-center" >Post a Job </h4>

<hr>

<form id = "postJobForm" method = "POST">

	<div class = "gridHolder" id="formHolder">
		
		<div>
			<label for = "position"> Position </label>
			<input required  name = "jobPostJobPosition" id = "position" >
		</div>
		

		
			
		<div id = "companyHolder">
			<label for = "companyNameInput">Company Name</label>
			<input required name = "jobPostCompanyName" id = "companyNameInput">
			<div id = "companyNameAutocomplete"></div>
		</div>

		<div id = "locationHolder" style = "position:relative">
			<label for = "locationNameInputPostJobForm">Location</label>
			<input required type="text"
					name = "jobPostLocation" 
					id = "locationNameInputPostJobForm"
					onkeyup = "handleLocationInputInPostJobForm()">
			<div id="locatioNameAutoComplete" style = "position:absolute" class = "locatioNameAutoComplete"></div> 
		</div> 

		<div>
			<label for = "jobPostDeadline"> Deadline </label>
			<input required type = "date" id = "jobPostDeadline" 
			name = "jobPostDeadline">

		</div>

		<div>
			<label for="jobPostJobType">Select Job Type</label>
			<select name = "jobPostJobType" required id="jobPostJobType">
			    <option value="Full Time">Full Time</option>
			    <option value="Part Time">Part Time</option>
			    <option value="Internship">Internship</option>
			</select>
		</div>

		<div>
			<label for="jobPostJobIndustry">Select Job Industry</label>
			<select required name = "jobPostJobIndustry" id="jobPostJobIndustry">
			    <option value="Software">Software</option>
			    <option value="Networking and Hardware">Networking and Hardware</option>
			    <option value="Human Resources">Human Resources</option>
			    <option value="Teacher / Instructer">Teacher / Instructer</option>
			</select>
		</div>

		<div>
			<label for="jobPostJobSite">Select Job Site</label>
			<select required  id="jobPostJobSite" name = 'jobPostJobSite'>
			    <option value="On-Site">On-Site</option>
			    <option value="Remote">Remote/option>
			    <option value="Hybrid">Hybrid</option>
			</select>
		</div>


		<div>
			<label for="jobPostEducationLevel">Minimum Education Level</label>
			<select id = 'jobPostEducationLevel' name = "jobPostEducationLevel" required>
			    <option value="Any Level">Any Level</option>
			    <option value="Intermediate (Plus 2)">Intermediate (Plus 2)</option>		    
			    <option value="Bachelor's Degree">Bachelor's Degree</option>
			    <option value="Master's Degree">Master's Degree</option>
			   	<option value="PhD. Degree">PhD. Degree</option>
			</select>
		</div>
	</div>
	<div>
		<label for = "jobPostJobDescription"> Job Description </label>
		<textarea required rows = "12" 
		name = "jobPostJobDescription"
		style = "width:100%" id = "jobPostJobDescription" name="jobDescription"></textarea>
	</div>

</form>

	<div class = "mt-3 text-center">
		<button id = "postJobButton" 
			onclick =  " (IS_LOGGED_IN) ? handleJobUpload() : displayLoginOverlay('Post New Job', 'post the job')  " style = "font-weight:bold" class = "longButton btn btn-primary">
			Continue
		</button>
	</div>

`,manageGrid(document.getElementById("formHolder"))};function verifyCompanyEmail(){hideOverlay();displayPrompt("Enter Company Email",`
		<div>

			You need to be an employee of this company to post the job.
			
			
			<br>

			You may cancel now if your are unauthorized to post the job
			for this company.
			<BR>
			<div class =  "mt-2">
				<form = "verifyCompanyEmailBeforePostingJobEnterEmail"
					<label> Your Company Email</label>
					<input type = "text" name = "companyEmail">
				</form>
			</div>

		</div>
	`,"continueVerifyCompanyEmail()")}function continueVerifyCompanyEmail(){hideOverlay();displayPrompt("Enter Verification Code",`
		
		Email sent. It may take up to 5 minutes to receive email.

		<div class = "text-danger" style = "font-weight:bold">
			Don't close this box without entering the correct code. 
			You need to wait 5 minutes before requesting another 
			verification code.		
		</div>

		<div class = "mt-2">
			<form = "verifyCompanyEmailBeforePostingJobActualCode"
				<label>Enter the Code</label>
				<input type = "text" name = "companyEmail">
			</form>
		</div>
	`,"proceedJobUploadVerifyCode()")}function proceedJobUploadVerifyCode(){hideOverlay();displayPromptWithoutFooterOptions("Please Wait...",`
		<div>
				Please wait while we check the code you sent. Your job will
				be posted if the code is correct.
				<br>
		</div>

	`)}async function handleLocationInputInPostJobForm(){handleLocationInput("locationNameInputPostJobForm","locatioNameAutoComplete",`https://api.geoapify.com/v1/geocode/autocomplete?text=${document.getElementById("locationNameInputPostJobForm").value.trim()}&apiKey=8a4e247166574725a8de05e06f3c9d74`)}function handleJobUpload(){displayPrompt(title="Job Data",`Are you sure that the data is valid? Click 
					on cancel if you are unsure, otherwise click continue
				to confirm and post the new job.`,callback="verifyCompanyEmail()")}function uploadJob(){var e=document.getElementById("postJobForm"),e=new FormData(e),t=(deactivateButton("postJobButton","Please Wait..."),new XMLHttpRequest);t.onreadystatechange=function(){var e;4==this.readyState&&200==this.status&&(console.log(this.responseText),(e=JSON.parse(this.responseText)).error?(alert(e.error),activateButton("postJobButton","Post Job")):activateButton("postJobButton","Job Post Successful."))},t.open("POST",siteName+"/php/jobs/post.php"),t.send(e)}function manageGrid(e){switch(noOfElementPerRow()){case 1:e.style.gridTemplateColumns="1fr";break;case 2:e.style.gridTemplateColumns="1fr 1fr";break;case 3:e.style.gridTemplateColumns="repeat(3, 1fr)"}}function putTextInInputField(e,t){document.getElementById(e).value=t}function escapeSingleQuotes(e){return e.replace(/'/g,"\\'")}function returnList(e,t){var o="";if(0<t.length){for(var n=0;n<t.length;n++)o+=`<li onclick = 'putTextInInputField("${e}", "${escapeSingleQuotes(t[n])}")' title = "${t[n]}"  class = "option p-2"> ${t[n]}  </li>`;return o}return'<p class = "text-center">No suggestions</p>'}async function handleLocationInput(e,t,o){t=document.getElementById(t);2<document.getElementById(e).value.trim().length?(t.innerHTML='<p class="text-center">Loading</p>',o=(await(await fetch(o)).json()).features.map(e=>e.properties.formatted),t.innerHTML=returnList(e,o)):t.innerHTML='<p class = "text-center">Enter Location</p>'}var menuShown=!1;function toggleMenuInDesktop(){document.getElementById("menuItems").style.display=!0===menuShown?"none":"block",menuShown=!menuShown}function logOut(){location.href=siteName+"/php/auth/logOut.php"}function createOverlayHeader(e){return`
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
	
`}function performOperationsOnBody(){document.body.style.overflowY="hidden"}function deperformOperationsOnBody(){document.body.style.overflowY="scroll"}function createOverlayAndInsert(e){var t=document.createElement("div");t.innerHTML=`
	<div id = "outerOverlay" class  = "outerOverlay">
		<div class = "overlay">
			${e}
		</div>
	</div>
`,document.body.appendChild(t)}function displayLoginOverlay(e,t){performOperationsOnBody(),createOverlayAndInsert(createLoginAlertForm(e,t))}function hideOverlay(){deperformOperationsOnBody(),document.getElementById("outerOverlay").remove()}function deactivateButton(e,t){document.getElementById(e).disabled=!0,document.getElementById(e).innerText=t}function activateButton(e,t){document.getElementById(e).disabled=!1,document.getElementById(e).innerText=t}function createOverlayFooterOptions(e,t){return`
		<div class = "mt-2 mb-2">
			<table class = "simpleTable">
				<tr>
					<td class = "btnBordered" onclick = "hideOverlay()">
						Cancel
					</td>
					<td class = "btnHighlighted ${t?"btnDangerMyOwn":"btnSuccessMyOwn"} " 
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

`}function displayPromptWithoutFooterOptions(e,t){performOperationsOnBody(),createOverlayAndInsert(createPromptWithoutFooterOptions(e,t))}function deleteThisDiv(e){var t=document.getElementById(e),t=(t&&t.remove(),document.createElement("div"));t.id=e,middleMainContent.appendChild(t)}function hideAllDivsExceptDivWithThis(e){for(var t=middleMainContent.children,o=t.length-1;0<=o;o--)t[o].style.display="none";document.getElementById(e).style.display="block"}function refresh(e,t,o){let n=e;deleteThisDiv(e),hideAllDivsExceptDivWithThis(e),currentlyBeingLoadedURLs.push(e),fetch(t).then(function(e){return e.json()}).then(function(e){currentlyBeingLoadedURLs=currentlyBeingLoadedURLs.filter(e=>e!=n),o(e,n)})}function beforeLoadTab(e,t,o,n){clearHdrAndPut(t),locationToHdrMapper[e]=t,loadTab(e,o,n)}function loadTab(e,t,o){currentlyBeingLoadedURLs.includes(e)||(document.location!=e&&(push(e),document.getElementById(e))?hideAllDivsExceptDivWithThis(e):refresh(e,t,o))}function display(e,t,o){if(0<e.length){var n=document.createElement("div");switch(n.className="gridHolder",noOfElementPerRow()){case 1:n.style.gridTemplateColumns="1fr";break;case 2:n.style.gridTemplateColumns="1fr 1fr";break;case 3:n.style.gridTemplateColumns="repeat(3, 1fr)"}t.appendChild(n);for(var i=0;i<e.length;i++)n.appendChild(o(e[i]))}}function noOfElementPerRow(){var e=middleMainContent.clientWidth;return e<=470?1:e<=700?2:3}function push(e){history.pushState({},"",e)}function execFrontendOnlyFunction(e,t,o,n=""){clearHdrAndPut(t),locationToHdrMapper[e]=t,window.location!=e&&push(e),document.getElementById(e)?hideAllDivsExceptDivWithThis(e):(deleteThisDiv(e),hideAllDivsExceptDivWithThis(e),o(n))}window.onpopstate=e=>{clearHdrAndPut(locationToHdrMapper[document.location]),hideAllDivsExceptDivWithThis(document.location)};const createHomeHdr=e=>{var t=document.createElement("table"),o=(t.className="hdrTable",document.createElement("tr")),n=document.createElement("td"),i=("home"==e&&(n.className="activeTab"),n.onclick=()=>loadHome(),n.innerHTML="<i class = 'fa fa-home'> </i> <br> <small>Home</small> ",document.createElement("td")),a=(i.className="requiresLogin","noti"==e&&(i.className="activeTab"),i.onclick=()=>IS_LOGGED_IN?loadNoti():displayLoginOverlay("Notifications","view notifications."),i.innerHTML="<i class = 'fa fa-bell'> </i> <br> <small>Notifications</small> ",document.createElement("td")),r=(a.className="requiresLogin","savedJobs"==e&&(a.className="activeTab"),a.onclick=()=>IS_LOGGED_IN?loadSavedJobs():displayLoginOverlay("Saved Jobs","view applied and posted jobs"),a.innerHTML="<i class = 'fa fa-bookmark'> </i> <br> <small>Saved Jobs</small> ",document.createElement("td")),l=(r.onclick=()=>loadSearchBox(),r.innerHTML="<i class ='fa fa-search'> </i> <br> <small>Search</small>  ",document.createElement("td")),d=(l.className="d-none d-md-block","jobPostForm"==e&&(l.className="activeTab"),l.onclick=()=>loadPostJobForm(),l.innerHTML="<i class ='fa fa-suitcase'> </i> <br> <small>Post Job</small>  ",document.createElement("td"));return d.className="d-xs-block d-sm-block d-md-none",d.onclick=()=>loadMenu(),d.innerHTML="<i class ='fa fa-bars'> </i> <br> <small>Menu</small>  ","menu"==e&&(d.className="activeTab"),o.appendChild(n),o.appendChild(a),o.appendChild(i),o.appendChild(l),o.appendChild(r),o.appendChild(d),t.appendChild(o),t};function createGeneralHdr(e){var t=document.createElement("table"),o=(t.className="generalHdrTable",document.createElement("tr")),n=createBackButton(),i=document.createElement("td");return i.innerText=e,o.appendChild(n),o.appendChild(i),t.appendChild(o),t}function clearHdrAndPut(e){var t=document.getElementById("middlePartOfHdr");t.innerHTML="",t.appendChild(e)}const siteName="http://localhost/myprojects/mydj",apiFolder="php";var loadedURLs=[],currentlyBeingLoadedURLs=[],middleMainContent=document.getElementById("middleMainContent"),locationToHdrMapper={},dark=0;const root=document.documentElement;function toggle(){0==dark?(dark=1,root.style.setProperty("--border","1px solid rgba(255, 255, 255, 0.7"),root.style.setProperty("--bgColorOfCards","black"),root.style.setProperty("--bgColorOfBody","rgba(0, 0, 0, 0.85)"),root.style.setProperty("--colorOfBody","white"),root.style.setProperty("--fontSize17Color","lightgreen"),root.style.setProperty("--fontSize20Color","yellow"),root.style.setProperty("--divBackground","rgba(255, 255, 255, 0.2"),root.style.setProperty("--boxShadow","0px 10px 20px rgba(255, 255, 255, 0.3)")):(dark=0,root.style.setProperty("--border","1px solid rgba(0, 0, 0, 0.2"),root.style.setProperty("--bgColorOfCards","white"),root.style.setProperty("--bgColorOfBody","#f2f2f2"),root.style.setProperty("--colorOfBody","black"),root.style.setProperty("--fontSize17Color","green"),root.style.setProperty("--fontSize20Color","green"),root.style.setProperty("--divBackground","rgba(0, 0, 0, 0.05"),root.style.setProperty("--boxShadow","0px 10px 20px rgba(0, 0, 0, 0.3)"))}const displayCreateCompanyPage=()=>{var e=siteName+"/createCompanyPage";document.getElementById(e).innerHTML=`
	
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
					onkeyup = "handleLocationInputInCreateCompanyPage()">
			<div id="locatioNameAutoCompleteInCreateCompanyPage" 
			style = "position:absolute" class = "locatioNameAutoComplete"></div> 
		</div> 

		<div>
			<label for = "companyPageCompanyWebsite"> Company Website </label>
			<input required   
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
<div class = "text-center">
	<button id  = "createCompanyPageButton"
		onclick = " (IS_LOGGED_IN) ? handleCompanyCreation() : displayLoginOverlay('Create Company Page', 'create the company page')"
	 class = "longButton btn btn-primary" 
	 style = "font-weight:bold">
		Create Company Page
	</button>
</div>
`,manageGrid(document.getElementById("formHolderForCreateCompanyPage"))};function loadCreateCompanyPage(){execFrontendOnlyFunction(siteName+"/createCompanyPage",createHomeHdr(activeTab="null"),displayCreateCompanyPage)}async function handleLocationInputInCreateCompanyPage(){handleLocationInput("locationNameInputCCA","locatioNameAutoCompleteInCreateCompanyPage",`https://api.geoapify.com/v1/geocode/autocomplete?text=${document.getElementById("locationNameInputCCA").value.trim()}&apiKey=8a4e247166574725a8de05e06f3c9d74`)}function handleCompanyCreation(){displayPrompt(title="Comapny Data",`Are you sure that the data is valid? Click 
					on cancel if you are unsure, otherwise click continue
				to confirm and create the company page.`,callback="createCompanyPage()")}function createCompanyPage(){var e=document.getElementById("companyPageForm"),e=new FormData(e),t=(deactivateButton("createCompanyPageButton","Please Wait..."),new XMLHttpRequest);t.onreadystatechange=function(){var e;4==this.readyState&&200==this.status&&(console.log(this.responseText),(e=JSON.parse(this.responseText)).error?(alert(e.error),activateButton("createCompanyPageButton","Create Company Page")):activateButton("postJobButton","Company Creation Successful"))},t.open("POST",siteName+"/php/companyPage/create.php"),t.send(e)}function loadRegisterForm(){execFrontendOnlyFunction(siteName+"/register",createHomeHdr(activeTab="ddd"),displayRegisterForm)}function createRegisterForm(){return`
	<div class = "formHolder" style = "background: var(--bgColorOfCards)">
	<h5 class = "text-center">Create New Account</h5>
	<hr>
		<form id = "registerForm" method = "POST">
			<div>
				<label for = "registerName">Name</label>
				<input id = 'registerName'  type = "text" required name = "registerName">
			</div>
			<div>
				<label for = "registerLoginName">Login_name</label>
				 ( 
				<small>It is used while logging in the next time.</small>
				 )
				<input id = "registerLoginName"  required type = "text" name = "registerLoginName">
			</div>
			<div>
				<label for = "registerPassword">Password</label>
				<input  type = "password" id = "registerPassword" required name = "registerPassword">
			</div>
		
			

		</form>


		<div class = 'text-center'>
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
	`}const displayRegisterForm=()=>{var e=siteName+"/register";document.getElementById(e).innerHTML=createRegisterForm()};function handleRegister(){var e=document.getElementById("registerLoginName").value,t=(document.getElementById("registerButton").disabled=!0,document.getElementById("registerButton").innerHTML="Please Wait...",document.getElementById("registerPassword").value),o=document.getElementById("registerName").value;fetch(siteName+"/php/auth/register.php?registerLoginName="+e+"&registerPassword="+t+"&registerName="+o).then(e=>e.json()).then(e=>{e.error?(alert("error"),document.getElementById("registerButton").disabled=!1,document.getElementById("registerButton").innerHTML="Create New Account"):location.href=siteName}).catch(e=>{document.getElementById("registerButton").disabled=!1,document.getElementById("registerButton").innerHTML="Create New Account",console.log(e)})}function loadLoginForm(){execFrontendOnlyFunction(siteName+"/login",createHomeHdr(activeTab="ddd"),displayLoginForm)}function createLoginForm(){return`
	<div class = "formHolder" style = "background: var(--bgColorOfCards)">
	<h5 class = "text-center">Login to our Website</h5>
	<hr>
		<form id = "loginForm" method = "POST">
			<div>
				<label for = "loginLoginName">Login_name</label>
				<input id = "loginLoginName"  type = "text" required name = "loginLoginName">
			</div>
			<div>
				<label for = "loginPassword">Password</label>
				<input id = "loginPassword"   type = "password"  required name = "loginPassword">
			</div>


		</form>

		<div class = 'text-center'>
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
	`}const displayLoginForm=()=>{var e=siteName+"/login";document.getElementById(e).innerHTML=createLoginForm()};function handleLogin(){var e=document.getElementById("loginLoginName").value,t=document.getElementById("loginPassword").value;document.getElementById("loginButton").disabled=!0,document.getElementById("loginButton").innerText="Please Wait...",fetch(siteName+"/php/auth/login.php?loginLoginName="+e+"&loginPassword="+t).then(e=>e.json()).then(e=>{e.error?(alert("Incorrect username or password!"),document.getElementById("loginButton").disabled=!1,document.getElementById("loginButton").innerText="Log In"):location.href=siteName}).catch(e=>alert(e))}