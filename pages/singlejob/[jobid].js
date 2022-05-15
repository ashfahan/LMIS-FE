import { LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { Col, Row, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { useRecoilState, useRecoilValue } from 'recoil'
import EmpDashJobSingleInfo from '../../components/Dashboard/employer/jobs/epmDashSingleInfo'
import Viewjobdescription from '../../components/Dashboard/employer/viewJobDescription'
import DashSidebar from '../../components/Dashboard/user/dashSideBar'
import Navigation from '../../components/Layout/header'
import { applyToAJob, getSingleJobs } from '../../stores/apis/jobs_api'
import { is_candidate_user } from '../../stores/atoms/app_config_atom'
import { singleJob } from '../../stores/atoms/job_atom.js'
import { applyForJob } from '../../stores/interfaces/job'
import Style from '../../styles/empDashJobs.module.scss'

const SingleJ = ({ jobid, applyBtn, isApplied }) => {
  const router = useRouter()
  const {
    mutateAsync,
    isSuccess,
    isLoading: saveJobLoading,
  } = useMutation(applyToAJob)
  const [job, setJob] = useRecoilState(singleJob)
  const { addToast } = useToasts()
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
  const isCandidate = useRecoilValue(is_candidate_user)

  const applyOnThisJob = () => {
    if (
      typeof window !== 'undefined' &&
      sessionStorage.getItem('jobhop_loggedin_user_type') != 1
    ) {
      router.push('/signin')
      return false
    }
    const interf = applyForJob()
    interf.fk_JobVacancyID = job[0]?.jobVacancyID
    mutateAsync(interf, {
      onSuccess: async (response) => {
        if (response?.isApplied)
          addToast(response.message, {
            appearance: 'error',
            autoDismiss: true,
          })
        else {
          addToast('Applied Successfully', {
            appearance: 'success',
            autoDismiss: true,
          })
          router.replace('/jobs')
        }
      },
    })
  }

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

  return (
    <div>
      <Navigation />
      <Row gutter={20} style={{ margin: 0 }}>
        <Col lg={4} xs={22}>
          <DashSidebar />
        </Col>

        <div onClick={() => router.back()} className={Style.backToSearch}>
          <LeftOutlined className={Style.icon} /> BACK
        </div>
        <Col className={Style.empDashJobWrapper} lg={4} xs={24}>
          <EmpDashJobSingleInfo
            jobTitle={
              data && language === 'en'
                ? data[0]?.lookUpValue
                : data[0]?.lookUpValue_Ar
            }
            companyName={
              data && language === 'en'
                ? data[0]?.companyName
                : data[0]?.companyName_Ar
            }
            jobtype={data && data[0]?.jobType}
            candidatesCount={data && data[0]?.totalApplications}
          />
        </Col>
        <Col lg={11} xs={24} className={Style.empDashJobWrapper}>
          <Viewjobdescription
            saveJobLoading={saveJobLoading}
            applyBtn={applyBtn}
            applyOnThisJob={applyOnThisJob}
            isApplied={isApplied}
            jobDescription={data && data[0]?.description}
          />
        </Col>
        <Col lg={4} xs={24} className={Style.empDashJobWrapper}></Col>
      </Row>
    </div>
  )
}

export default SingleJ

export async function getServerSideProps(context) {
  let { jobid, applyBtn, isApplied } = context.query
  applyBtn = applyBtn || false
  isApplied = isApplied || false
  return {
    props: { jobid, applyBtn, isApplied }, // will be passed to the page component as props
  }
}
