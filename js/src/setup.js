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
	}
	

	document.getElementById('preLoaderHolder').remove();

	manageSidebars();

	loadHome();
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
	document.getElementById('leftSidebar').innerHTML = createLeftSidebar();
	document.getElementById('rightSidebar').innerHTML = createRightSidebar();
	makeSidebarsSticky();
	window.middleMainContent = document.getElementById('middleMainContent');
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

			<div class="animateScaleUP leftSidebarOptionsHolder">
				
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
				<li class = " option ${ (!IS_LOGGED_IN) ? 'd-none': ''}" id="logOutOption" onclick="logOut()">
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
	`
}