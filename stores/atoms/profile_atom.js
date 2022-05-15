import { atom } from 'recoil'

const UploadCV_atom = atom({
  key: 'UPLOAD_CV',
  default: {},
})

const User_Info_atom = atom({
  key: 'User_Info_atom',
  default: {},
})

const Candidate_Education_Added = atom({
  key: 'Candidate_Education_Added',
  default: [],
})

const Candidate_Experience_Added = atom({
  key: 'Candidate_Experience_Added',
  default: [],
})

const Experience_to_Edit_atom = atom({
  key: 'Experience_to_Edit',
  default: {},
})

const Education_to_Edit_atom = atom({
  key: 'Education_to_Edit',
  default: {},
})

export {
  UploadCV_atom,
  User_Info_atom,
  Candidate_Education_Added,
  Candidate_Experience_Added,
  Experience_to_Edit_atom,
  Education_to_Edit_atom,
}
