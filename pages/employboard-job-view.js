import { Button, Col, Row } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import TopFiveCandidatesCard from '../components/Dashboard/employer/candidates/topFiveCandidatesCard'
import EmpDashSidebar from '../components/Dashboard/employer/empDashSidebar'
import EmpDashJobSingleInfo from '../components/Dashboard/employer/jobs/epmDashSingleInfo'
import Viewjobdescription from '../components/Dashboard/employer/viewJobDescription'
import Navigation from '../components/Layout/header'
import Style from '../styles/empDashJobs.module.scss'

const EmployboardJobView = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Navigation />
      <Row style={{ gap: '20px' }}>
        <Col lg={4} xs={2}>
          <EmpDashSidebar />
        </Col>
        <Col lg={4} xs={20} style={{ paddingTop: '30px' }}>
          <EmpDashJobSingleInfo />
          <TopFiveCandidatesCard
            cardTitle={t('top_5_candidates')}
            cardText={t('list_of_candidates_who_qualify_most')}
            nameOne="Brad Gorden"
            nameTwo="Gabriel Taylor"
            nameThree="michelle Swift"
            nameFour="Talia Lee"
            nameFive="Chris Wilson"
          />
        </Col>
        <Col flex="0 1 44%" xs={24} style={{ paddingTop: '30px' }}>
          <Viewjobdescription />
        </Col>
        <Col lg={4} xs={24} style={{ paddingTop: '30px' }}>
          <div className={Style.empJobViewRightBtns}>
            <Button className={Style.btn} block>
              {t('edit_requirements')}
            </Button>
            <Button type="primary" className={Style.btn} block>
              {t('view_candidates')}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default EmployboardJobView
