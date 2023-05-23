function setup(){fetch(siteName+"/php/auth/checkLoginStatus.php").then(e=>e.json()).then(e=>{handleCheckLoginStatusData(e)})}function handleCheckLoginStatusData(e){e.isNotLoggedIn?window.IS_LOGGED_IN=!1:(window.IS_LOGGED_IN=!0,window.PROFILE_VISITS_COUNT=e.profileVisitsCount,window.CV_DOWNLOADS_COUNT=e.CVdownloadsCount,window.LOGIN_NAME=e.loginName,window.HAS_COMPANY_PAGE=e.hasCompanyPage),document.getElementById("preLoaderHolder").remove(),manageSidebars(),loadHome()}function returnTopOfMiddleMainContent(){return document.getElementById("middleMainContent").getBoundingClientRect().top+5+"px"}function makeSidebarsSticky(){for(var e=document.getElementsByClassName("stickyLeftOrRight"),t=0;t<e.length;t++){var o=returnTopOfMiddleMainContent();e[t].style.top=o}}function manageSidebars(){document.getElementById("hdrLeftPart").innerHTML=handleHdrLeftPart(),document.getElementById("hdrRightPart").innerHTML=handleHdrRightPart(),document.getElementById("leftSidebar").innerHTML=createLeftSidebar(),document.getElementById("rightSidebar").innerHTML=createRightSidebar(),makeSidebarsSticky(),window.middleMainContent=document.getElementById("middleMainContent")}function handleHdrLeftPart(){return`
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
				 onclick=" ${IS_LOGGED_IN&&HAS_COMPANY_PAGE?"loadCompanyPage()":"loadCreateCompanyPage()"}
				  		" 
				>
					${IS_LOGGED_IN&&HAS_COMPANY_PAGE?"<i class = 'fa fa-edit'></i>Your Company Page":"<i class = 'fa fa-plus'></i>Create Company Page"} 
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
	`}const displayNoti=(e,t)=>{display(e,document.getElementById(t),callback=returnEachNoti)};function loadNoti(){var e=siteName+"/notifications",t=createHomeHdr(activeTab="noti");loadTab(e,apiFolder+"/notifications.php",displayNoti,t)}function returnEachNoti(e){var t=document.createElement("div");return t.className="jobMainInfo",t.innerText=e.notification,t}function loadMenu(){execFrontendOnlyFunction(siteName+"/menu",createHomeHdr(activeTab="menu"),displayMenu)}const displayMenu=()=>{var e=siteName+"/menu";document.getElementById(e).innerHTML=document.getElementById("menuItems").innerHTML};function createBackButton(){var e=document.createElement("td"),t=(e.className="text-center",document.createElement("button"));return t.className="btn btn-primary",t.innerHTML="<i class = 'fas fa-arrow-left'></i>",e.appendChild(t),e.onclick=()=>history.back(),e}function createSearchBoxHdr(){var e=document.createElement("table"),t=(e.className="generalHdrTable",document.createElement("tr")),o=createBackButton(),i=document.createElement("td"),n=document.createElement("div"),a=(n.className="gridHolder",n.style.gap="5px",manageGrid(n),document.createElement("div")),r=document.createElement("input"),l=(r.placeholder="Search job",r.className="form-control",a.appendChild(r),document.createElement("div"));return(r=document.createElement("input")).placeholder="Location",r.className="form-control",l.appendChild(r),n.appendChild(a),n.appendChild(l),i.appendChild(n),t.appendChild(o),t.appendChild(i),e.appendChild(t),e}function loadSearchBox(){execFrontendOnlyFunction(siteName+"/searchBox",createSearchBoxHdr(),displaySearchBox)}const displaySearchBox=()=>{siteName};function loadViewProfile(e){execFrontendOnlyFunction(siteName+"/viewProfile/"+e+"/personal",createHomeHdr(activeTab="sdfdsf"),displayProfile)}const displayProfile=()=>{window.VIEWING_PROFILE_OF=LOGIN_NAME;var e=siteName+"/viewProfile/"+LOGIN_NAME+"/personal";const t={name:"Arjun Poudel",summary:" Very talentd  Very talentd  Very talentd ",email:"arjunpoudel703@gmail.com",phone:"9840030080",portfolio:"https://mydj.great-site.net",address:"Dahachowk, Kathmandu, Nepal"},o=[{id:12,position:"PHP Developer",company:"Javra Software",task_description:"Handling all the website",from:"2020-12-15",to:"Present"},{id:14,position:"Network Administrator",company:"Sanskriti School",task_description:"Handling Network Devices",from:"2020-02-15",to:"2023-02-12"}],i=[{id:1,skill:"PHP"},{id:3,skill:"Javascript"},{id:6,skill:"SEO"},{id:43,skill:"Marketing"},{id:45,skill:"CSS"},{id:444,skill:"HTML"}],n=[{id:34,title:"Mimicly",description:"video sharingsharing sharing sharing sharing sharing sharing sharing sharing sharing sharing  website",link:"http://mimicly.rf.gd"},{id:35,title:"GodJob",description:"LinkedIn",link:"http://godjob.rf.gd"},{id:36,title:"itsVidTime",description:"video calling website",link:"http://abc.rf.gd"}],a=[{id:33,level:"Intermediate",institution:"Pulchowk Campus",from:"2020-03-03",to:"2020-03-04",grade:"91%"},{id:3,level:"Bachelor",field:"Electronics",institution:"Pulchowk Campus",from:"2020-03-03",to:"2020-03-04",grade:"81%"},{id:35,level:"Master",field:"VLSI",institution:"Pulchowk Campus",from:"2020-03-03",to:"2020-03-04",grade:"91%"}];var r="",r=(r=(r=(r=(r+=displayPersonal(t))+displayExperiences(o))+displaySkills(i))+displayProjects(n))+displayEducations(a);document.getElementById(e).innerHTML=r};function createTd(e,t){return`
		<td style = "text-align:right"  
			onclick = '${e}' >
			${createPrimaryButton(t)}
		</td>
	`}function createProfileSubHeader(e,t,o="",i=""){return`
		<div>
			<table class = 'fixedTable'>
				<tr>
					<td class = "h4">
						${e}
					</td>
					${!t||VIEWING_PROFILE_OF==LOGIN_NAME?createTd(i,o):""}
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
		<span  style = "padding-left:5px; padding-right:5px; cursor:pointer " onclick = "deleteSkill(${e})">
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
`}function displayEachProject(e){return`

	<div class = "jobMainInfoClone" >
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
`}function displayEachExperience(e){return`
	<div class = "jobMainInfoClone" >
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
`}function displayEachEducation(e){return`
    <div class="jobMainInfoClone">
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
	
`}function createProjectForm(e="",t="",o="",i=""){return`
	<div>
		<form id = "projectForm" method = "POST">

			<input type = "hidden" name = "projectId" value = "${e}">
			<div class = "gridHolderModified2">
				${createTextInput("Title","projectFormTitle",t)}
				${createTextInput("Link","projectFormLink",i)}
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
	`}function createInput(e,t,o,i,n=!1,a="",r=""){return`
		<div id = "${a}_holder" >
			<label>
				${t}
			</label>
			<input type="${e}"  name="${o}" value="${i}" 
				 id = "${a}" ${n?"disabled":""} onchange = "${r}">
		</div>
	`}function createTextInput(e,t,o){return createInput(type="text",e,t,o)}function createCheckbox(e,t,o,i=!1,n=""){return`
	<div id = "${t}_holder">
		<label for = "${t}">${e}</label>
		<input style  ="font-size:20px" onchange = "${n}" type = "checkbox" id ="${t}" name = "${o}"  ${i?"checked":""}>
	</div>
`}function createDateInput(e,t,o,i=!1,n="",a=""){return createInput(type="date",e,t,o,i,n,a)}function createExperienceForm(e="",t="",o="",i="",n="",a="",r=!1){return`
	<div>
		<form id = "experienceForm" method = "POST">

			<input type = "hidden" name = "experienceId" value = "${e}">


			<div class = "gridHolderModified2">
				${createTextInput("Position","experienceFormPosition",t)}
				${createTextInput("Company","experienceFormCompany",o)}
			</div>
			
			${createTextarea("Task Description (optional) ","experienceFormTaskDescription",i)}
			
			<div class = "gridHolderModified2">
				${createDateInput("From","experienceFormFrom",n)}
				
				${createCheckbox("Currently Working Here","experienceFormCb","experienceFormCb",checkedStatus=r,onchangeCallback="handleExperienceFormCbChange()")}
				
				${createDateInput("To","experienceFormTo",a,disabled=r,"experienceFormTo",onchangeCallback="handleExperienceFormToChange()")}
			
			</div>

		</form>
	</div>
`}function createEditExperienceForm(e){return createExperienceForm(experienceId=e.id,position=e.position,company=e.company,taskDescription=e.task_description,from=e.from,to="Present"==e.to?"":e.to,currentlyWorkingHere="Present"==e.to)}function createAddNewExperienceForm(){return createExperienceForm()}function displayEditExperienceForm(e){displayPrompt("Edit Experience",createEditExperienceForm(e),"handleEditExperienceSubmit()")}function displayAddNewExperienceForm(){displayPrompt("Add New Experience",createAddNewExperienceForm(),"handleAddNewExperienceSubmit()")}function handleEditExperienceSubmit(){}function handleExperienceFormCbChange(){document.getElementById("experienceFormCb").checked?document.getElementById("experienceFormTo_holder").style.display="none":(document.getElementById("experienceFormTo").disabled=!1,document.getElementById("experienceFormTo_holder").style.display="block")}function handleExperienceFormToChange(){document.getElementById("experienceFormCb_holder").style.display="none"}function createEducationForm(e="",t="",o="",i="",n="",a){return`
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
				${createTextInput("Institution","educationFormInstitution",i)}
				${createDateInput("From","educationFormFrom",n)}
				${createDateInput("To","educationFormFrom",n)}

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
	
	`,"proceedEducationDeletion('"+e+"')",actionBtnDanger=!0)}function proceedEducationDeletion(e){}function loadEachJob(e){execFrontendOnlyFunction(siteName+"/job/"+e.id,createGeneralHdr(e.position),displayJob,data=e)}const displayJob=e=>{var t=siteName+"/job/"+e.id,e=`
		<div>
			<div class = "h5 mt-3 text-center"> Job Overview </div>
			
			<div class = "fontSize20"> ${e.position}</div>
			

			<div class = "fontSize17 cursorPointer" onclick = "loadCompanyPage(${e.company_id})" > ${e.for_company}</div>
			<div class = "flex-container">
				<div class = "simpleFlexItem position-relative">${e.job_type}<span class = "smallCircle position-absolute"></span></div>

				<div class = "simpleFlexItem position-relative  ">${e.job_site}<span class = "smallCircle position-absolute"></span></div>
				<div class = "simpleFlexItem position-relative">${e.location}<span class = "smallCircle position-absolute"></span></div>
				<div class = "simpleFlexItem position-relative">${e.education_level}<span class = "smallCircle position-absolute"></span></div>

				<div class = "simpleFlexItem">${e.num_applicants} Applicants</div>

			</div>

		</div>	

		<hr>		


			<div class = "text-center">

				<table class = "simpleTable">
					<tr>
						<td class = "btnHighlighted btnPrimaryMyOwn">
							Apply
						</td>
						<td class = "btnBordered">
							View all Applicants
						</td>
					</tr>
				</table>
			</div>

			<hr>
		
		<div>
			<div class = "h5 text-center">Job Description</div>

			<div>${e.description}</div>
		</div>

	`;document.getElementById(t).innerHTML=e};function createSubHeaderForSavedJobs(e){return`
	
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
	`}function loadSavedJobs(){var e=siteName+"/savedJobs/applied",t=createHomeHdr(activeTab="savedJobs");clearHdrAndPut(t),locationToHdrMapper[e]=t,apiFolder;execFrontendOnlyFunction(e,displayApplied,pushOrReplace="push")}const displayApplied=()=>{document.getElementById(siteName+"/savedJobs/applied").innerHTML=createSubHeaderForSavedJobs("applied")};function loadPostedJobs(){var e=siteName+"/savedJobs/posted",t=createHomeHdr(activeTab="savedJobs");clearHdrAndPut(t),locationToHdrMapper[e]=t,apiFolder;execFrontendOnlyFunction(e,displayPostedJobs,pushOrReplace="push")}const displayPostedJobs=()=>{document.getElementById(siteName+"/savedJobs/posted").innerHTML=createSubHeaderForSavedJobs("posted")},displayHome=(e,t=0)=>{display(e,document.getElementById(siteName+"/"),callback=returnEachJob)};function loadHome(){var e=siteName+"/",t=createHomeHdr(activeTab="home");loadTab(e,apiFolder+"/home.php",displayHome,t)}const returnEachJob=e=>{var t=`
			<div class = "fontSize20"> ${e.position}</div>
			<div class = "fontSize17"> ${e.for_company}</div>
			<div class = "flex-container">
				<div class = "simpleFlexItem position-relative">${e.job_type}<span class = "smallCircle position-absolute"></span></div>

				<div class = "simpleFlexItem position-relative  ">${e.job_site}<span class = "smallCircle position-absolute"></span></div>
				<div class = "simpleFlexItem position-relative">${e.location}<span class = "smallCircle position-absolute"></span></div>

				<div class = "simpleFlexItem">${e.num_applicants} Applicants</div>

			</div>
			<div class = "spareDiv"></div>
			<div class = "text-center viewApplicantHolder">
				<div class = "simpleButton">View All Applicants</div>
			</div>
	`,o=document.createElement("div");return o.onclick=()=>{loadEachJob(e)},o.className="jobMainInfo",o.innerHTML=t,o};function loadPostJobForm(){execFrontendOnlyFunction(siteName+"/postJobForm",createHomeHdr(activeTab="jobPostForm"),displayPostJobForm)}const displayPostJobForm=()=>{var e=siteName+"/postJobForm";document.getElementById(e).innerHTML=`
<h4 class = "text-center" >Post a Job </h4>

<hr>

<form id = "postJobForm" method = "POST">

	<div id = "postJobForm_step_1" >

		<div class = "gridHolderModified2" >
			
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
				    <option value="f">Full Time</option>
				    <option value="p">Part Time</option>
				    <option value="i">Internship</option>
				</select>
			</div>

			<div>
				<label for="jobPostJobIndustry">Select Job Industry</label>
				<select required name = "jobPostJobIndustry" id="jobPostJobIndustry">
				    <option value="sw">Software</option>
				    <option value="nh">Networking and Hardware</option>
				    <option value="hr">Human Resources</option>
				    <option value="te">Teacher / Instructer</option>
				</select>
			</div>

		</div>

	</div>

	<div id = 'postJobForm_step_2'>
		<div class = "gridHolderModified2">
			<div>
				<label for="jobPostJobSite">Select Job Site</label>
				<select required  id="jobPostJobSite" name = 'jobPostJobSite'>
				    <option value="os">On-Site</option>
				    <option value="r">Remote/option>
				    <option value="h">Hybrid</option>
				</select>
			</div>


			<div>
				<label for="jobPostEducationLevel">Minimum Education Level</label>
				<select id = 'jobPostEducationLevel' name = "jobPostEducationLevel" required>
				    <option value="12">Intermediate (Plus 2)</option>		    
				    <option value="16">Bachelor's Degree</option>
				    <option value="18">Master's Degree</option>
				   	<option value="23">PhD. Degree</option>
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


	<div id = "postJobForm_step_3">
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
`,loadSubTab(1)};function VerifyYourEmail(e=!1){""!=document.getElementById("hiddenCompanyWebsite").value&&displayPrompt("Enter Verification Code",`

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

	`),fetch("php/jobs/verify.php?token="+e).then(e=>e.json()).then(e=>{hideOverlay(),e.error?VerifyYourEmail(error=!0):displayPromptWithoutFooterOptions("Success!",`
				<div class = "h5">Job Posted Successfully!</div>
				<br>
				<span class = "softLink" onclick = "loadPostedJobs()">Click Here</span>  to view the posted 
				jobs.
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

	`;document.getElementById("controlHolder").innerHTML=e}async function handleLocationInputInPostJobForm(){handleLocationInput("locationNameInputPostJobForm","locatioNameAutoComplete",`https://api.geoapify.com/v1/geocode/autocomplete?text=${document.getElementById("locationNameInputPostJobForm").value.trim()}&apiKey=8a4e247166574725a8de05e06f3c9d74`)}function updateCompanyNameInputField(e){document.getElementById("companyNameInputInJobPost").value=e.company_name,document.getElementById("hiddenCompanyWebsite").value=e.company_website}function companyNameSuggestions(e){var t="";if(0<e.length){for(var o=0;o<e.length;o++)t+=`<li onclick = 'updateCompanyNameInputField( ${JSON.stringify(e[o])} )' title = "${e[o].company_name}"  class = "option p-2"> ${e[o].company_name}  </li>`;return t}return'<p class = "text-center">No suggestions</p>'}async function handleCompanyInputInPostJobForm(){var e=document.getElementById("companyNameInputInJobPost").value;2<=e.trim().length?(document.getElementById("companyNameAutocomplete").innerHTML='<p class="text-center">Loading</p>',fetch("php/companyPage/suggestions.php?incompleteName="+e).then(e=>e.json()).then(e=>{document.getElementById("companyNameAutocomplete").innerHTML=companyNameSuggestions(e)})):document.getElementById("companyNameAutocomplete").innerHTML='<p class ="text-center">Enter Company Name</p>'}function manageGrid(e){switch(noOfElementPerRow()){case 1:e.style.gridTemplateColumns="1fr";break;case 2:e.style.gridTemplateColumns="1fr 1fr";break;case 3:e.style.gridTemplateColumns="repeat(3, 1fr)"}}function putTextInInputField(e,t){document.getElementById(e).value=t}function escapeSingleQuotes(e){return e.replace(/'/g,"\\'")}function returnList(e,t){var o="";if(0<t.length){for(var i=0;i<t.length;i++)o+=`<li onclick = 'putTextInInputField("${e}", "${escapeSingleQuotes(t[i])}")' title = "${t[i]}"  class = "option p-2"> ${t[i]}  </li>`;return o}return'<p class = "text-center">No suggestions</p>'}async function handleLocationInput(e,t,o){t=document.getElementById(t);2<document.getElementById(e).value.trim().length?(t.innerHTML='<p class="text-center">Loading</p>',o=(await(await fetch(o)).json()).features.map(e=>e.properties.formatted),t.innerHTML=returnList(e,o)):t.innerHTML='<p class = "text-center">Enter Location</p>'}var menuShown=!0;function toggleMenuInDesktop(){document.getElementById("menuItems").style.display=1==menuShown?"none":"block",menuShown=!menuShown}function logOut(){location.href=siteName+"/php/auth/logOut.php"}function createOverlayHeader(e){return`
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
	`}function createPrompt(e,t,o,i){return`
	${createOverlayHeader(e)}

	<hr>

	<div>
		${t}			
	</div>

	${createOverlayFooterOptions(o,i)}
`}function displayPrompt(e,t,o,i=!1){performOperationsOnBody(),createOverlayAndInsert(createPrompt(e,t,o,i))}function getPartOfDay(){var e=(new Date).getHours();return 5<=e&&e<12?"Morning":12<=e&&e<18?"Afternoon":"Evening"}function createPromptWithoutFooterOptions(e,t){return`
	${createOverlayHeader(e)}

	<hr>

	<div>
		${t}			
	</div>

`}function displayPromptWithoutFooterOptions(e,t){performOperationsOnBody(),createOverlayAndInsert(createPromptWithoutFooterOptions(e,t))}function deleteThisDiv(e){var t=document.getElementById(e),t=(t&&t.remove(),document.createElement("div"));t.id=e,middleMainContent.appendChild(t)}function hideAllDivsExceptDivWithThis(e){for(var t=middleMainContent.children,o=t.length-1;0<=o;o--)t[o].style.display="none";document.getElementById(e).style.display="block"}function refresh(e,t,o){let i=e;deleteThisDiv(e),hideAllDivsExceptDivWithThis(e),currentlyBeingLoadedURLs.push(e),fetch(t).then(function(e){return e.json()}).then(function(e){currentlyBeingLoadedURLs=currentlyBeingLoadedURLs.filter(e=>e!=i),o(e,i)})}function beforeLoadTab(e,t,o,i){clearHdrAndPut(t),locationToHdrMapper[e]=t,loadTab(e,o,i)}function loadTab(e,t,o,i=""){clearHdrAndPut(i),locationToHdrMapper[e]=i,currentlyBeingLoadedURLs.includes(e)||(document.location!=e&&(push(e),document.getElementById(e))?hideAllDivsExceptDivWithThis(e):refresh(e,t,o))}function display(e,t,o){if(0<e.length){var i=document.createElement("div");i.className="gridHolderModified2",t.appendChild(i);for(var n=0;n<e.length;n++)i.appendChild(o(e[n]))}}function noOfElementPerRow(){var e=middleMainContent.clientWidth;return e<=470?1:e<=700?2:3}function push(e){history.pushState({},"",e)}function execFrontendOnlyFunction(e,t,o,i=""){clearHdrAndPut(t),locationToHdrMapper[e]=t,window.location!=e&&push(e),document.getElementById(e)?hideAllDivsExceptDivWithThis(e):(deleteThisDiv(e),hideAllDivsExceptDivWithThis(e),o(i))}window.onpopstate=e=>{clearHdrAndPut(locationToHdrMapper[document.location]),hideAllDivsExceptDivWithThis(document.location)};const createHomeHdr=e=>{var t=document.createElement("table"),o=(t.className="hdrTable homeHdr ",document.createElement("tr")),i=document.createElement("td"),n=("home"==e&&(i.className="activeTab"),i.onclick=()=>loadHome(),i.innerHTML="<i class = 'fa fa-home'> </i> <br> <small>Home</small> ",document.createElement("td")),a=(n.className="requiresLogin","noti"==e&&(n.className="activeTab"),n.onclick=()=>IS_LOGGED_IN?loadNoti():displayLoginOverlay("Notifications","view notifications."),n.innerHTML="<i class = 'fa fa-bell'> </i> <br> <small>Notifications</small> ",document.createElement("td")),r=(a.className="requiresLogin","savedJobs"==e&&(a.className="activeTab"),a.onclick=()=>IS_LOGGED_IN?loadSavedJobs():displayLoginOverlay("Saved Jobs","view applied and posted jobs"),a.innerHTML="<i class = 'fa fa-bookmark'> </i> <br> <small>Saved Jobs</small> ",document.createElement("td")),l=(r.onclick=()=>loadSearchBox(),r.innerHTML="<i class ='fa fa-search'> </i> <br> <small>Search</small>  ",document.createElement("td")),d=(l.className="d-none d-md-block","jobPostForm"==e&&(l.className="activeTab"),l.onclick=()=>loadPostJobForm(),l.innerHTML="<i class ='fa fa-suitcase'> </i> <br> <small>Post Job</small>  ",document.createElement("td"));return d.className="d-xs-block d-sm-block d-md-none",d.onclick=()=>loadMenu(),d.innerHTML="<i class ='fa fa-bars'> </i> <br> <small>Menu</small>  ","menu"==e&&(d.className="activeTab"),o.appendChild(i),o.appendChild(a),o.appendChild(n),o.appendChild(l),o.appendChild(r),o.appendChild(d),t.appendChild(o),t};function createGeneralHdr(e){var t=document.createElement("table"),o=(t.className="generalHdrTable",document.createElement("tr")),i=createBackButton(),n=document.createElement("th");return n.innerText=e,o.appendChild(i),o.appendChild(n),t.appendChild(o),t}function clearHdrAndPut(e){var t=document.getElementById("middlePartOfHdr");t.innerHTML="",t.appendChild(e)}const siteName="http://localhost/myprojects/mydj",apiFolder="php";var loadedURLs=[],currentlyBeingLoadedURLs=[],middleMainContent=document.getElementById("middleMainContent"),locationToHdrMapper={},dark=0;const root=document.documentElement;function toggle(){0==dark?(dark=1,root.style.setProperty("--border","1px solid rgba(255, 255, 255, 0.7"),root.style.setProperty("--bgColorOfCards","black"),root.style.setProperty("--bgColorOfBody","rgba(0, 0, 0, 0.85)"),root.style.setProperty("--colorOfBody","white"),root.style.setProperty("--fontSize17Color","lightgreen"),root.style.setProperty("--fontSize20Color","yellow"),root.style.setProperty("--divBackground","rgba(255, 255, 255, 0.2"),root.style.setProperty("--boxShadow","0px 10px 20px rgba(255, 255, 255, 0.3)")):(dark=0,root.style.setProperty("--border","1px solid rgba(0, 0, 0, 0.2"),root.style.setProperty("--bgColorOfCards","white"),root.style.setProperty("--bgColorOfBody","#f2f2f2"),root.style.setProperty("--colorOfBody","black"),root.style.setProperty("--fontSize17Color","green"),root.style.setProperty("--fontSize20Color","green"),root.style.setProperty("--divBackground","rgba(0, 0, 0, 0.05"),root.style.setProperty("--boxShadow","0px 10px 20px rgba(0, 0, 0, 0.3)"))}function promptToActivate(){return`

<div class = "text-danger text-center" style = 'font-weight:bold' >

	You can't post the jobs unless you verify the email of company and activate the page.
	<br>
	<button onclick = "activateCompanyPage()"
			class = " mt-2 btn btn-primary">
		Activate Now
	</button>

</div>


`}function createCompanyView(e){return console.log(e),`

	<div class = 'mt-3 text-center'>
		<h4> ${e.company_name}</h4>
	</div>

	<hr>

	${LOGIN_NAME==e.creator&&0==e.active_status?promptToActivate():""}

	<div>
		<table class = "mt-3 attractive-table w-100">
			<tr>
				<td> Email </td>
				<td>${e.company_email}</td>
			</tr>
			<tr>
				<td> Contact Number </td>
				<td> ${e.contact_number} </td>
			</tr>
			<tr>
				<td> Location </td>
				<td> ${e.company_location} </td>
			</tr>
			<tr>
				<td> Category </td>
				<td> ${e.category} </td>
			</tr>
			<tr>
				<td> About </td>
				<td> ${e.company_about} </td>
			</tr>
		</table>
	</div>

`}const displayCompanyPage=(e,t="")=>{(t=document.getElementById(t)).innerHTML=createCompanyView(e)};function loadCompanyPage(e){var t=siteName+"/companyPage/"+e,o=createHomeHdr(activeTab="ddd");loadTab(t,apiFolder+"/companyPage/view.php?id="+e,displayCompanyPage,o)}const displayCreateCompanyPage=()=>{var e=siteName+"/createCompanyPage";document.getElementById(e).innerHTML=`
	
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
`,manageGrid(document.getElementById("formHolderForCreateCompanyPage"))};function loadCreateCompanyPage(){execFrontendOnlyFunction(siteName+"/createCompanyPage",createHomeHdr(activeTab="null"),displayCreateCompanyPage)}async function handleLocationInputInCreateCompanyPage(){handleLocationInput("locationNameInputCCA","locatioNameAutoCompleteInCreateCompanyPage",`https://api.geoapify.com/v1/geocode/autocomplete?text=${document.getElementById("locationNameInputCCA").value.trim()}&apiKey=8a4e247166574725a8de05e06f3c9d74`)}function handleCompanyCreation(){displayPrompt(title="Verify Company Data",`Are you sure that the data is valid? Click 
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
	`}const displayRegisterForm=()=>{var e=siteName+"/register";document.getElementById(e).innerHTML=createRegisterForm()};function handleRegister(){var e=document.getElementById("registerLoginName").value,t=(document.getElementById("registerButton").disabled=!0,document.getElementById("registerButton").innerHTML="Please Wait...",document.getElementById("registerPassword").value),o=document.getElementById("registerName").value;fetch(siteName+"/php/auth/register.php?registerLoginName="+e+"&registerPassword="+t+"&registerName="+o).then(e=>e.json()).then(e=>{e.error?(alert("error"),document.getElementById("registerButton").disabled=!1,document.getElementById("registerButton").innerHTML="Create New Account"):location.href=siteName}).catch(e=>{document.getElementById("registerButton").disabled=!1,document.getElementById("registerButton").innerHTML="Create New Account",console.log(e)})}function loadLoginForm(){execFrontendOnlyFunction(siteName+"/login",createHomeHdr(activeTab="ddd"),displayLoginForm)}function createLoginForm(){return`
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
	`}const displayLoginForm=()=>{var e=siteName+"/login";document.getElementById(e).innerHTML=createLoginForm()};function handleLogin(){var e=document.getElementById("loginLoginName").value,t=document.getElementById("loginPassword").value;document.getElementById("loginButton").disabled=!0,document.getElementById("loginButton").innerText="Please Wait...",fetch(siteName+"/php/auth/login.php?loginLoginName="+e+"&loginPassword="+t).then(e=>e.json()).then(e=>{e.error?(alert("Incorrect username or password!"),document.getElementById("loginButton").disabled=!1,document.getElementById("loginButton").innerText="Log In"):location.href=siteName}).catch(e=>alert(e))}