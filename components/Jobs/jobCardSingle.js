import { Card } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Style from '../../styles/dashboard.module.scss'

export default function JobCardSingle(props) {
  const { t } = useTranslation()
  const handleClick = () => {
    props.handleClick()
    return
  }
  return (
    <Card.Grid className={`${Style.overLay} ${Style.gridContainer}`}>
      <div className={Style.dashJobsCardItem} onClick={handleClick}>
        <h4>
          {props.title + ' '}
          {/* {!props.heartIcon && (
            <HeartOutlined className={Style.heartIcon} />
          )}  */}
        </h4>
        <p style={{ marginBottom: 5 }}>{props.company || 1}</p>

        <a>{t('view_details')}</a>
      </div>
    </Card.Grid>
  )
}
