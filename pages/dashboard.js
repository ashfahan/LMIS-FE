import { InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Row, Spin } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { useRecoilValue } from 'recoil'
import ApprovedJobs from '../components/Dashboard/user/approvedJobs'
import DashSidebar from '../components/Dashboard/user/dashSideBar'
import NewJobs from '../components/Dashboard/user/newJobs'
import OverviewCharts from '../components/Dashboard/user/overviewCharts'
import RecomendedJobs from '../components/Dashboard/user/recomendedJobs'
import RejectedJobs from '../components/Dashboard/user/rejectedJobs'
import SavedJobs from '../components/Dashboard/user/savedJobs'
import SearchJobs from '../components/Dashboard/user/searchJobs'
import ShortListedJobs from '../components/Dashboard/user/shortListedJobs'
import Navigation from '../components/Layout/header'
import getProfileProgress from '../shared/getProfileProgress'
import { getOverView } from '../stores/apis/jobs_api'
import { userTypeAtom } from '../stores/atoms/app_config_atom'
import Style from '../styles/dashboard.module.scss'

const Dashboard = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [profileProgress, setProfileProgress] = useState(0)
  const { addToast } = useToasts()
  const userType = useRecoilValue(userTypeAtom)
  const { mutateAsync, isLoading, isSuccess, error, data } = useMutation(getOverView)
  useEffect(() => {
    if (userType != 1) {
      router.push('/')
    }
  }, [])

  useEffect(() => {
    let _isDpAdded = sessionStorage.getItem('isDpAdded')
    let _isCVAdded = sessionStorage.getItem('isCVAdded')
    let _isBioAdded = sessionStorage.getItem('isBioAdded')
    let _isEducationAdded = sessionStorage.getItem('isEducationAdded')
    let _isExperienceAdded = sessionStorage.getItem('isExperienceAdded')
    setProfileProgress(getProfileProgress(_isCVAdded, _isBioAdded, _isEducationAdded, _isExperienceAdded, _isDpAdded))
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
  const getNewData = (startingDate, endingDate) => {
    let _url = `Dashboard/TopStatistics?candidateId=${sessionStorage.getItem('jobhop_loggedin_candidate_id')}`
    if (startingDate !== '' && endingDate !== '') {
      _url += `&fromDate=${startingDate}&toDate=${endingDate}`
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

  const handleDropdownClick = (value) => {
    let _date = new Date()
    let _startingDate = new Date(_date)
    switch (value) {
      case '0':
        _startingDate.setDate(_startingDate.getDate() - 7)
        break
      case '1':
        _startingDate.setDate(_date.getDate() - 14)
        break
      case '2':
        _startingDate.setDate(_date.getDate() - 30)
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
  const handleUpdateButton = () => {
    router.push('/candidate/profile')
  }
  return (
    <div>
      <Navigation />
      <Row className="relative">
        <DashSidebar />
        <Col style={{ flex: '1 1 0' }}>
          {profileProgress !== 100 && (
            <div className={Style.profileUpdateBanner}>
              <div className={Style.leftIcon}>
                <InfoCircleOutlined style={{ fontSize: 20 }} />
              </div>
              <div className={Style.textContainer}>
                <p>
                  {profileProgress}% profile completed. Please update your profile and get better responses from
                  companies.
                </p>
              </div>
              <div>
                <Button className={Style.updateButton} onClick={handleUpdateButton}>
                  Update your profile
                </Button>
              </div>
            </div>
          )}

          <Row className={Style.dboardCenterCol}>
            <Col lg={15} xs={24}>
              <h2 className={Style.sectionTitle}>{t('overview')}</h2>
            </Col>
            <Col lg={{ span: 7, offset: 2 }} xs={24}>
              <SearchJobs
                searchKeyword={'search_jobs'}
                handleClick={() => {
                  router.push('jobs')
                }}
                handleDropdownClick={handleDropdownClick}
              />
            </Col>
          </Row>
          {!isLoading ? (
            <Row className={[Style.dboardCenterCol, Style.dBoardCol]}>
              <Col lg={15} xs={24}>
                <OverviewCharts
                  allJobApplicationsCount={data?.userDashboard?.allJobsApplicationCount}
                  approvedApplicationsCount={data?.userDashboard?.allApprovedApplicationsCount}
                  rejectedApplicationsCount={data?.userDashboard?.allRejectedApplicationsCount}
                  shortListedApplicationsCount={data?.userDashboard?.allShortListedApplicationsCount}
                  applicationsRateGraph={data?.userDashboard?.applicationsRateGraph}
                  perDayCount={data?.userDashboard?.perDayCount}
                />
                <div className={Style.pt30}>
                  <RecomendedJobs jobs={data?.userDashboard?.recommendedJobs} />
                </div>
                <Row className={[Style.dboardBttomCols, Style.pt30]} gutter={30}>
                  <Col lg={8} md={8} xs={24} className={Style.col}>
                    <ApprovedJobs approvedJobs={data?.userDashboard?.allApprovedApplications} />
                  </Col>
                  <Col lg={8} md={8} xs={24} className={[Style.col, Style.ptSm30]}>
                    <ShortListedJobs shortListedJobs={data?.userDashboard?.allShortListedApplications} />
                  </Col>
                  <Col lg={8} md={8} xs={24} className={[Style.col, Style.ptSm30, Style.pbSm30]}>
                    <RejectedJobs rejectedJobs={data?.userDashboard?.allRejectedApplications} />
                  </Col>
                </Row>
              </Col>
              <Col lg={{ span: 7, offset: 2 }} xs={24}>
                <div>
                  <Row>
                    <Col lg={24} md={12} xs={24}>
                      <NewJobs
                        handleLinkClick={() => {
                          router.push('/jobs')
                        }}
                        jobs={data?.userDashboard?.newJobs}
                      />
                    </Col>
                    <Col lg={24} md={12} xs={24}>
                      <SavedJobs />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '30px',
              }}
            >
              <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
