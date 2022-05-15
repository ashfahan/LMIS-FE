import { LoadingOutlined } from '@ant-design/icons'
import { Col, Row, Spin } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import EmpDashChartsBars from '../components/Dashboard/employer/empDashChartBars'
import EmpDashChartsPie from '../components/Dashboard/employer/empDashChartPie'
import EmpDashSidebar from '../components/Dashboard/employer/empDashSidebar'
import EmpDashTopCities from '../components/Dashboard/employer/empDashTopCities'
import EmpDashTopCompanies from '../components/Dashboard/employer/empDashTopCompanies'
import EmpDashTopIndustries from '../components/Dashboard/employer/empDashTopIndustries'
import EmpDashTopJobs from '../components/Dashboard/employer/empDashTopJobs'
import EmpDashTopUniversities from '../components/Dashboard/employer/empDashTopUniversities'
import NewApplications from '../components/Dashboard/employer/empNewApplications'
import NewJobs from '../components/Dashboard/user/newJobs'
import SearchJobs from '../components/Dashboard/user/searchJobs'
import Navigation from '../components/Layout/header'
import auth from '../shared/auth'
import { permissionsEnum } from '../shared/permissionsEnum'
import { getOverView } from '../stores/apis/jobs_api'
import Style from '../styles/dashboard.module.scss'

