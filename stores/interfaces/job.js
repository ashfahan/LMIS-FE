function applyForJob() {
  let candiID = 0
  if (
    typeof window !== 'undefined' &&
    sessionStorage.getItem('jobhop_loggedin_candidate_id')
  ) {
    candiID = sessionStorage.getItem('jobhop_loggedin_candidate_id')
  } else {
    candiID = 0
  }

  return {
    jobApplicationsID: 0,
    fk_JobVacancyID: 0,
    fk_CandidateID: parseInt(candiID),
    createD_BY: '',
    createD_DATE: new Date(),
    lasT_UPDATE_BY: '',
    lasT_UPDATE_DATE: new Date(),
    isActive: true,
    isDeleted: false,
    currentStatus: '',
  }
}

export { applyForJob }
