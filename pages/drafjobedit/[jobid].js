import { LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { Col, Row, Spin, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { useRecoilState, useRecoilValue } from 'recoil'
import EmpDashSidebar from '../../components/Dashboard/employer/empDashSidebar'
import PostJobEditor from '../../components/Dashboard/employer/postJobEditor'
import PostJobForm from '../../components/Dashboard/employer/postJobForm'
import Navigation from '../../components/Layout/header'
import auth from '../../shared/auth'
import { getSingleJobsDraft, PostJob_api } from '../../stores/apis/jobs_api'
import { userTypeAtom } from '../../stores/atoms/app_config_atom'
import { singleJob } from '../../stores/atoms/job_atom.js'
import jobInterface from '../../stores/interfaces/postjob'
import Style from '../../styles/postJob.module.scss'

const DraftJobEdit = ({ jobid }) => {
  const router = useRouter()
  const userType = useRecoilValue(userTypeAtom)
  useEffect(() => {
    if (!auth()) {
      router.push('/')
    }
  }, [])

  const [job, setJob] = useRecoilState(singleJob)

  const { addToast } = useToasts()
  const { Title } = Typography
  const { mutateAsync, isLoading_mutation, isSuccess } = useMutation(PostJob_api)
  const [editorState, setEditorState] = useState('')
  const [company, setCompnay] = useState()

  const { isLoading, error, data } = useQuery('getSingleJob', () => getSingleJobsDraft(jobid), {
    onSuccess: async (response) => {
      setJob(response)
    },
  })

  const postTheJob = (values) => {
    const interf = jobInterface()
    values = { ...interf, ...values }
    values.description = editorState || ''
    values.jobVacancyID = data[0].jobVacancyID
    values.salary = parseInt(values.salary)
    values.skillsRequired = values.skillsRequired.join(',')
    values.noOfVacancy = parseInt(values.noOfVacancy)
    values.draft = true
    values.jobType = values.jobType ? values.jobType : ''

    setJob(values)

    mutateAsync(values, {
      onSuccess: async (responce) => {
        addToast('Job Posted Successfully', {
          appearance: 'success',
          autoDismiss: true,
        })
        router.push(`/draftjob/${values.jobVacancyID}`)
      },
    })
  }

  const onChangeComp = (compID) => {
    setCompnay(compID)
  }

  return (
    <div className={Style.postJobPage}>
      <Navigation />

      <Row style={{ gap: '30px', margin: '0' }}>
        <Col span={4}>
          <EmpDashSidebar />
        </Col>

        <Col span={5}>
          <div className={Style.PFormMain}>
            {data?.length > 0 && (
              <Link
                href={`/draftjob/${data[0]?.jobVacancyID.toString()}`}
                style={{
                  color: '#101010',
                  paddingBottom: '10px',
                  display: 'block',
                }}
              >
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
            )}
            <Title level={3}>Post a Job</Title>
            {!isLoading ? (
              <PostJobForm
                onJobPostedHit={postTheJob}
                onFormLoading={isLoading}
                jobObjToEdit={data?.[0]}
                onCompChange={onChangeComp}
              />
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
          </div>
        </Col>

        <Col span={13}>
          <div className={Style.postJobEditorMain}>
            <Row
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '28px',
              }}
            >
              {/* <Button type="primary">Publish Post</Button> */}
            </Row>
            <PostJobEditor
              onEditorChange={(template) => setEditorState(template)}
              editJobEditor={data && data[0].description}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default DraftJobEdit

export async function getServerSideProps(context) {
  const { jobid } = context.query
  return {
    props: { jobid }, // will be passed to the page component as props
  }
}
