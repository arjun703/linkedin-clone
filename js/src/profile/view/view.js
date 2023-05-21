function loadViewProfile(of){

	

	var divId = siteName + '/viewProfile/' + of+'/personal';
	var hdrTable = createHomeHdr(activeTab = 'sdfdsf');
	var serverURL = 'php/profile/view/personal.php?loginName=' + of;
	//beforeLoadTab(divId, hdrTable, serverURL, displayProfile);

	execFrontendOnlyFunction(divId, hdrTable, displayProfile);

}

const displayProfile = () => {
	
	window.VIEWING_PROFILE_OF = LOGIN_NAME; // global

	var divIdd = siteName + '/viewProfile/' + LOGIN_NAME +'/personal';

	const data = {
		personal : {
			name: 'Arjun Poudel',
			summary: ' Very talentd  Very talentd  Very talentd ',
			email: 'arjunpoudel703@gmail.com',
			phone: '9840030080',
			portfolio: 'https://mydj.great-site.net',
			address: 'Dahachowk, Kathmandu, Nepal'
		},

		experiences: [
			{
				id: 12,
				position: 'PHP Developer',
				company: 'Javra Software',
				task_description: 'Handling all the website',
				from: '2020-12-15',
				to: 'Present',
			},
			{
				id: 14,
				position: 'Network Administrator',
				company: 'Sanskriti School',
				task_description: 'Handling Network Devices',
				from: '2020-02-15',
				to: '2023-02-12',
			}
		],

		skills: [
			{
				id: 1,
				skill: 'PHP'
			},
			{
				id: 3,
				skill: 'Javascript'
			},
			{
				id: 6,
				skill: 'SEO'
			},
			{
				id: 43,
				skill: 'Marketing'
			},
			{
				id: 45,
				skill: 'CSS'
			},
			{
				id: 444,
				skill: 'HTML'
			}
		],
		projects: [
			{
				id: 34,
				title: 'Mimicly',
				description: 'video sharingsharing sharing sharing sharing sharing sharing sharing sharing sharing sharing  website',
				link: 'http://mimicly.rf.gd'
			},
			{
				id: 35,
				title: 'GodJob',
				description: 'LinkedIn',
				link: 'http://godjob.rf.gd'
			},
			{
				id: 36,
				title: 'itsVidTime',
				description: 'video calling website',
				link: 'http://abc.rf.gd'
			},
		],
		educations: [
			{
				id: 33,
				level: 'Intermediate',
				institution: 'Pulchowk Campus',
				from: '2020-03-03',
				to: '2020-03-04',
				grade: '91%'
			},
			{
				id: 3,
				level: 'Bachelor',
				field: 'Electronics',
				institution: 'Pulchowk Campus',
				from: '2020-03-03',
				to: '2020-03-04',
				grade: '81%'
			},
			
			{
				id: 35,
				level: 'Master',
				field: 'VLSI',
				institution: 'Pulchowk Campus',
				from: '2020-03-03',
				to: '2020-03-04',
				grade: '91%'
			}
		]

	}

	var profileHolder = ``

	profileHolder += displayPersonal(data.personal);
	profileHolder += displayExperiences(data.experiences);
	profileHolder += displaySkills(data.skills);
	profileHolder += displayProjects(data.projects);
	profileHolder += displayEducations(data.educations);
	
	document.getElementById(divIdd).innerHTML = profileHolder;

}


function createTd(callback, btnText){
	return`
		<td style = "text-align:right"  
			onclick = '${callback}' >
			${
				createPrimaryButton(btnText)
			}
		</td>
	`
}


function createProfileSubHeader(title, profileOwnershipRequired, btnText = '', callback = ''){
	return`
		<div>
			<table class = 'fixedTable'>
				<tr>
					<td class = "h4">
						${title}
					</td>
					${
						( profileOwnershipRequired
						  ? 
						  ( VIEWING_PROFILE_OF == LOGIN_NAME
						  	? 
						  	createTd(callback, btnText)
						  	: ''
						  )

						:  createTd(callback, btnText)
						
						)
					}
				</tr>
			</table>
		</div>
	`;
}

	  
function displayProfileHeader(of){
	return `
		<div  class = "stickyMiddle p-2 mt-5 mb-5"
				style = "background: var(--bgColorOfCards); top: ${returnTopOfMiddleMainContent()}"
			> 
				${createProfileSubHeader("@"+of+"'s Profile", profileOwnershipRequired = false, "Dowwnload CV", "downloadCV('"+of+"'')")}

		</div>
		<hr>
	`

}


function deleteButton(){
	return `
		<button class= "btn  btn-danger">
			Delete
		</button>
	`
}

function createAddNewTd(callback){
	return`
		<td style = "text-align:right" onclick = "${callback}">
			${ createPrimaryButton('Add New') }
		</td>
	`
}

function createPrimaryButton(text){
	return `
		<button class = "btn btn-primary">
			${text}
		</button>
	`
}


function createDangerButton(text){
	return `
		<button class = "btn btn-danger">
			${text}
		</button>
	`
}



function viewOwnProfile(){
	loadViewProfile(LOGIN_NAME);
}
