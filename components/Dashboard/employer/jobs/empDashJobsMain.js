import { Col, Row } from 'antd'
import React, { useState } from 'react'
import Style from '../../../../styles/dashboard.module.scss'
import SingleJob from '../../../Jobs/newJobSingle'

const EmpDashJobsMain = () => {
  const [jobs, setjobs] = useState([
    {
      Title: 'Sales Analyst',
      Company: 'IBM',
      Location: 'Chicago, IL',
      Job_Type: 'Full-time',
      Applicants: '74',
    },
    {
      Title: 'Frontend Developer',
      Company: 'IBM',
      Location: 'Chicago, IL',
      Job_Type: 'Full-time',
      Applicants: '121',
    },
    {
      Title: 'Design Engineer',
      Company: 'Hook',
      Location: 'Berlin, Germany',
      Job_Type: 'Full-time',
      Applicants: '121',
    },
    {
      Title: 'Frontend Developer',
      Company: 'IBM',
      Location: 'Chicago, IL',
      Job_Type: 'Full-time',
      Applicants: '121',
    },
    {
      Title: 'Sales Analyst',
      Company: 'IBM',
      Location: 'Chicago, IL',
      Job_Type: 'Full-time',
      Applicants: '74',
    },
  ])
  return (
    <div className={Style.empDashJobsAllCards}>
      <div className={Style.dashNewJobsMain}>
        <Row gutter={30}>
          {jobs.map((job) => {
            return (
              <Col span={8} key={Math.random}>
                <div className={Style.empDashJobsCard}>
                  <SingleJob
                    key={job.Title}
                    title={job.Title}
                    company={job.Company}
                    location={job.Location}
                    job_type={job.Job_Type}
                    applicants={job.Applicants}
                    type="new_jobs"
                  />
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}

export default EmpDashJobsMain
