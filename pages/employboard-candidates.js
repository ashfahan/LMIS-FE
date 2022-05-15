import { LoadingOutlined } from '@ant-design/icons'
import { Col, Input, Row, Spin, Tabs } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import EmpDashCandidates from '../components/Dashboard/employer/candidates/empDashCandidates'
import EmpDashSidebar from '../components/Dashboard/employer/empDashSidebar'
import Navigation from '../components/Layout/header'
import auth from '../shared/auth'
import { getCandidates } from '../stores/apis/candidates_api'
import { userTypeAtom } from '../stores/atoms/app_config_atom'
import Style from '../styles/empDashCandidates.module.scss'

const EmployboardCandidates = () => {
  const { t } = useTranslation()
  const { TabPane } = Tabs
  const router = useRouter()

  const searchRef = useRef('')
  const userType = useRecoilValue(userTypeAtom)
  const [Approved, setApproved] = useState([])
  const [AllApplicants, seAllApp] = useState([])
  const [filterAllApplicants, setFilterAllApplicants] = useState([])
  const [filterApprovedApplicants, setFilterApprovedApplicants] = useState([])
  const [filterRejectedApplicants, setFilterRejectedApplicants] = useState([])
  const [filterShortlistedApplicants, setFilterShortlistedApplicants] =
    useState([])
  const [Shortlisted, setShortlisted] = useState([])
  const [Rejected, setRejected] = useState([])
  const [searchKeywords, setSearchKeywords] = useState('')
  const [currentTab, setCurrentTab] = useState('1')
  const handleSearchChange = (search) => {
    let _allApplicants = AllApplicants
    switch (currentTab) {
      case '1':
        _allApplicants = AllApplicants
        break
      case '2':
        _allApplicants = Approved
        break
      case '3':
        _allApplicants = Shortlisted
        break
      case '4':
        _allApplicants = Rejected
        break
    }
    let searchKeyword = search.toLowerCase()
    if (searchKeyword !== '') {
      _allApplicants = _allApplicants.filter((candidate) =>
        candidate.userName.toLowerCase().includes(searchKeyword),
      )
    }
    setSearchKeywords(searchKeyword)
    setFilterAllApplicants(_allApplicants)
    setFilterApprovedApplicants(_allApplicants)
    setFilterRejectedApplicants(_allApplicants)
    setFilterShortlistedApplicants(_allApplicants)
  }
  useEffect(() => {
    if (!auth()) {
      router.push('/')
    }
  }, [])
  useEffect(() => {
    handleSearchChange('')
  }, [currentTab])
  const { isLoading, error, data } = useQuery('getCandidates', getCandidates, {
    onSuccess: (response) => {
      let allApp = response || []
      let app = response?.filter((candi) => candi.currentStatus === 'approved')
      let sh = response?.filter(
        (candi) => candi.currentStatus === 'shortlisted',
      )
      let rj = response?.filter((candi) => candi.currentStatus === 'rejected')
      setApproved(app)
      setShortlisted(sh)
      setRejected(rj)
      seAllApp(allApp)

      setFilterAllApplicants(allApp)
      setFilterApprovedApplicants(app)
      setFilterRejectedApplicants(rj)
      setFilterShortlistedApplicants(sh)
    },
  })

  // if (error) return "An error has occurred: " + error.message;

  const handleTabChange = (value) => {
    setCurrentTab(value)
  }

  return (
    <div>
      <Navigation />
      <Row>
        <Col lg={4} xs={24}>
          <EmpDashSidebar />
        </Col>

        <Col lg={20} xs={24} style={{ padding: '30px 20px 30px' }}>
          <Row>
            <div className={Style.empDashCandidatesTop}>
              <h2>{t('all_candidates')}</h2>
              {/* <Button
                className={Style.filterBtn}
                size="large"
                icon={<FilterOutlined />}
              >
                {t("filters")}
              </Button> */}
              <div>
                <Input
                  value={searchKeywords}
                  placeholder="Search"
                  onChange={(event) => handleSearchChange(event.target.value)}
                />
              </div>
            </div>
          </Row>
          {!isLoading ? (
            <Row>
              <Col xs={24}>
                <div
                  className={`${Style.empDashCandidatesTabs}${Style.empDashCandidatesTabsCustom}`}
                >
                  <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                    {' '}
                    {/*onChange={callback}*/}
                    <TabPane tab={t('new_applicants').toUpperCase()} key="1">
                      <EmpDashCandidates data={filterAllApplicants} />
                    </TabPane>
                    <TabPane tab={t('approved').toUpperCase()} key="2">
                      <EmpDashCandidates data={filterApprovedApplicants} />
                    </TabPane>
                    <TabPane tab={t('shortlisted').toUpperCase()} key="3">
                      <EmpDashCandidates data={filterShortlistedApplicants} />
                    </TabPane>
                    <TabPane tab={t('rejected').toUpperCase()} key="4">
                      <EmpDashCandidates data={filterRejectedApplicants} />
                    </TabPane>
                  </Tabs>
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
              <Spin
                size="large"
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default EmployboardCandidates
