import { LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Row, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { useRecoilState, useRecoilValue } from 'recoil'
import EmpDashSidebar from '../../components/Dashboard/employer/empDashSidebar'
import EmpDashJobSingleInfo from '../../components/Dashboard/employer/jobs/epmDashSingleInfo'
import Viewjobdescription from '../../components/Dashboard/employer/viewJobDescription'
import Navigation from '../../components/Layout/header'
import auth from '../../shared/auth'
import { permissionsEnum } from '../../shared/permissionsEnum'
import { getSingleJobsDraft, PostJob_api } from '../../stores/apis/jobs_api'
import { userTypeAtom } from '../../stores/atoms/app_config_atom'
import { singleJob } from '../../stores/atoms/job_atom.js'
import jobInterface from '../../stores/interfaces/postjob'
import Style from '../../styles/empDashJobs.module.scss'

const SingleJobVIewDraft = (props) => {
  const router = useRouter()
  const userType = useRecoilValue(userTypeAtom)
  const [isPublishJob, setIsPublish] = useState(true)
  const [isEditRequirements, setIsEditRequirements] = useState(true)

  useEffect(() => {
    if (!auth()) {
      router.push('/')
    }
    let _permissions = JSON.parse(sessionStorage.getItem('permissions')) || []
    setIsPublish(
      _permissions.some((item) => item === permissionsEnum.publishAJob),
    )
    setIsEditRequirements(
      _permissions.some((item) => item === permissionsEnum.editAJOb),
    )
  }, [])

  const { mutateAsync, isLoading_postApi, isSuccess } = useMutation(PostJob_api)
  const { addToast } = useToasts()

  const [job, setJob] = useRecoilState(singleJob)
  const { isLoading, error, data } = useQuery(
    'getSingleJob',
    () => getSingleJobsDraft(props.jobid),
    {
      onSuccess: async (response) => {
        setJob(response)
      },
    },
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

  const makePublishJob = () => {
    const interf = jobInterface()

    let dumjob = { ...job[0] }
    // dumjob = {...interf, ...dumjob};

    let omitNull = (obj) => {
      Object.keys(obj)
        .filter((k) => obj[k] === null)
        .forEach((k) => delete obj[k])
      return obj
    }

    dumjob = { ...omitNull(interf), ...omitNull(dumjob) }

    dumjob.draft = false
    dumjob.lasT_UPDATE_BY = sessionStorage.getItem('jobhop_loggedin_user_id')
    setJob(dumjob)
    console.log(dumjob)

    mutateAsync(dumjob, {
      onSuccess: async (responce) => {
        addToast('Job Posted Successfully', {
          appearance: 'success',
          autoDismiss: true,
        })
        router.push(`/job/${dumjob.jobVacancyID}`)
      },
    })
  }

  const editDrafJob = () => {
    router.push(`/drafjobedit/${props.jobid}`)
  }

  return (
    <div>
      <Navigation />
      <Row style={{ gap: '20px' }}>
        <Col span={4}>
          <EmpDashSidebar />
        </Col>
        <Col span={4} style={{ paddingTop: '30px' }}>
          <EmpDashJobSingleInfo
            jobTitle={data[0].lookUpValue}
            companyName={data[0].companyName}
            jobtype={data[0].jobType}
            type="draft"
          />
        </Col>
        <Col flex="0 1 44%" style={{ paddingTop: '30px' }}>
          <Viewjobdescription jobDescription={data[0].description} />
        </Col>
        <Col span={4} style={{ paddingTop: '30px' }}>
          <div className={Style.empJobViewRightBtns}>
            {isPublishJob && (
              <Button
                type="primary"
                onClick={makePublishJob}
                className={Style.btn}
                block
              >
                Publish
              </Button>
            )}
            {isEditRequirements && (
              <Button
                type="secondary"
                onClick={editDrafJob}
                className={Style.btn}
                block
              >
                Edit
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default SingleJobVIewDraft

export async function getServerSideProps(context) {
  const { jobid } = context.query
  return {
    props: { jobid }, // will be passed to the page component as props
  }
}
