import { LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { Empty, Spin } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getJobsByFilter } from '../../stores/apis/jobs_api'
import { allJobs, JobFilters, singleJob } from '../../stores/atoms/job_atom.js'
import StyleDashboard from '../../styles/dashboard.module.scss'
import Style from '../../styles/jobs.module.scss'

const JobsList = () => {
  const { t } = useTranslation()
  const [job, setJob] = useRecoilState(singleJob)
  const JobFiltersInline = useRecoilValue(JobFilters)
  const [jobs, setJobs] = useRecoilState(allJobs)
  const [filterJob, setFilterJob] = useState([])
  const { mutateAsync, isLoading, error, isSuccess } =
    useMutation(getJobsByFilter)
  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')

  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])

  useEffect(async () => {
    let _filter = { ...JobFiltersInline }
    _filter.candidateId = parseInt(
      sessionStorage.getItem('jobhop_loggedin_candidate_id'),
    )
    mutateAsync(_filter, {
      onSuccess: async (responce) => {
        let _jobs = responce?.filter(
          (job) =>
            job.draft === false && new Date(job.lateDatetoApply) >= new Date(),
        )
        responce && setJobs(_jobs)
        responce && setFilterJob(_jobs)
        responce && _jobs.length > 0 ? setJob(_jobs?.[0]) : setJob({})
      },
    })
  }, [JobFiltersInline])

  const [current, setCurrent] = useState(0)

  if (isLoading) {
    // setJob({});
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
        }}
      >
        <Spin
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      </div>
    )
  }
  if (error) return 'An error has occurred: ' + error.message

  const onSingleJobSelect = (job, index) => {
    setCurrent(index)
    setJob(job)
  }
  const date_options = { year: 'numeric', month: 'short', day: 'numeric' }

  return (
    <div>
      <Link href={`/dashboard`}>
        <div
          style={{
            color: '#101010',
            paddingBottom: '12px',
            display: 'block',
            cursor: 'pointer',
          }}
        >
          <LeftOutlined className={Style.icon} />{' '}
          <span className={Style.backText}>BACK</span>
        </div>
      </Link>
      <div className={Style.listOfJobs}>
        <ul>
          {jobs && jobs.length > 0 ? (
            jobs.map((job, i) => {
              return (
                <>
                  <li
                    key={i}
                    className={`${[
                      Style.listItemJobs,
                      i === current ? Style.itemActive : '',
                    ].join(' ')} ${Style.desktop_jobs_listing} ${
                      StyleDashboard.overLay
                    }`}
                    onClick={() => onSingleJobSelect(job, i)}
                  >
                    <strong>
                      {language === 'en' ? job.lookUpValue : job.lookUpValue_Ar}
                    </strong>
                    {/* <p>{job.companyName}{job.city && <div></div>}{job.city && job.city}{job.jobType && <div></div>}{job.jobType}</p>     */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p>
                        {language === 'en'
                          ? job.companyName
                          : job.companyName_Ar}
                        {job?.jobType && <div></div>}
                        {job?.jobType}
                      </p>
                      <p>
                        {new Date(job.lateDatetoApply).toLocaleDateString(
                          'en-US',
                          date_options,
                        )}
                      </p>
                    </div>
                    <p>{job?.cityName}</p>
                  </li>
                  <Link
                    href={{
                      pathname: `/singlejob/${job.jobVacancyID}`,
                      query: { applyBtn: true, isApplied: job?.isApplied },
                    }}
                  >
                    <li
                      key={i}
                      className={`${[
                        Style.listItemJobs,
                        i === current ? Style.itemActive : '',
                      ].join(' ')} ${Style.mobile_jobs_listing}`}
                      onClick={() => onSingleJobSelect(job, i)}
                    >
                      <strong>
                        {language === 'en'
                          ? job.lookUpValue
                          : job.lookUpValue_Ar}
                      </strong>
                      {/* <p>{job.companyName}{job.city && <div></div>}{job.city && job.city}{job.jobType && <div></div>}{job.jobType}</p>     */}
                      <p>
                        {language === 'en'
                          ? job.companyName
                          : job.companyName_Ar}
                        {job?.jobType && <div></div>}
                        {job?.jobType}
                      </p>
                    </li>
                  </Link>
                </>
              )
            })
          ) : (
            <Empty description={t('data_not_found')} />
          )}
        </ul>
      </div>
    </div>
  )
}

export default JobsList
