import { Col, Form, Row, Select, Spin } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { getAllFilters } from '../../../../stores/apis/jobs_api'
import { JobFilters } from '../../../../stores/atoms/job_atom.js'
import Style from '../../../../styles/empDashJobs.module.scss'

const EmpDashJobsFilters = () => {
  const { t } = useTranslation()
  const [filters, setFilters] = useRecoilState(JobFilters)
  const { isLoading, error, data } = useQuery('getAllFilters', getAllFilters)

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
        <Spin size="large" />
      </div>
    )
  if (error) return 'An error has occurred: ' + error.message

  const { Option } = Select

  const getTitleFilter = (titleid) => {
    if (!titleid) titleid = ''
    setFilters({ ...filters, jobTitle: titleid?.toString() })
  }

  const getJobTypeFilter = (jobTypeid) => {
    if (!jobTypeid) jobTypeid = ''
    setFilters({ ...filters, jobType: jobTypeid?.toString() })
  }

  const getCompanyFilter = (companyid) => {
    if (!companyid) companyid = ''
    setFilters({ ...filters, company: companyid?.toString() })
  }

  return (
    <>
      <Row gutter={25} className={Style.empDashJobsFilters}>
        <Col md={8} xs={24}>
          <div className={Style.singleCol}>
            <Form.Item label={t('job_title')}>
              <Select
                allowClear
                size="large"
                showSearch
                onChange={getTitleFilter}
                placeholder={t('all_titles')}
              >
                {data.jobTitle.map((filter) => {
                  return (
                    <Option key={filter.id} value={filter.id}>
                      {filter.title}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </div>
        </Col>
        <Col md={8} xs={24}>
          <div className={Style.singleCol}>
            <Form.Item label={t('jobs_type')}>
              <Select
                allowClear
                size="large"
                showSearch
                onChange={getJobTypeFilter}
                placeholder={t('all_types')}
              >
                {data.jobType.map((filter) => {
                  return (
                    <Option key={filter.id} value={filter.id}>
                      {filter.title}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </div>
        </Col>
        <Col md={8} xs={24}>
          <div className={Style.singleCol}>
            <Form.Item label={t('company')}>
              <Select
                allowClear
                size="large"
                showSearch
                onChange={getCompanyFilter}
                placeholder={t('all_companies')}
              >
                {data.company.map((filter) => {
                  return (
                    <Option key={filter.id} value={filter.id}>
                      {filter.title}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default EmpDashJobsFilters
