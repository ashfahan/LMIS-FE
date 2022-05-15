import { LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Row, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { useRecoilValue } from 'recoil'
import ViewResume from '../../../components/Dashboard/employer/applications/viewResume'
import CandidatesProfileCardSmall from '../../../components/Dashboard/employer/candidates/candidatesProfileCardSmall'
import EmpDashSidebar from '../../../components/Dashboard/employer/empDashSidebar'
import Navigation from '../../../components/Layout/header'
import auth from '../../../shared/auth'
import { permissionsEnum } from '../../../shared/permissionsEnum'
import { getSingleCandidate } from '../../../stores/apis/candidates_api'
import { applyToAJob } from '../../../stores/apis/jobs_api'
import { userTypeAtom } from '../../../stores/atoms/app_config_atom'
import { JobApplicationsID_ATOM } from '../../../stores/atoms/job_atom'
import { applyForJob } from '../../../stores/interfaces/job'
import Style from '../../../styles/applicant.module.scss'
// import { getSingleJobs } from '../../../stores/apis/jobs_api';

const ApplicantView = ({ candidateid, jobid }) => {
  const { addToast } = useToasts()
  const router = useRouter()
  const userType = useRecoilValue(userTypeAtom)
  const applicationID = useRecoilValue(JobApplicationsID_ATOM)
  const [isCandidateApproved, setIsCandidateApproved] = useState(true)
  const [isCandidateRejected, setIsCandidateRejected] = useState(true)
  const [isCandidateShortlisted, setIsCandidateShortlisted] = useState(true)
  // const {data:singleJOb} = useQuery("getSingleJob", () => getSingleJobs(jobid));
  useEffect(() => {
    if (!auth()) {
      router.push('/')
    }
    let _permissions = JSON.parse(sessionStorage.getItem('permissions')) || []
    setIsCandidateApproved(
      _permissions.some((item) => item === permissionsEnum.approveCandidate),
    )
    setIsCandidateRejected(
      _permissions.some((item) => item === permissionsEnum.rejectCandidate),
    )
    setIsCandidateShortlisted(
      _permissions.some((item) => item === permissionsEnum.shortlistCandidate),
    )
  }, [])

  const { isLoading, error, data } = useQuery(
    'getSingleCandidate',
    () => getSingleCandidate(candidateid),
    {
      onSuccess: async (response) => {
        console.log(response)
      },
    },
  )

  const { mutateAsync } = useMutation(applyToAJob)

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

  const applyOnThisJob = (status) => {
    const interf = applyForJob()
    interf.fk_JobVacancyID = parseInt(jobid)
    interf.currentStatus = status
    interf.fk_CandidateID = parseInt(candidateid)
    interf.jobApplicationsID =
      typeof window !== 'undefined' &&
      parseInt(sessionStorage.getItem('job_hop_jobApplicationID'))
    mutateAsync(interf, {
      onSuccess: async () => {
        addToast(`${status} successfully`, {
          appearance: 'success',
          autoDismiss: true,
        })
      },
    })
  }

  return (
    <div>
      <Navigation />
      <div className={Style.applicantDesktop}>
        <Row style={{ gap: '20px' }}>
          <Col span={4}>
            <EmpDashSidebar />
          </Col>
          <Col span={4} style={{ paddingTop: '30px' }}>
            <CandidatesProfileCardSmall
              profilePic={data && data[0].picture}
              userName={(data && data[0].userName) || 'John Doe'}
              id={data && data[0].fK_UserID}
              //  college='Wharton College'
              //  salary='$36000 - $45000'
              //  experience='3+ years'
              location={data && data[0].cityName}
            />

            {/* <TopFiveCandidatesCard
                     cardTitle='Similar Candidates'
                     cardText='List of candidates who closely match the criteria'
                     nameOne='Brad Gorden'
                     nameTwo='Gabriel Taylor'
                     nameThree='michelle Swift'
                     nameFour='Talia Lee'
                     nameFive='Chris Wilson' /> */}
          </Col>
          <Col flex="0 1 44%" style={{ paddingTop: '30px' }}>
            <ViewResume candiID={(data && data[0].candidateID) || 'some'} />
          </Col>
          <Col span={4} style={{ paddingTop: '30px' }}>
            <Row>
              {isCandidateApproved && (
                <Button
                  type="primary"
                  block
                  onClick={() => applyOnThisJob('approved')}
                >
                  Approve
                </Button>
              )}
            </Row>
            <Row
              style={{
                gap: '5px',
                justifyContent: 'space-between',
                margin: '10px 0px 20px',
              }}
            >
              {isCandidateShortlisted && (
                <Button
                  style={{ flexBasis: '48%' }}
                  onClick={() => applyOnThisJob('shortlisted')}
                >
                  Shortlist
                </Button>
              )}

              {isCandidateRejected && (
                <Button
                  style={{ flexBasis: '48%' }}
                  onClick={() => applyOnThisJob('rejected')}
                >
                  Reject
                </Button>
              )}
            </Row>
            {/* <RecentlyApplied />  */}
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
          <CandidatesProfileCardSmall
            profilePic={data && data[0].picture}
            userName={(data && data[0].userName) || 'John Doe'}
            id={data && data[0].fK_UserID}
            location={data && data[0].cityName}
            margin={0}
          />
        </Col>
        <Col
          flex="0 1 44%"
          style={{ paddingTop: '10px', width: '95%', margin: 'auto' }}
        >
          <ViewResume candiID={(data && data[0].candidateID) || 'some'} />
        </Col>
        <Col
          style={{
            paddingTop: '10px',
            paddingBottom: '20px',
            width: '95%',
            margin: 'auto',
          }}
        >
          <Row>
            {isCandidateApproved && (
              <Button
                type="primary"
                block
                onClick={() => applyOnThisJob('approved')}
              >
                Approve
              </Button>
            )}
          </Row>
          <Row
            style={{
              gap: '5px',
              justifyContent: 'space-between',
              margin: '10px 0px 20px',
            }}
          >
            {isCandidateShortlisted && (
              <Button
                style={{ flexBasis: '48%' }}
                onClick={() => applyOnThisJob('shortlisted')}
              >
                Shortlist
              </Button>
            )}

            {isCandidateRejected && (
              <Button
                style={{ flexBasis: '48%' }}
                onClick={() => applyOnThisJob('rejected')}
              >
                Reject
              </Button>
            )}
          </Row>
        </Col>
      </div>
    </div>
  )
}

export default ApplicantView

export async function getServerSideProps(context) {
  const { candidateid, jobid } = context.query
  return {
    props: { candidateid, jobid }, // will be passed to the page component as props
  }
}
