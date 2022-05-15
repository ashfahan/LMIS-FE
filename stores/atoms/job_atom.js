import { atom } from 'recoil'

const singleJob = atom({
  key: 'SELECT_CURRENT_JOB',
  default: {},
})

const allJobs = atom({
  key: 'allJob_atom',
  default: [],
})
const JobFilters = atom({
  key: 'JobFilters_ATOM',
  default: {
    jobTitle: '',
    experience: '',
    salary: '',
    jobType: '',
    company: '',
    gender: '',
    city: '',
  },
})

const JobApplicationsID_ATOM = atom({
  key: 'JOBAPPLICATIONS_ID',
  default: null,
})

export { singleJob, JobFilters, JobApplicationsID_ATOM, allJobs }
