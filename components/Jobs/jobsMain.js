import { Button } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { useRecoilState, useRecoilValue } from 'recoil'
import { applyToAJob } from '../../stores/apis/jobs_api'
import { is_candidate_user } from '../../stores/atoms/app_config_atom'
import { allJobs, singleJob } from '../../stores/atoms/job_atom.js'
import { applyForJob } from '../../stores/interfaces/job'
import Style from '../../styles/jobs.module.scss'
const JobsMain = () => {
  const { t } = useTranslation()
  const [job, setJob] = useRecoilState(singleJob)
  const [jobs, setJobs] = useRecoilState(allJobs)
  const { addToast } = useToasts()
  const { mutateAsync, isLoading, isSuccess } = useMutation(applyToAJob)

  const router = useRouter()
  const isCandidate = useRecoilValue(is_candidate_user)
  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])
  const applyOnThisJob = () => {
    if (
      typeof window !== 'undefined' &&
      sessionStorage.getItem('jobhop_loggedin_user_type') != 1
    ) {
      router.push('/signin')
      return false
    }
    const interf = applyForJob()
    interf.fk_JobVacancyID = job.jobVacancyID
    mutateAsync(interf, {
      onSuccess: async (response) => {
        if (response?.isApplied)
          addToast(response.message, {
            appearance: 'error',
            autoDismiss: true,
          })
        else {
          let _job = { ...job }
          _job.isApplied = true
          setJob(_job)
          let _allJobs = [...jobs]
          let _updatejobs = _allJobs.map((item) => {
            let _item = { ...item }
            if (item.jobVacancyID === _job.jobVacancyID) {
              _item.isApplied = true
            }
            return _item
          })
          setJobs(_updatejobs)
          addToast('Applied Successfully', {
            appearance: 'success',
            autoDismiss: true,
          })
        }
      },
    })
  }

  return (
    <>
      {job &&
      Object.keys(job).length === 0 &&
      Object.getPrototypeOf(job) === Object.prototype ? null : (
        <div className={Style.jobsMainSection}>
          <div className={Style.jobsMainBox}>
            <div className={Style.mainBoxHeader}>
              <div>
                <label>
                  {job && job && language === 'en'
                    ? job.lookUpValue
                    : job.lookUpValue_Ar}
                </label>
                {/* <p>{job && job.companyName}<div></div>{job && job.city}<div></div>{job.jobType}</p> */}
                <p>
                  {job && language === 'en'
                    ? job.companyName
                    : job.companyName_Ar}
                  <div></div>
                  {job?.jobType}
                </p>
              </div>
              <div>
                <Button
                  loading={isLoading}
                  onClick={applyOnThisJob}
                  type={job.isApplied ? 'disabled' : 'primary'}
                  disabled={(job?.isApplied && true) || false}
                >
                  {job.isApplied ? 'Applied' : t('apply')}
                </Button>
              </div>
            </div>
            <div className={Style.mainBoxBody}>
              <div
                className={Style.jobDescriptionWrapper}
                dangerouslySetInnerHTML={{ __html: job && job.description }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>

    // {job && Object.keys(job).length === 0 && Object.getPrototypeOf(job) === Object.prototype ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px'}}><Spin size="large" /></div> :
    // <div className={Style.jobsMainSection}>
    //     <div className={Style.jobsMainBox}>
    //         <div className={Style.mainBoxHeader}>
    //             <label>{job.jobTitle}</label>
    //             <p>{job.fK_CompanyorDeptID}<div></div>{job.city}<div></div>-</p>
    //             <Button onClick={applyOnThisJob} type='primary'>Apply</Button>
    //         </div>
    //         <div className={Style.mainBoxBody}>
    //             <div dangerouslySetInnerHTML={{__html: job.description}}></div>
    //         </div>
    //     </div>
    // </div>
    // }</>
  )
}

export default JobsMain
