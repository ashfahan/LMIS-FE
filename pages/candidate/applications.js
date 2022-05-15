import { LoadingOutlined } from '@ant-design/icons'
import { Col, Empty, Row, Spin } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import DashSidebar from '../../components/Dashboard/user/dashSideBar'
import SingleJobCard from '../../components/Jobs/newJobSingle'
import Navigation from '../../components/Layout/header'
// import { useQueryClient } from 'react-query';
import { getApplicationsApplied } from '../../stores/apis/candidates_api'
import { userTypeAtom } from '../../stores/atoms/app_config_atom'
import Style from '../../styles/dashboard.module.scss'

const CandidateApplications = () => {
  const userType = useRecoilValue(userTypeAtom)
  const router = useRouter()
  const { t } = useTranslation()
  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])
  useEffect(() => {
    if (userType != 1) {
      router.push('/')
    }
  }, [])

  const { isLoading, error, data } = useQuery('getApplicationsApplied', () =>
    getApplicationsApplied(
      typeof window !== 'undefined' &&
        sessionStorage.getItem('jobhop_loggedin_candidate_id'),
    ),
  )

  return (
    <div>
      <Navigation />
      <Row>
        <Col lg={4} xs={24}>
          <DashSidebar />
        </Col>
        <Col lg={20} xs={24}>
          <Row gutter={30} style={{ margin: '0', padding: '20px' }}>
            <h2 style={{ display: 'block', width: '100%', padding: '20px' }}>
              {t('application_page_heading')}
            </h2>

            {data && data.length ? (
              data.map((job) => {
                return (
                  <Col
                    lg={8}
                    md={{ span: 12, offset: 0 }}
                    sm={{ span: 18, offset: 3 }}
                    xs={24}
                    key={Math.random}
                  >
                    <Link href={`/singlejob/${job.fk_JobVacancyID}`}>
                      <div className={Style.empDashJobsCard}>
                        <SingleJobCard
                          title={
                            language === 'en'
                              ? job.jobtitleNameEn
                              : job.jobtitleNameAr
                          }
                          company={job.companyName}
                          location={job.city}
                          isDraft={false}
                          job_type={job.jobType}
                          applicantsCount={job.totalApplications}
                          applicants={job.Applicants}
                          type="new_jobs"
                        />
                      </div>
                    </Link>
                  </Col>
                )
              })
            ) : isLoading ? (
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
            ) : (
              <Empty description="No active jobs" />
            )}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default CandidateApplications
