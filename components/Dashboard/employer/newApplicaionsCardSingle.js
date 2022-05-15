import {
  DollarOutlined,
  EnvironmentOutlined,
  FlagOutlined,
  ReadOutlined,
} from '@ant-design/icons'
import { Row } from 'antd'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import user from '../../../public/img/user.png'
import dashboardStyle from '../../../styles/dashboard.module.scss'
import Style from './candidates/candidatesComponents.module.scss'

export default function NewApplicationsSingle(props) {
  const { t } = useTranslation()

  return (
    // <div className={Style.dashJobsCardItem}>
    //     <h4> <img src={props.profile} />
    //         {props.name} <span> {props.designation}</span></h4>
    //     {/* <a href='#'>View Application</a> */}
    // </div>
    <div className={`${Style.candidatesProfileCard} ${dashboardStyle.overLay}`}>
      <Row>
        <Row>
          <div className={Style.cardHeader}>
            {props.pictureExtention ? (
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
                <img src={`${props.pictureExtention}`} />
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
            <div className={Style.profile}>
              <h3>{props.name}</h3>
              <h4>
                {props.resumePath.length > 0 && (
                  <a
                    href={`data:application/pdf;base64,${props.resumePath}`}
                    download="file.pdf"
                  />
                )}
                {/* <span> </span> <a href="">LinkedIn</a> */}
              </h4>
            </div>
            {/* <p>For {props.designation}</p> */}
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
                  <DollarOutlined className={Style.icons} />{' '}
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
        <Row>
          {/* <div className={Style.cardTags}>
                    <ul>
                        <li><p>{props.tags[0]}</p></li>
                        <li><p>{props.tags[1]}</p></li>
                        <li><p>{props.tags[2]}</p></li>
                        <li><p>{props.tags[3]}</p></li>
                    </ul>
                </div> */}
        </Row>
        <Row>
          <div className={Style.cardFooter}>
            {/* {props.jobid ? (
              <Link href={`/applicant/${props.candiid}/${props.jobid}`}>
                <span style={{ cursor: "pointer" }} onClick={setJobApplication}>
                  View Application
                </span>
              </Link>
            ) : (
              <Link href={`/applicant/${props.candiid}`}>
                <span style={{ cursor: "pointer" }} onClick={setJobApplication}>
                  {t("view_application")}
                </span>
              </Link>
            )} */}
            {props.status && <span>{props.status}</span>}
          </div>
        </Row>
      </Row>
    </div>
  )
}
