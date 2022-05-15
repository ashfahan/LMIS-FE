import {
  EnvironmentOutlined,
  FlagOutlined,
  PayCircleOutlined,
  ReadOutlined,
} from '@ant-design/icons'
import { Row } from 'antd'
import Image from 'next/image'
import React from 'react'
import user from '../../../../public/img/user.png'
import Style from './candidatesComponents.module.scss'

const CandidatesProfileCardSmall = (props) => {
  return (
    <div
      className={Style.candidatesProfileCard}
      style={{ margin: props.margin }}
    >
      <div className={Style.candidatesProfileCardSmall}>
        <Row>
          <Row>
            <div className={Style.cardHeader}>
              {props.profilePic ? (
                <span
                  style={{
                    minWidth: '40px',
                    minHeight: '40px',
                    maxWidth: '40px',
                    maxHeight: '40px',
                    borderRadius: '30px',
                    border: 'solid 1px #ddd',
                    overflow: 'hidden',
                  }}
                >
                  <img src={`${props.profilePic}`} />
                </span>
              ) : (
                <span
                  style={{
                    minWidth: '40px',
                    minHeight: '40px',
                    maxWidth: '40px',
                    maxHeight: '40px',
                    borderRadius: '30px',
                    border: 'solid 1px #ddd',
                    overflow: 'hidden',
                  }}
                >
                  <Image src={user} alt="search" />
                </span>
              )}

              {/* <img src={props.profilePic} /> */}
              <div className={Style.profile}>
                <h3>{props.userName}</h3>
                {/* <h4><a href=''>CV</a> <span> </span> <a href=''>LinkedIn</a></h4> */}
              </div>
            </div>
          </Row>
          <Row>
            <div className={Style.cardInfo}>
              <ul>
                {props.college && (
                  <li>
                    <ReadOutlined className={Style.icons} />{' '}
                    <p>{props.college}</p>
                  </li>
                )}
                {props.salary && (
                  <li>
                    <PayCircleOutlined className={Style.icons} />{' '}
                    <p>{props.salary}</p>
                  </li>
                )}
                {props.location && (
                  <li>
                    <EnvironmentOutlined className={Style.icons} />{' '}
                    <p>{props.location}</p>
                  </li>
                )}
                {props.experience && (
                  <li>
                    <FlagOutlined className={Style.icons} />{' '}
                    <p>{props.experience}</p>
                  </li>
                )}
              </ul>
            </div>
          </Row>
        </Row>
      </div>
    </div>
  )
}

export default CandidatesProfileCardSmall
