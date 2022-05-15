import { LoadingOutlined } from '@ant-design/icons'
import { Col, Empty, Row, Spin, Tabs } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { getDraftJobs, getJobsByFilter } from '../../../../stores/apis/jobs_api'
import { JobFilters } from '../../../../stores/atoms/job_atom.js'
import SingleJobCard from '../../../Jobs/newJobSingle'
import Style from './allJobCards.module.scss'

const AllJobCards = () => {
  const { t } = useTranslation()
  const JobFiltersInline = useRecoilValue(JobFilters)
  const [liveJobs, setLiveJobs] = useState([])
  const [closedJob, setClosedJob] = useState([])
  // const {isLoading, error, data:liveJobs} = useQuery("getJobs", getJobs);
  const { mutateAsync, isLoading, error, isSuccess } =
    useMutation(getJobsByFilter)
  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])
  useEffect(() => {
    mutateAsync(JobFiltersInline, {
      onSuccess: async (responce) => {
        let _data = responce?.filter(
          (job) =>
            job.draft === false && new Date(job.lateDatetoApply) >= new Date(),
        )
        setLiveJobs(_data)
        let _closedJob = responce?.filter(
          (job) =>
            job.draft === false && new Date(job.lateDatetoApply) < new Date(),
        )
        setClosedJob(_closedJob)
      },
    })
  }, [JobFiltersInline])
  const { data: draftJobs } = useQuery('getDraftJobs', getDraftJobs)
  if (isLoading)
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
  if (error) return 'An error has occurred: ' + error.message

  const { TabPane } = Tabs

  return (
    <div className={Style.allJobsMain}>
      <Tabs defaultActiveKey="1">
        {' '}
        {/*onChange={callback}*/}
        <TabPane tab={t('active_jobs').toUpperCase()} key="1">
          <Row gutter={{ lg: 30, md: 10 }} style={{ margin: 0 }}>
            {liveJobs && liveJobs.length ? (
              liveJobs.map((job) => {
                return (
                  <Col
                    lg={8}
                    md={{ span: 11, offset: 0 }}
                    sm={{ span: 22, offset: 0 }}
                    xs={{ span: 22, offset: 0 }}
                    key={Math.random}
                  >
                    <Link href={`/job/${job.jobVacancyID}`}>
                      <div className={Style.empDashJobsCard}>
                        <SingleJobCard
                          title={
                            language === 'en'
                              ? job.lookUpValue
                              : job.lookUpValue_Ar
                          }
                          company={
                            language === 'en'
                              ? job.companyName
                              : job.companyName_Ar
                          }
                          location={job.cityName}
                          isDraft={false}
                          applicantsCount={job.totalApplications}
                          job_type={job.jobType}
                          applicants={job.Applicants}
                          type="new_jobs"
                        />
                      </div>
                    </Link>
                  </Col>
                )
              })
            ) : (
              <Empty description={t('data_not_found')} />
            )}
          </Row>
        </TabPane>
        <TabPane tab={t('draft_jobs').toUpperCase()} key="2">
          <Row gutter={{ lg: 30, md: 10 }} style={{ margin: 0 }}>
            {draftJobs && draftJobs.length > 0 ? (
              draftJobs.map((job) => {
                return (
                  <Col
                    lg={8}
                    md={{ span: 11, offset: 0 }}
                    sm={{ span: 22, offset: 0 }}
                    xs={{ span: 22, offset: 0 }}
                    key={Math.random}
                  >
                    <Link href={`/draftjob/${job.jobVacancyID}`}>
                      <div className={Style.empDashJobsCard}>
                        <SingleJobCard
                          title={
                            language === 'en'
                              ? job.lookUpValue
                              : job.lookUpValue_Ar
                          }
                          company={
                            language === 'en'
                              ? job.companyName
                              : job.companyName_Ar
                          }
                          location={job.cityName}
                          isDraft={true}
                          job_type={job.jobType}
                          applicants={job.Applicants}
                          type="new_jobs"
                        />
                      </div>
                    </Link>
                  </Col>
                )
              })
            ) : (
              <Empty description={t('data_not_found')} />
            )}
          </Row>
        </TabPane>
        <TabPane tab={t('closed_jobs').toUpperCase()} key="3">
          <Row gutter={{ lg: 30, md: 10 }} style={{ margin: 0 }}>
            {closedJob && closedJob.length > 0 ? (
              closedJob.map((job) => {
                return (
                  <Col
                    lg={8}
                    md={{ span: 11, offset: 0 }}
                    sm={{ span: 22, offset: 0 }}
                    xs={{ span: 22, offset: 0 }}
                    key={Math.random}
                  >
                    {/* <Link href={`/draftjob/${job.jobVacancyID}`}> */}
                    <div className={Style.empDashJobsCard}>
                      <SingleJobCard
                        title={
                          language === 'en'
                            ? job.lookUpValue
                            : job.lookUpValue_Ar
                        }
                        company={
                          language === 'en'
                            ? job.companyName
                            : job.companyName_Ar
                        }
                        location={job.cityName}
                        isDraft={true}
                        job_type={job.jobType}
                        applicants={job.Applicants}
                        type="new_jobs"
                      />
                    </div>
                    {/* </Link> */}
                  </Col>
                )
              })
            ) : (
              <Empty description={t('data_not_found')} />
            )}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AllJobCards
