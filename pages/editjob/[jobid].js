import { LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { Col, Empty, Row, Spin, Typography } from 'antd'
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
import { getSingleJobs, PostJob_api } from '../../stores/apis/jobs_api'
import { userTypeAtom } from '../../stores/atoms/app_config_atom'
import { singleJob } from '../../stores/atoms/job_atom.js'
import jobInterface from '../../stores/interfaces/postjob'
import Style from '../../styles/postJob.module.scss'

const EditJob = ({ jobid }) => {
  const router = useRouter()
  const userType = useRecoilValue(userTypeAtom)
  useEffect(() => {
    if (userType != 0) {
      router.push('/')
    }
  }, [])

  const [job, setJob] = useRecoilState(singleJob)

  const { addToast } = useToasts()
  const { Title } = Typography
  const { mutateAsync, isLoading_mutation, isSuccess } =
    useMutation(PostJob_api)
  const [editorState, setEditorState] = useState('')

  const { isLoading, error, data } = useQuery(
    'getSingleJob',
    () => getSingleJobs(jobid),
    {
      onSuccess: async (response) => {
        setJob(response)
        setEditorState(response && response[0]?.description)
      },
    },
  )

  const postTheJob = (values) => {
    const interf = jobInterface()
    values = { ...interf, ...values }
    values.description = editorState || ''
    values.jobVacancyID = data[0].jobVacancyID
    values.salary = parseInt(values.salary)
    values.skillsRequired = values.skillsRequired.join(',')
    values.noOfVacancy = parseInt(values.noOfVacancy)
    values.draft = false
    values.jobType = values.jobType ? values.jobType : ''
    setJob(values)
    mutateAsync(values, {
      onSuccess: async (responce) => {
        if (responce === 'Error') {
          addToast('An error occured', {
            appearance: 'error',
            autoDismiss: true,
          })
        } else {
          addToast('Job Posted Successfully', {
            appearance: 'success',
            autoDismiss: true,
          })
          router.push(`/job/${values.jobVacancyID}`)
        }
      },
    })
  }

  return (
    <div className={Style.postJobPage}>
      {data && data.length > 0 ? (
        <>
          <Navigation />
          <div className={Style.applicantDesktop}>
            <Row style={{ gap: '30px', margin: '0' }}>
              <Col span={4}>
                <EmpDashSidebar />
              </Col>

              <Col span={5}>
                <div className={Style.PFormMain}>
                  {data.length > 0 && (
                    <Link href={`/job/${data[0]?.jobVacancyID.toString()}`}>
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
                  <Title level={3}>Edit a Job</Title>
                  <PostJobForm
                    onJobPostedHit={postTheJob}
                    onFormLoading={isLoading}
                    jobObjToEdit={data?.[0]}
                  />
                </div>
              </Col>

              <Col span={13}>
                <div
                  className={Style.postJobEditorMain}
                  style={{ marginTop: '70px' }}
                >
                  {/* <Row style={{display:'flex', justifyContent:'flex-end', marginBottom:'28px'}}>
                            <Button type='primary'>Publish Post</Button>
                        </Row> */}
                  <PostJobEditor
                    onEditorChange={(template) => setEditorState(template)}
                    editJobEditor={data[0].description}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className={Style.applicantMobile}>
            <Row style={{ gap: '30px', margin: '0' }}>
              <Col span={4}>
                <EmpDashSidebar />
              </Col>
            </Row>

            <Col
              style={{ width: '95%', margin: 'auto', paddingBottom: '20px' }}
            >
              <div className={Style.PFormMain}>
                {data.length > 0 && (
                  <Link href={`/job/${data[0]?.jobVacancyID.toString()}`}>
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
                <Title level={3}>Edit a Job</Title>
                <PostJobForm
                  onJobPostedHit={postTheJob}
                  onFormLoading={isLoading}
                  jobObjToEdit={data?.[0]}
                  onEditorChange={(template) => setEditorState(template)}
                  editJobEditor={data[0]?.description}
                />
              </div>
            </Col>
          </div>
        </>
      ) : isLoading ? (
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
      ) : (
        <Empty description="Job Not Found" />
      )}
    </div>
  )
}

export default EditJob

export async function getServerSideProps(context) {
  const { jobid } = context.query
  return {
    props: { jobid }, // will be passed to the page component as props
  }
}
