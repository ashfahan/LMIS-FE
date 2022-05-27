function addEducation() {
  let candiID = 0
  if (typeof window !== 'undefined' && sessionStorage.getItem('jobhop_loggedin_candidate_id')) {
    candiID = sessionStorage.getItem('jobhop_loggedin_candidate_id')
  } else {
    candiID = 0
  }

  return {
    educationalRecordsID: 0,
    fK_CandidateID: parseInt(candiID),
    instituteID: 0,
    startDate: new Date(),
    endDate: new Date(),
    marksObtains: 0,
    totalMarks: 0,
    degreeID: 0,
    degreePath: '',
    createD_BY: '',
    createD_DATE: new Date(),
    lasT_UPDATE_BY: '',
    lasT_UPDATE_DATE: new Date(),
    isActive: true,
    isDeleted: false,
  }
}

function addExperience() {
  let candiID = 0
  if (typeof window !== 'undefined' && sessionStorage.getItem('jobhop_loggedin_candidate_id')) {
    candiID = sessionStorage.getItem('jobhop_loggedin_candidate_id')
  } else {
    candiID = 0
  }

  return {
    candidatesEmplopymentDetailID: 0,
    fK_CandidateID: parseInt(candiID),
    lkpCompanyID: 0,
    startDate: new Date(),
    endDate: new Date(),
    salary: 0,
    designation: '',
    documentName: '',
    createD_BY: '',
    createD_DATE: new Date(),
    lasT_UPDATE_BY: '',
    lasT_UPDATE_DATE: new Date(),
    isActive: true,
    isDeleted: false,
    employmentType: 0,
    isCurrntlyWorking: false,
    location: '',
    description: '',
    instituteName: '',
    companyName_Ar: '',
    companyName: '',
  }
}

function saveJobPreferences() {
  let candiID = 0
  if (typeof window !== 'undefined' && sessionStorage.getItem('jobhop_loggedin_candidate_id')) {
    candiID = sessionStorage.getItem('jobhop_loggedin_candidate_id')
  } else {
    candiID = 0
  }

  return {
    jobPrefrancesID: 0,
    fK_CandidateID: parseInt(candiID),
    expectedSalary: 0,
    lkp_JobTitleID: 0,
    lkp_Location: 0,
    createD_BY: '',
    createD_DATE: new Date(),
    lasT_UPDATE_BY: '',
    lasT_UPDATE_DATE: new Date(),
    isActive: true,
    isDeleted: false,
    employmentType: 0,
  }
}

// function jobInterfaceInt() {
//     return  {
//         educationalRecordsID: 0,
//         fK_CandidateID: parseInt(candiID),
//         startDate: new Date(),
//         endDate: new Date(),
//         marksObtains: 0,
//         totalMarks: 0,
//         degreeID: 0,
//         degreePath: '',
//         createD_BY: '',
//         createD_DATE: new Date(),
//         lasT_UPDATE_BY: '',
//         lasT_UPDATE_DATE: new Date(),
//         isActive: true,
//         isDeleted: false,
//     }
// }

export { addEducation, addExperience, saveJobPreferences }
