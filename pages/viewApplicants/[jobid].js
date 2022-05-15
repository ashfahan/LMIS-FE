import { FilterOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Empty, Row, Spin, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import CandidatesProfileCard from '../../components/Dashboard/employer/candidates/candidatesProfileCard'
import EmpDashSidebar from '../../components/Dashboard/employer/empDashSidebar'
import Navigation from '../../components/Layout/header'
import { getApplicantsByJobID } from '../../stores/apis/jobs_api'
import NewStyle from '../../styles/applicant.module.scss'
import Style from '../../styles/empDashCandidates.module.scss'

const ViewAppplicants = ({ jobid }) => {
  const { TabPane } = Tabs
  const [Approved, setApproved] = useState([])
  const [AllApplicantgs, seAllApp] = useState([])

  const [Shortlisted, setShortlisted] = useState([])
  const [Rejected, setRejected] = useState([])

  const { isLoading, error, data } = useQuery(
    'getApplicantsByJobID',
    () => getApplicantsByJobID(jobid),
    {
      onSuccess: (response) => {
        let allApp = response?.filter((candi) => candi.currentStatus === '')
        let app = response?.filter(
          (candi) => candi.currentStatus === 'approved',
        )
        let sh = response?.filter(
          (candi) => candi.currentStatus === 'shortlisted',
        )
        let rj = response?.filter((candi) => candi.currentStatus === 'rejected')
        setApproved(app)
        setShortlisted(sh)
        setRejected(rj)
        seAllApp(allApp)
      },
    },
  )
  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])
  return (
    <div>
      <Navigation />
      <div className={NewStyle.applicantDesktop}>
        <Row>
          <Col span={4}>
            <EmpDashSidebar />
          </Col>

          <Col span={18} style={{ padding: '30px 0px 30px 30px' }}>
            <Row>
              <div className={Style.empDashCandidatesTop}>
                <h2>Candidates</h2>
                <Button
                  className={Style.filterBtn}
                  size="large"
                  icon={<FilterOutlined />}
                >
                  Filters
                </Button>
              </div>
            </Row>
            {!isLoading ? (
              <Row>
                <div className={Style.empDashCandidatesTabs}>
                  <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
                    {' '}
                    {/*onChange={callback}*/}
                    <TabPane tab="ALL APPLICANTS" key="1">
                      <Row gutter={30}>
                        {data && data?.length > 0 ? (
                          data.map((candi) => (
                            <Col span={12} key={candi.candidateID}>
                              <CandidatesProfileCard
                                id={candi.userId}
                                jobApplicationID={candi.jobApplicationsID}
                                candiid={candi.fk_CandidateID}
                                pictureExtention={candi.picture}
                                name={candi.userName}
                                jobid={jobid}
                                status={candi.currentStatus}
                                // designation={candidate.Designation}
                                // college={candidate.College}
                                // salary={candidate.Salary}
                                // experience={candidate.Experience}
                                location={
                                  language === 'en'
                                    ? candi.candidate_CityName
                                    : candi.candidate_CityName_Ar
                                }
                              />
                            </Col>
                          ))
                        ) : (
                          <div>
                            <Empty description="No applicants" />
                          </div>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tab="APPROVED" key="2">
                      <Row gutter={30}>
                        {Approved && Approved?.length > 0 ? (
                          Approved.map((candi) => (
                            <Col span={12} key={candi.candidateID}>
                              <CandidatesProfileCard
                                id={candi.userId}
                                jobApplicationID={candi.jobApplicationsID}
                                candiid={candi.fk_CandidateID}
                                pictureExtention={candi.picture}
                                name={candi.userName}
                                jobid={jobid}
                                status={candi.currentStatus}
                                // designation={candidate.Designation}
                                // college={candidate.College}
                                // salary={candidate.Salary}
                                // experience={candidate.Experience}
                                location={
                                  language === 'en'
                                    ? candi.candidate_CityName
                                    : candi.candidate_CityName_Ar
                                }
                              />
                            </Col>
                          ))
                        ) : (
                          <div>
                            <Empty description="No shortlisted applicants" />
                          </div>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tab="SHORTLISTED" key="3">
                      <Row gutter={30}>
                        {Shortlisted && Shortlisted?.length > 0 ? (
                          Shortlisted.map((candi) => (
                            <Col span={12} key={candi.candidateID}>
                              <CandidatesProfileCard
                                id={candi.userId}
                                jobApplicationID={candi.jobApplicationsID}
                                candiid={candi.fk_CandidateID}
                                pictureExtention={candi.picture}
                                name={candi.userName}
                                jobid={jobid}
                                status={candi.currentStatus}
                                // designation={candidate.Designation}
                                // college={candidate.College}
                                // salary={candidate.Salary}
                                // experience={candidate.Experience}
                                location={
                                  language === 'en'
                                    ? candi.candidate_CityName
                                    : candi.candidate_CityName_Ar
                                }
                              />
                            </Col>
                          ))
                        ) : (
                          <div>
                            <Empty description="No shortlisted applicants" />
                          </div>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tab="REJECTED" key="4">
                      <Row gutter={30}>
                        {Rejected && Rejected?.length > 0 ? (
                          Rejected.map((candi) => (
                            <Col span={12} key={candi.candidateID}>
                              <CandidatesProfileCard
                                id={candi.userId}
                                jobApplicationID={candi.jobApplicationsID}
                                pictureExtention={candi.picture}
                                name={candi.userName}
                                jobid={jobid}
                                status={candi.currentStatus}
                                // designation={candidate.Designation}
                                // college={candidate.College}
                                // salary={candidate.Salary}
                                // experience={candidate.Experience}
                                //  location={language ==="en"? candi.candidate_CityName : candi.candidate_CityName_Ar}
                              />
                            </Col>
                          ))
                        ) : (
                          <div>
                            <Empty description="No rejected applicants" />
                          </div>
                        )}
                      </Row>
                    </TabPane>
                  </Tabs>
                </div>
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
      <div className={NewStyle.applicantMobile}>
        <Row>
          <Col span={4}>
            <EmpDashSidebar />
          </Col>
        </Row>
        <Col style={{ padding: '30px 10px 30px 10px' }}>
          <Row>
            <div className={Style.empDashCandidatesTop}>
              <h2>Candidates</h2>
              <Button
                className={Style.filterBtn}
                size="large"
                icon={<FilterOutlined />}
              >
                Filters
              </Button>
            </div>
          </Row>
          {!isLoading ? (
            <Row>
              <div className={Style.empDashCandidatesTabs}>
                <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
                  {' '}
                  {/*onChange={callback}*/}
                  <TabPane tab="ALL APPLICANTS" key="1">
                    <Row gutter={30}>
                      {data && data?.length > 0 ? (
                        data.map((candi) => (
                          <Col
                            style={{ width: '100%' }}
                            key={candi.candidateID}
                          >
                            <CandidatesProfileCard
                              id={candi.userId}
                              jobApplicationID={candi.jobApplicationsID}
                              candiid={candi.fk_CandidateID}
                              pictureExtention={candi.picture}
                              name={candi.userName}
                              jobid={jobid}
                              status={candi.currentStatus}
                              // designation={candidate.Designation}
                              // college={candidate.College}
                              // salary={candidate.Salary}
                              // experience={candidate.Experience}
                              location={
                                language === 'en'
                                  ? candi.candidate_CityName
                                  : candi.candidate_CityName_Ar
                              }
                            />
                          </Col>
                        ))
                      ) : (
                        <div>
                          <Empty description="No new applicants" />
                        </div>
                      )}
                    </Row>
                  </TabPane>
                  <TabPane tab="APPROVED" key="2">
                    <Row gutter={30}>
                      {Approved && Approved?.length > 0 ? (
                        Approved.map((candi) => (
                          <Col
                            style={{ width: '100%' }}
                            key={candi.candidateID}
                          >
                            <CandidatesProfileCard
                              id={candi.userId}
                              jobApplicationID={candi.jobApplicationsID}
                              candiid={candi.fk_CandidateID}
                              pictureExtention={candi.picture}
                              name={candi.userName}
                              jobid={jobid}
                              status={candi.currentStatus}
                              // designation={candidate.Designation}
                              // college={candidate.College}
                              // salary={candidate.Salary}
                              // experience={candidate.Experience}
                              location={
                                language === 'en'
                                  ? candi.candidate_CityName
                                  : candi.candidate_CityName_Ar
                              }
                            />
                          </Col>
                        ))
                      ) : (
                        <div>
                          <Empty description="No new shortlisted appliacnts" />
                        </div>
                      )}
                    </Row>
                  </TabPane>
                  <TabPane tab="SHORTLISTED" key="3">
                    <Row gutter={30}>
                      {Shortlisted && Shortlisted?.length > 0 ? (
                        Shortlisted.map((candi) => (
                          <Col
                            style={{ width: '100%' }}
                            key={candi.candidateID}
                          >
                            <CandidatesProfileCard
                              id={candi.userId}
                              jobApplicationID={candi.jobApplicationsID}
                              candiid={candi.fk_CandidateID}
                              pictureExtention={candi.picture}
                              name={candi.userName}
                              jobid={jobid}
                              status={candi.currentStatus}
                              // designation={candidate.Designation}
                              // college={candidate.College}
                              // salary={candidate.Salary}
                              // experience={candidate.Experience}
                              location={
                                language === 'en'
                                  ? candi.candidate_CityName
                                  : candi.candidate_CityName_Ar
                              }
                            />
                          </Col>
                        ))
                      ) : (
                        <div>
                          <Empty description="No new shortlisted appliacnts" />
                        </div>
                      )}
                    </Row>
                  </TabPane>
                  <TabPane tab="REJECTED" key="4">
                    <Row gutter={30}>
                      {Rejected && Rejected?.length > 0 ? (
                        Rejected.map((candi) => (
                          <Col
                            style={{ width: '100%' }}
                            key={candi.candidateID}
                          >
                            <CandidatesProfileCard
                              id={candi.userId}
                              jobApplicationID={candi.jobApplicationsID}
                              pictureExtention={candi.picture}
                              name={candi.userName}
                              jobid={jobid}
                              status={candi.currentStatus}
                              // designation={candidate.Designation}
                              // college={candidate.College}
                              // salary={candidate.Salary}
                              // experience={candidate.Experience}
                              //  location={language ==="en"? candi.candidate_CityName : candi.candidate_CityName_Ar}
                            />
                          </Col>
                        ))
                      ) : (
                        <div>
                          <Empty description="No new rejected appliacnts" />
                        </div>
                      )}
                    </Row>
                  </TabPane>
                </Tabs>
              </div>
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
      </div>
    </div>
  )
}

export default ViewAppplicants

export async function getServerSideProps(context) {
  const { jobid } = context.query
  return {
    props: { jobid }, // will be passed to the page component as props
  }
}
