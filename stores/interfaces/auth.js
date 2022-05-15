function createUserInterface() {
  let userid = 0
  if (
    typeof window !== 'undefined' &&
    sessionStorage.getItem('jobhop_loggedin_user_id')
  ) {
    userid = sessionStorage.getItem('jobhop_loggedin_user_id')
  } else {
    userid = 0
  }
  return {
    userId: parseInt(userid) || 0,
    userFName: '',
    user_LName: '',
    userName: '',
    // userPwd: '',
    userEmail: '',
    userStatus: 0,
    userType: 1,
    lastChange_Password: '',
    phoneNo: '',
    mobileNo: '',
    isLinkedInUser: false,
    userBackUpEmail: '',
    userDefaultAngl: '',
    active: 0,
    picture: '',
    pictureExt: '',
    uniqueNumber: '',
    isFirstLogin: 0,
    lastLoginDate: new Date(),
    remarks: '',
    userDefaultLAng: '',
    createD_BY: '',
    createD_DATE: new Date(),
    lasT_UPDATE_BY: '',
    lasT_UPDATE_DATE: new Date(),
    fK_GroupID: 0,
  }
}

function UpdateUserInterface() {
  let userid = 0
  let candiID = 0
  if (
    typeof window !== 'undefined' &&
    sessionStorage.getItem('jobhop_loggedin_user_id')
  ) {
    userid = sessionStorage.getItem('jobhop_loggedin_user_id')
  } else {
    userid = 0
  }
  if (
    typeof window !== 'undefined' &&
    sessionStorage.getItem('jobhop_loggedin_candidate_id')
  ) {
    candiID = sessionStorage.getItem('jobhop_loggedin_candidate_id')
  } else {
    candiID = 0
  }
  return {
    candidateID: parseInt(candiID),
    fK_UserID: parseInt(userid),
    city: 0,
    address: '',
    gender: '',
    dob: new Date(),
    fK_lkpNationality: 0,
    fK_lkpReligion: 0,
    fK_lkpMaritalStatus: 0,
    joinDate: new Date(),
    totalExperience: 0,
    remarks: '',
    resumePath: '',
    skills: '',
    createD_BY: '',
    createD_DATE: new Date(),
    lasT_UPDATE_BY: '',
    lasT_UPDATE_DATE: new Date(),
    isActive: true,
    isDeleted: false,
  }
}

export { createUserInterface, UpdateUserInterface }
