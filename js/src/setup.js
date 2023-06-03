function setup(){
	fetch(siteName + '/php/auth/checkLoginStatus.php' )
	.then(response => response.json())
	.then(data => {
		handleCheckLoginStatusData(data);
	})
}


function handleCheckLoginStatusData(data){
	if(data.isNotLoggedIn){
		window.IS_LOGGED_IN = false;
	}
	else{
		window.IS_LOGGED_IN = true;
		window.PROFILE_VISITS_COUNT = data.profileVisitsCount;
		window.CV_DOWNLOADS_COUNT = data.CVdownloadsCount;
		window.LOGIN_NAME = data.loginName;
		window.HAS_COMPANY_PAGE = data.hasCompanyPage;
		if(window.HAS_COMPANY_PAGE){
			window.COMPANY_ID = data.companyId;
		}
	}

	if(getCookieValue('employerMode') != '' )	window.EMPLOYER_MODE = true
	else window.EMPLOYER_MODE = false;
	
	
	document.getElementById('preLoaderHolder').remove();

	manageSidebars();

	if(EMPLOYER_MODE && IS_LOGGED_IN) loadPostedJobs()
	else if( !EMPLOYER_MODE ) loadHome()
	else loadPostJobForm()
}


function returnTopOfMiddleMainContent(){
	return document.getElementById('middleMainContent').getBoundingClientRect().top + 5+ "px";
}


function makeSidebarsSticky(){
	var elements = document.getElementsByClassName('stickyLeftOrRight')

	for(var i = 0; i < elements.length; i++){
		var topp = returnTopOfMiddleMainContent()
		elements[i].style.top = topp;
	}

}

function manageSidebars(){
	
	document.getElementById('hdrLeftPart').innerHTML = handleHdrLeftPart();
	document.getElementById('hdrRightPart').innerHTML = handleHdrRightPart();
	document.getElementById('rightSidebar').innerHTML = createRightSidebar();

	window.middleMainContent = document.getElementById('middleMainContent');
	
	if(EMPLOYER_MODE){
		document.getElementById('leftSidebar').remove();
		document.getElementById('middleMainContent').classList.remove('col-md-6');
		document.getElementById('middleMainContent').classList.add('col-md-9');
	}
	else{
		document.getElementById('leftSidebar').innerHTML = createLeftSidebar();
	}
	makeSidebarsSticky();

}


function handleHdrLeftPart(){
	
	return `
		<div style="margin-left: 15px; ">
			<span class="h4">MyDJ</span>
			<br>
			<small style="font-size: 12px;">Meet your Dream Job!</small>
		</div>
	`
}

function handleHdrRightPart(){
	return `
		<div  class="d-flex justify-content-center" >
			<div class="topRightIcon" onclick="toggleMenuInDesktop()">
				<table>
					<tr>
						<td>
							<i class="fa fa-circle-user"></i>
						</td>
						<td style="padding-left: 5px;" class= "loginNameHolder">
							@${ (IS_LOGGED_IN) 
							? LOGIN_NAME 
							: 'guest' 
							}
						</td>
						<td style="font-size: 10px;padding-left: 5px;">
							▼ 
						</td>
					</tr>
				</table>
			</div>
		</div>
	`
}

function createLeftSidebar(){
	return `
		<div class="stickyLeftOrRight">

			<div class="animateScaleUP ${EMPLOYER_MODE ? 'd-none' : ''} leftSidebarOptionsHolder">
				
				<div  class="text-center pt-2">
					Good ${getPartOfDay()}, 
					<span  class = 'loginNameHolder'>
							
						@${ (IS_LOGGED_IN) 
							? LOGIN_NAME 
							: 'guest' 
						}
					</span>
				</div>
				<hr>
				<div  class="lso">
					<div class="fontSize17">Your Profile Visited By</div>
					<div id="ProfileVisitsCountHolder">
							${	(IS_LOGGED_IN) 
								? PROFILE_VISITS_COUNT + ' Employers'
								: '<span onclick = "loadLoginForm()" class = "softLink">Login</span> to view' 
							}
					</div>							
				</div>
				<hr>
				<div class="lso mb-3">
					<div class="fontSize17">Your CV Downloaded By</div>
					<div  id="CVdownloadsCountHolder">
							${	(IS_LOGGED_IN) 
								? CV_DOWNLOADS_COUNT + ' Employers'
								: '<span onclick = "loadLoginForm()" class = "softLink">Login</span> to view' 
							}
					</div>
				</div>
			</div>

			<div class = "rightSidebarOptionsHolder  ${EMPLOYER_MODE ? 'd-none' : ''} ">
				<h6 class="text-center">Jobs Categories</h6>
				<span class = "softLink" onclick ="loadJobsByCategory('so')">Software</span>
				<br>
				<span class = "softLink" onclick ="loadJobsByCategory('ne')" >Networking and Hardware</span>
				<br>
				<span class = "softLink" onclick ="loadJobsByCategory('hu')">Human Resources</span>
				<br>
			</div>
		</div>
	`	
}


function setEmployerMode(){
	
	if(getCookieValue('employerMode') == '') document.cookie = 'employerMode=true'
	else document.cookie = 'employerMode='
	document.getElementById('employerMode').classList.add('rotateAnimation')
	setTimeout(()=>{location.href = siteName;}, 1000);
	
}

function createRightSidebar(){
	return `
		<div class="stickyLeftOrRight">
			<div id="menuItems" class="animateScaleUP rightSidebarOptionsHolder">
				<li class = "option ${IS_LOGGED_IN ? 'd-none' : '' } " id="registerOption"  onclick="loadRegisterForm()">
					<i class ="fa fa-user-plus"></i>Create New Account
				</li>
				
				<li class = " option ${IS_LOGGED_IN ? 'd-none' : '' }" id="logInOption" onclick="loadLoginForm()">
					<i class="fa fa-sign-in"></i>Log In
				</li>
				
				<li onclick =  "${ IS_LOGGED_IN ? ' viewOwnProfile() ' : 'displayLoginOverlay(\'View Profile\', \'view your profile\')' } "   class="option requiresLogin">
					<i class="fa fa-eye"></i>View your Profile
				</li>
				
				<li class="option"
				 onclick=" ${ 
						 		IS_LOGGED_IN
						 		? HAS_COMPANY_PAGE
						 			? 'loadCompanyPage('+COMPANY_ID+')'
						 		   	: 'loadCreateCompanyPage()'
						 		: 'loadCreateCompanyPage()'
				  			}
				  		" 
				>
					${ 
				 		IS_LOGGED_IN
				 		? HAS_COMPANY_PAGE
			 				? "<i class = 'fa fa-building'></i>Your Company Page"
			 		   		: "<i class = 'fa fa-plus'></i>Create Company Page"
				 		: "<i class = 'fa fa-plus'></i>Create Company Page"
				  	} 
				</li>
				<li class="option" onclick="toggle()">
					<i class="fa fa-moon"></i>Day/Night Mode
				</li>
				<li class="option" onclick="setEmployerMode()">
					<i id ="employerMode" class="fa fa-toggle-off"></i>Employer/Employee Mode
				</li>
				<li class = " option ${ (!IS_LOGGED_IN) ? 'd-none': ''}" id="logOutOption" onclick="logOut()">
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
	`
}