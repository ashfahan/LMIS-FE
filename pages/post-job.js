import { LeftOutlined } from '@ant-design/icons'
import { Col, Row, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { useRecoilState, useRecoilValue } from 'recoil'
import EmpDashSidebar from '../components/Dashboard/employer/empDashSidebar'
import PostJobEditor from '../components/Dashboard/employer/postJobEditor'
import PostJobForm from '../components/Dashboard/employer/postJobForm'
import Navigation from '../components/Layout/header'
import auth from '../shared/auth'
import { PostJob_api } from '../stores/apis/jobs_api'
import { userTypeAtom } from '../stores/atoms/app_config_atom'
import { singleJob } from '../stores/atoms/job_atom.js'
import jobInterface from '../stores/interfaces/postjob'
import Style from '../styles/postJob.module.scss'

const PostJob = () => {
  const router = useRouter()
  const userType = useRecoilValue(userTypeAtom)
  useEffect(() => {
    if (!auth()) {
      router.push('/')
    }
  }, [])
  const { t } = useTranslation()
  const [job, setJob] = useRecoilState(singleJob)

  const { addToast } = useToasts()
  const { Title } = Typography
  const { mutateAsync, isLoading, isSuccess } = useMutation(PostJob_api)
  const [editorState, setEditorState] = useState('')

  const postTheJob = (values) => {
    const interf = jobInterface()
    values = { ...interf, ...values }
    values.description = editorState
    values.salary = parseInt(values.salary)
    values.noOfVacancy = parseInt(values.noOfVacancy)
    values.draft = true
    if (values.skillsRequired) {
      values.skillsRequired = values.skillsRequired.join(',')
    }
    setJob(values)
    mutateAsync(values, {
      onSuccess: async (responce) => {
        if (responce === 'Error') {
          addToast('An Error Occured', {
            appearance: 'error',
            autoDismiss: true,
          })
          return
        }
        addToast('Job saved as Draft', {
          appearance: 'success',
          autoDismiss: true,
        })
        router.push(`/draftjob/${responce}`)
      },
      onError: (error, variables, context) => {
        addToast('An Error Occured', {
          appearance: 'error',
          autoDismiss: true,
        })
        return
      },
    })
  }

  return (
    <div className={Style.postJobPage}>
      <Navigation />

      <Row style={{ gap: '30px', margin: '0' }}>
        <Col lg={4} xs={24}>
          <EmpDashSidebar />
        </Col>

        <Col
          lg={{ span: 6, offset: 0 }}
          md={9}
          sm={10}
          xs={{ span: 22, offset: 1 }}
        >
          <div className={Style.PFormMain}>
            <Link href="/employboard-jobs">
              <div
                style={{
                  color: '#101010',
                  paddingBottom: '10px',
                  display: 'block',
                  cursor: 'pointer',
                }}
              >
                <LeftOutlined className={Style.icon} /> {t('back')}
              </div>
            </Link>
            <Title level={3}>{t('post_a_job')}</Title>
            <PostJobForm
              onJobPostedHit={postTheJob}
              onFormLoading={isLoading}
            />
          </div>
        </Col>

        <Col
          lg={11}
          md={12}
          sm={{ span: 11, offset: 0 }}
          xs={{ span: 22, offset: 1 }}
        >
          <div
            className={Style.postJobEditorMain}
            style={{ marginTop: '72px' }}
          >
            {/* <Row style={{display:'flex', justifyContent:'flex-end', marginBottom:'28px'}}>
                            <Button type='primary'>Publish Post</Button>
                        </Row> */}
            <PostJobEditor
              onEditorChange={(template) => setEditorState(template)}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default PostJob
