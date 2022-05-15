import { LoadingOutlined } from '@ant-design/icons'
import { Col, Row, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import ViewResume from '../../components/Dashboard/employer/applications/viewResume'
import CandidatesProfileCardSmall from '../../components/Dashboard/employer/candidates/candidatesProfileCardSmall'
import TopFiveCandidatesCard from '../../components/Dashboard/employer/candidates/topFiveCandidatesCard'
import EmpDashSidebar from '../../components/Dashboard/employer/empDashSidebar'
import Navigation from '../../components/Layout/header'
// import {useRecoilState} from 'recoil';
// import { useRouter } from 'next/router';
import { getSingleCandidate } from '../../stores/apis/candidates_api'
import Style from '../../styles/applicant.module.scss'

const ApplicantView = ({ candidateid }) => {
  // const router = useRouter();
  // const { candidateid } = router.query;
  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])
  const { isLoading, error, data } = useQuery(
    'getSingleCandidate',
    () => getSingleCandidate(candidateid),
    {
      onSuccess: async (response) => {
        console.log(response)
      },
    },
  )
  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <Navigation />

      <div className={Style.applicantDesktop}>
        <Row style={{ gap: '20px' }}>
          <Col span={4}>
            <EmpDashSidebar />
          </Col>
          {isLoading && (
            <Col span={16} style={{ paddingTop: '30px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '30px',
                }}
              >
                <Spin
                  size="large"
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              </div>
            </Col>
          )}
          {!isLoading && (
            <>
              <Col span={4} style={{ paddingTop: '30px' }}>
                <CandidatesProfileCardSmall
                  profilePic="https://picsum.photos/id/1040/40"
                  userName={data && data[0]?.userName}
                  college={data && data[0]?.universityName}
                  salary={`LYD ${data && data[0]?.expectedSalary / 1000}k - ${
                    data && data[0]?.expectedSalaryMax / 1000
                  }k`}
                  experience={`${data && data[0]?.totalExperience} years`}
                  location={
                    data && language === 'en'
                      ? data[0]?.cityName
                      : data[0]?.cityName_Ar
                  }
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
              <Col flex="0 1 44%" style={{ paddingTop: '30px' }}>
                <ViewResume candiID={data && data[0].candidateID} />
              </Col>
            </>
          )}
          {/* <Col span={4} style={{paddingTop:'30px'}}>
                    <Row>
                        <Button type='primary' block>Approved</Button>
                    </Row>
                    <Row style={{gap:'5px', justifyContent:'space-between', margin:'10px 0px 20px'}}>
                        <Button style={{flexBasis:'48%'}}>Shortlist</Button>
                        <Button style={{flexBasis:'48%'}}>Reject</Button>
                    </Row>
                    <RecentlyApplied /> 
                </Col> */}
        </Row>
      </div>
      <div className={Style.applicantMobile}>
        <Row style={{ gap: '20px' }}>
          <Col span={4}>
            <EmpDashSidebar />
          </Col>
        </Row>
        <Col style={{ paddingTop: '30px', width: '95%', margin: 'auto' }}>
          <CandidatesProfileCardSmall
            profilePic="https://picsum.photos/id/1040/40"
            userName={data && data[0]?.userName}
            college={data && data[0]?.universityName}
            salary="$36000 - $45000"
            experience={`${data && data[0]?.totalExperience} years`}
            location={data && data[0]?.cityName}
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
          style={{
            paddingTop: '30px',
            paddingBottom: '20px',
            width: '95%',
            margin: 'auto',
          }}
        >
          {candidateid && <ViewResume candiID={candidateid} />}
        </Col>
      </div>
    </div>
  )
}

export default ApplicantView

export async function getServerSideProps(context) {
  const { candidateid } = context.query
  return {
    props: { candidateid }, // will be passed to the page component as props
  }
}