const Employboard = () => {
  const { t } = useTranslation()
  const { addToast } = useToasts()
  const [isPostJobVisible, setIsPostJobVisible] = useState(true)

  const router = useRouter()
  // const userType = useRecoilValue(userTypeAtom);
  // const { isLoading, error, data } = useQuery("getOverView", () =>
  //   getOverView(`Dashboard/TopStatistics`)
  // );
  const { mutateAsync, isLoading, isSuccess, error, data } =
    useMutation(getOverView)

  useEffect(() => {
    if (!auth()) {
      router.push('/')
    }
    let _permissions = JSON.parse(sessionStorage.getItem('permissions')) || []
    setIsPostJobVisible(
      _permissions.some((item) => item === permissionsEnum.postAJob),
    )
  }, [])

  useEffect(() => {
    let _date = new Date()
    let _startingDate = new Date(_date)
    _startingDate.setDate(_startingDate.getDate() - 7)
    _startingDate = _startingDate.toDateString()
    _startingDate = moment(_startingDate).format('YYYY-MM-DD')
    _date = moment(_date).format('YYYY-MM-DD')
    getNewData(_startingDate, _date)
  }, [])

  const handleDropdownClick = (value) => {
    let _date = new Date()
    let _startingDate = new Date(_date)
    switch (value) {
      case '0':
        _startingDate.setDate(_startingDate.getDate() - 6)
        break
      case '1':
        _startingDate.setDate(_date.getDate() - 13)
        break
      case '2':
        _startingDate.setDate(_date.getDate() - 29)
        break
      case '3':
        _date = ''
        _startingDate = ''
        break
    }
    if (value !== '3') {
      _startingDate = _startingDate.toDateString()
      _startingDate = moment(_startingDate).format('YYYY-MM-DD')
      _date = moment(_date).format('YYYY-MM-DD')
    }
    getNewData(_startingDate, _date)
  }
  const getNewData = (startingDate, endingDate) => {
    let _url = `Dashboard/TopStatistics`
    if (startingDate !== '' && endingDate !== '') {
      _url += `?fromDate=${startingDate}&toDate=${endingDate}`
    }
    mutateAsync(_url, {
      onSuccess: async (response) => {},
      onError: async (error) => {
        addToast('Something went wrong.', {
          appearance: 'error',
          autoDismiss: true,
        })
      },
    })
  }

  return (
    <div>
      <Navigation />
      <Row>
        <Col lg={4} xs={24}>
          <EmpDashSidebar />
        </Col>

        <>
          <Col lg={20} xs={24}>
            <Row className={Style.dboardCenterCol}>
              <Col lg={15} xs={24}>
                <h2 className={Style.sectionTitle}>{t('overview')}</h2>
              </Col>
              <Col lg={{ span: 7, offset: 2 }} xs={24}>
                {isPostJobVisible && (
                  <SearchJobs
                    searchKeyword="post_a_job"
                    handleClick={() => {
                      router.push('post-job')
                    }}
                    handleDropdownClick={handleDropdownClick}
                  />
                )}
              </Col>
            </Row>
            {isLoading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flex: 1,
                  padding: '30px',
                }}
              >
                <Spin
                  size="large"
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              </div>
            ) : (
              <Row className={[Style.dboardCenterCol, Style.dBoardCol]}>
                <Col lg={15} xs={24}>
                  <Row gutter={30}>
                    <Col
                      lg={8}
                      md={{ span: 8, offset: 0 }}
                      // sm={{ span: 18, offset: 3 }}
                      xs={24}
                    >
                      <EmpDashChartsPie
                        title={t('job_applications').toUpperCase()}
                        linkText={t('view_all')}
                        handleLinkClick={() => {
                          router.push('/employboard-candidates')
                        }}
                        allJobApplicationsCount={
                          data?.adminDashboard?.allJobApplicationsCount
                        }
                        approvedApplicationsCount={
                          data?.adminDashboard?.approvedApplicationsCount
                        }
                        rejectedApplicationsCount={
                          data?.adminDashboard?.rejectedApplicationsCount
                        }
                        shortListedApplicationsCount={
                          data?.adminDashboard?.shortListedApplicationsCount
                        }
                      />
                      <div className={Style.pt30}>
                        <EmpDashTopCompanies
                          title={t('top_companies').toUpperCase()}
                          data={data?.adminDashboard?.topActiveCompany}
                        />
                      </div>

                      <EmpDashTopCities
                        data={data?.adminDashboard?.topCities}
                        title={t('top_cities').toUpperCase()}
                      />
                    </Col>
                    <Col
                      lg={8}
                      md={{ span: 8, offset: 0 }}
                      // sm={{ span: 18, offset: 3 }}
                      xs={24}
                    >
                      <EmpDashChartsBars
                        title={t('jobs_posted').toUpperCase()}
                        linkText={t('view_all')}
                        handleLinkClick={() => {
                          router.push('/employboard-jobs')
                        }}
                        totalRecords={data?.adminDashboard?.allJobsPostedCount}
                        data={data?.adminDashboard?.allJobsPostedGraph}
                      />
                      <div className={Style.employerJobTitles}>
                        <EmpDashTopJobs
                          title={t('top_job_titles').toUpperCase()}
                          data={data?.adminDashboard?.topActiveJobTitle}
                        />
                      </div>
                      <EmpDashTopIndustries
                        data={data?.adminDashboard?.topIndustries}
                        title={t('top_indusries').toUpperCase()}
                      />
                    </Col>
                    <Col
                      lg={8}
                      md={{ span: 8, offset: 0 }}
                      // sm={{ span: 18, offset: 3 }}
                      xs={24}
                    >
                      <EmpDashChartsBars
                        title={t('new_signups').toUpperCase()}
                        linkText={''}
                        totalRecords={data?.adminDashboard?.newSignUpsCount}
                        data={data?.adminDashboard?.newSignUpsGraph}
                      />
                      <div className={Style.pt30}>
                        <EmpDashTopUniversities
                          title={t('top_universities').toUpperCase()}
                          data={data?.adminDashboard?.topUniversities}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col lg={{ span: 7, offset: 2 }} xs={24}>
                  <div>
                    <Row>
                      <Col lg={24} sm={24} xs={24}>
                        <NewJobs
                          handleLinkClick={() => {
                            router.push('/employboard-jobs')
                          }}
                          jobs={data?.adminDashboard?.newJobs}
                        />
                      </Col>
                      <Col lg={{ span: 24, offset: 0 }} xs={24}>
                        <NewApplications
                          title={t('new_applications').toUpperCase()}
                          linkText={t('view_all')}
                          handleLinkClick={() => {
                            router.push('/employboard-candidates')
                          }}
                          jobApplication={
                            data?.adminDashboard?.newJobApplications
                          }
                        />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            )}
          </Col>
        </>
      </Row>
    </div>
  )
}

export default Employboard
