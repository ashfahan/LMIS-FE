import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Style from '../../../styles/dashboard.module.scss'
import SavedJob from '../../Jobs/savedJobSingle'
import DataNotFound from '../dataNotFound'

const SavedJobs = (props) => {
  const [jobs, setjobs] = useState([])
  const { t } = useTranslation()
  return (
    <div className={Style.dashSavedJobsMain}>
      <div className={Style.dashJobCategoryTitle}>
        <p>
          {t('saved_jobs').toUpperCase()} <a href="#">{t('view_all')}</a>
        </p>
      </div>
      {jobs && jobs.length > 0 ? (
        jobs.map((job) => {
          return (
            <SavedJob
              key={job.Title}
              title={job.Title}
              company={job.Company}
              location={job.Location}
              job_type={job.Job_Type}
              type="saved_jobs"
            />
          )
        })
      ) : (
        <DataNotFound title={t('data_not_found')} />
      )}
    </div>
  )
}

export default SavedJobs
