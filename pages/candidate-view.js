import { Button, Col, Row } from 'antd'
import React from 'react'
import RecentlyApplied from '../components/Dashboard/employer/applications/recentlyApplied'
import ViewResume from '../components/Dashboard/employer/applications/viewResume'
import CandidatesProfileCardSmall from '../components/Dashboard/employer/candidates/candidatesProfileCardSmall'
import TopFiveCandidatesCard from '../components/Dashboard/employer/candidates/topFiveCandidatesCard'
import EmpDashSidebar from '../components/Dashboard/employer/empDashSidebar'
import Navigation from '../components/Layout/header'

const ViewApplication = () => {
  return (
    <div>
      <Navigation />
      <Row style={{ gap: '20px' }}>
        <Col lg={4} md={1} sm={1} xs={2}>
          <EmpDashSidebar />
        </Col>
        <Col
          lg={4}
          md={{ span: 6, offset: 0 }}
          sm={{ span: 8, offset: 0 }}
          xs={{ span: 20, offset: 2 }}
          style={{ paddingTop: '30px' }}
        >
          <CandidatesProfileCardSmall
            profilePic="https://picsum.photos/id/1040/40"
            userName="Joshua Jones"
            college="Wharton College"
            salary="$36000 - $45000"
            experience="3+ years"
            location="New York City, NY"
          />

          <TopFiveCandidatesCard
            cardTitle="Similar Candidates"
            cardText="List of candidates who closely match the criteria"
            nameOne="Brad Gorden"
            nameTwo="Gabriel Taylor"
            nameThree="michelle Swift"
            nameFour="Talia Lee"
            nameFive="Chris Wilson"
          />
        </Col>
        <Col
          lg={9}
          md={9}
          sm={{ span: 12, offset: 0 }}
          xs={{ span: 20, offset: 2 }}
          style={{ paddingTop: '30px' }}
        >
          <ViewResume />
        </Col>
        <Col
          lg={5}
          md={{ span: 6, offset: 0 }}
          sm={{ span: 18, offset: 3 }}
          xs={{ span: 20, offset: 2 }}
          style={{ paddingTop: '30px' }}
        >
          <Row>
            <Button type="primary" block>
              Approved
            </Button>
          </Row>
          <Row
            style={{
              gap: '5px',
              justifyContent: 'space-between',
              margin: '10px 0px 20px',
            }}
          >
            <Button style={{ flexBasis: '48%' }}>Shortlist</Button>
            <Button style={{ flexBasis: '48%' }}>Reject</Button>
          </Row>
          <RecentlyApplied />
        </Col>
      </Row>
    </div>
  )
}

export default ViewApplication
