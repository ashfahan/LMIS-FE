import { LeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import Style from '../../../styles/profile.module.scss'

const ShowSuccess = (props) => {
  return (
    <div>
      <div className={Style.authWrapper}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '10px',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 11.0799V11.9999C21.9988 14.1563 21.3005 16.2545 20.0093 17.9817C18.7182 19.7088 16.9033 20.9723 14.8354 21.5838C12.7674 22.1952 10.5573 22.1218 8.53447 21.3744C6.51168 20.6271 4.78465 19.246 3.61096 17.4369C2.43727 15.6279 1.87979 13.4879 2.02168 11.3362C2.16356 9.18443 2.99721 7.13619 4.39828 5.49694C5.79935 3.85768 7.69279 2.71525 9.79619 2.24001C11.8996 1.76477 14.1003 1.9822 16.07 2.85986"
              stroke="#27AE60"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 4L12 14.01L9 11.01"
              stroke="#27AE60"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 style={{ margin: 0 }}>{props.title}</h3>
        </div>
        <p>{props.desc}</p>
        <div className={Style.sectionBottom}>
          <Link href={props.btnLink}>
            <Button type="primary">{props.btnText}</Button>
          </Link>

          <div className="skip_back_options" style={{ marginTop: '10px' }}>
            <span>
              <LeftOutlined /> Back
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowSuccess
