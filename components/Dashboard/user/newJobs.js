import { Col } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Style from '../../../styles/dashboard.module.scss'
import SingleJob from '../../Jobs/newJobSingle'
import DataNotFound from '../dataNotFound'

const NewJobs = ({ jobs, handleLinkClick }) => {
  const { t } = useTranslation()
  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])
  return (
    <div className={Style.dashNewJobsMain}>
      <div className={Style.dashJobCategoryTitle}>
        <p className={`${Style.dFlex}`}>
          <span style={{ flex: 1 }}>{t('new_jobs').toUpperCase()}</span>{' '}
          <a onClick={() => handleLinkClick()}>{t('view_all')}</a>
        </p>
      </div>
      {jobs?.length > 0 ? (
        jobs.map((job) => {
          return (
            <Link key={Math.random()} href={`/job/${job.jobVacancyID}`}>
              <Col>
                <SingleJob
                  key={Math.random()}
                  title={
                    language === 'en' ? job.lookUpValue : job.lookUpValue_Ar
                  }
                  company={
                    language === 'en' ? job.companyName : job.companyName_Ar
                  }
                  location={job.cityName}
                  job_type={job.jobType}
                  applicants={job.Applicants}
                  applicantsCount={job.totalApplications}
                  type="new_jobs"
                />
              </Col>
            </Link>
          )
        })
      ) : (
        <DataNotFound title={t('data_not_found')} />
      )}
    </div>
  )
}

export default NewJobs
