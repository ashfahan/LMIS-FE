import { Empty } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from '../../../styles/dashboard.module.scss'
import JobCardSingle from '../../Jobs/jobCardSingle'

const ApprovedJobs = ({ approvedJobs }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const handleClick = (jobId) => {
    router.push(`/singlejob/${jobId}`)
  }
  const [language, setLanguage] = useState('en')
  const appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')

  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])

  return (
    <div className={style.dashApprovedJobsMain}>
      <div className={style.dashJobCategoryTitle}>
        <p>{t('approved').toUpperCase()}</p>
      </div>
      {approvedJobs?.length > 0 ? (
        approvedJobs.map((job) => {
          return (
            <JobCardSingle
              key={Math.random()}
              title={job?.jobtitleNameEn}
              company={job?.companyName}
              location={job?.cityName}
              type="recomended_jobs"
              handleClick={() => handleClick(job?.fk_JobVacancyID)}
            />
          )
        })
      ) : (
        <Empty description={t('data_not_found')} />
      )}
    </div>
  )
}

export default ApprovedJobs
