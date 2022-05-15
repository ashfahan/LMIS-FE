import { HeartOutlined } from '@ant-design/icons'
import React from 'react'
import Style from '../../styles/dashboard.module.scss'

export default function SavedJob(props) {
  return (
    <div className={Style.dashJobsCardItem}>
      <h4>
        {props.title} <HeartOutlined className={Style.heartIcon} />
      </h4>
      {props.type === 'saved_jobs' && (
        <p>
          {props.company} <div className={Style.dot}></div> {props.location}{' '}
          <div className={Style.dot}></div> {props.job_type}
        </p>
      )}
      <a href="#">View Details</a>
    </div>
  )
}
