import { Empty } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Style from '../../../styles/dashboard.module.scss'
import JobCardSingle from '../../Jobs/jobCardSingle'

const ShortListedJobs = ({ shortListedJobs }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const handleClick = (jobId) => {
    router.push(`/singlejob/${jobId}`)
  }
  return (
    <div className={Style.dashApprovedJobsMain}>
      <div className={Style.dashJobCategoryTitle}>
        <p>{t('shortlisted').toUpperCase()}</p>
      </div>
      {shortListedJobs?.length > 0 ? (
        shortListedJobs.map((job) => {
          return (
            <JobCardSingle
              key={Math.random()}
              title={job?.jobtitleNameEn}
              company={job?.companyName}
              location={job?.cityName}
              handleClick={() => handleClick(job?.fk_JobVacancyID)}
              type="recomended_jobs"
            />
          )
        })
      ) : (
        <Empty description={t('data_not_found')} />
      )}
    </div>
  )
}
export default ShortListedJobs
