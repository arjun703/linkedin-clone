function loadLimitedContentOfApplicants(applicantNo, preLimit, jobId){


	var divId = siteName + `/jobs/${jobId}/limited/${applicantNo}`;
	
	var hdrTable = createGeneralHdr(`Applicant #${applicantNo}`);
	
	var serverURL = siteName + '/php/profile/limitedView.php?jobId='+jobId+'&preLimit='+preLimit;

	loadTab(divId, serverURL, displayLimitedView, hdrTable);


}

const displayLimitedView = (data, divIdd) => {



	window.VIEWING_PROFILE_OF ="DSFSDFAFAFDASFAFDSFFSDFSF";

	var profileHolder = ``

	
	profileHolder +=  displayExperiences(data.experiences) +
						displaySkills(data.skills) +
						displayProjects(data.projects) +
						displayEducations(data.educations)

	document.getElementById(divIdd).innerHTML = profileHolder;

}
