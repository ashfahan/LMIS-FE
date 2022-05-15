import { LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Row, Spin } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import EmpDashSidebar from '../../components/Dashboard/employer/empDashSidebar'
import EmpDashJobSingleInfo from '../../components/Dashboard/employer/jobs/epmDashSingleInfo'
import Viewjobdescription from '../../components/Dashboard/employer/viewJobDescription'
import Navigation from '../../components/Layout/header'
import { permissionsEnum } from '../../shared/permissionsEnum'
import { getApplicantsByJobID, getSingleJobs } from '../../stores/apis/jobs_api'
import { singleJob } from '../../stores/atoms/job_atom.js'
import Style from '../../styles/empDashJobs.module.scss'

const SingleJobVIew = ({ jobid }) => {
  const [isEditRequirements, setIsEditRequirements] = useState(true)
  const [isViewCandidate, setIsViewCandidate] = useState(true)
  const router = useRouter()
  // const { jobid } = router.query;
  // console.log(jobid);
  const [job, setJob] = useRecoilState(singleJob)
  const { isLoading, error, data } = useQuery(
    'getSingleJob',
    () => getSingleJobs(jobid),
    {
      onSuccess: async (response) => {
        setJob(response)
      },
    },
  )
  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])
  useEffect(() => {
    let _permissions = JSON.parse(sessionStorage.getItem('permissions')) || []
    setIsEditRequirements(
      _permissions.some((item) => item === permissionsEnum.editAJOb),
    )
    setIsViewCandidate(
      _permissions.some((item) => item === permissionsEnum.viewCandidates),
    )
  }, [])
  const { data: newCandidates } = useQuery('getApplicantsByJobID', () =>
    getApplicantsByJobID(jobid),
  )

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

  const editJobRoute = () => {
    router.push(`/editjob/${jobid}`)
  }

  const viewCandidats = () => {
    router.push(`/viewApplicants/${jobid}`)
  }

  return (
    <div>
      <Navigation />
      <div className={Style.applicantDesktop}>
        <Row>
          <Col span={4}>
            <EmpDashSidebar />
          </Col>

          <Col span={4} style={{ paddingTop: '30px', paddingLeft: '20px' }}>
            <Link href={`/employboard-jobs`}>
              <div
                style={{
                  color: '#101010',
                  paddingBottom: '10px',
                  display: 'block',
                  cursor: 'pointer',
                }}
              >
                <LeftOutlined className={Style.icon} /> BACK
              </div>
            </Link>
            <EmpDashJobSingleInfo
              jobTitle={
                language === 'en'
                  ? data[0]?.lookUpValue
                  : data[0]?.lookUpValue_Ar
              }
              companyName={
                language === 'en'
                  ? data[0]?.companyName
                  : data[0]?.companyName_Ar
              }
              candidatesCount={newCandidates && newCandidates.length}
              jobtype={data[0]?.jobType}
            />
            {/* <TopFiveCandidatesCard
                     cardTitle='Top 5 Candidates'
                     cardText='List of candidates who qualify most of the requirements'
                     nameOne='Brad Gorden'
                     nameTwo='Gabriel Taylor'
                     nameThree='michelle Swift'
                     nameFour='Talia Lee'
                     nameFive='Chris Wilson' /> */}
          </Col>
          <Col
            flex="0 1 44%"
            style={{ paddingTop: '65px', paddingLeft: '20px' }}
          >
            <Viewjobdescription jobDescription={data[0]?.description} />
          </Col>
          <Col
            lg={{ span: 4 }}
            style={{ paddingTop: '65px', paddingLeft: '20px' }}
          >
            <div className={Style.empJobViewRightBtns}>
              {isEditRequirements && (
                <Button className={Style.btn} block onClick={editJobRoute}>
                  Edit Requirements
                </Button>
              )}
              {isViewCandidate && (
                <Button
                  type="primary"
                  onClick={viewCandidats}
                  className={Style.btn}
                  block
                >
                  View Candidates
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div className={Style.applicantMobile}>
        <Row style={{ gap: '20px' }}>
          <Col span={4}>
            <EmpDashSidebar />
          </Col>
        </Row>
        <Col style={{ paddingTop: '30px', width: '95%', margin: 'auto' }}>
          <Link href={`/employboard-jobs`}>
            <div
              style={{
                color: '#101010',
                paddingBottom: '10px',
                display: 'block',
                cursor: 'pointer',
              }}
            >
              <LeftOutlined className={Style.icon} /> BACK
            </div>
          </Link>
          <EmpDashJobSingleInfo
            jobTitle={data[0]?.lookUpValue}
            companyName={data[0]?.companyName}
            candidatesCount={newCandidates && newCandidates.length}
            jobtype={data[0]?.jobType}
          />
          {/* <TopFiveCandidatesCard
                     cardTitle='Top 5 Candidates'
                     cardText='List of candidates who qualify most of the requirements'
                     nameOne='Brad Gorden'
                     nameTwo='Gabriel Taylor'
                     nameThree='michelle Swift'
                     nameFour='Talia Lee'
                     nameFive='Chris Wilson' /> */}
        </Col>
        <Col style={{ paddingTop: '15px', width: '95%', margin: 'auto' }}>
          <Viewjobdescription jobDescription={data[0]?.description} />
        </Col>
        <Col style={{ paddingTop: '15px', width: '95%', margin: 'auto' }}>
          <div className={Style.empJobViewRightBtns}>
            {isEditRequirements && (
              <Button className={Style.btn} block onClick={editJobRoute}>
                Edit Requirements
              </Button>
            )}
            {isViewCandidate && (
              <Button
                type="primary"
                onClick={viewCandidats}
                className={Style.btn}
                block
              >
                View Candidates
              </Button>
            )}
          </div>
        </Col>
      </div>
    </div>
  )
}

export default SingleJobVIew

export async function getServerSideProps(context) {
  const { jobid } = context.query
  return {
    props: { jobid }, // will be passed to the page component as props
  }
}
