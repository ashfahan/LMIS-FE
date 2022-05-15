import { Card } from 'antd'
import React from 'react'
import Style from '../../styles/dashboard.module.scss'

export default function SingleJob(props) {
  return (
    <Card.Grid className={`${Style.overLay} ${Style.gridContainer}`}>
      <div className={Style.dashJobsCardItem}>
        {/* <h4>{props.title} <HeartOutlined className={Style.heartIcon} /> <i>{props.applicants}</i></h4> */}
        <h4>
          {props.title}
          <i>{props.applicants}</i>
        </h4>
        {props.type === 'new_jobs' && (
          <p style={{ margin: 0 }}>
            {props.company}{' '}
            {props.location && <div className={Style.dot}></div>}
            {props.location}
            {props.job_type && <div className={Style.dot}></div>}{' '}
            {props.job_type}
          </p>
        )}
        <a href="#">View Details</a>
      </div>
      <div className={Style.rightContainer}>
        <h3>{props.applicantsCount}</h3>
        {!props.isDraft && (
          <span style={{ fontSize: '12px' }}>
            Applicant{props?.applicantsCount > 1 ? 's' : ''}
          </span>
        )}
      </div>
    </Card.Grid>
  )
}
