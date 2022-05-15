import React from 'react'
import { useTranslation } from 'react-i18next'
import Style from './chartInfo.module.scss'

const ChartInfo = ({ approved, shortlisted, rejected }) => {
  const { t } = useTranslation()
  return (
    <div className={Style.chartInfoMain}>
      <ul>
        <li>
          <div className={Style.left}>
            <span className={Style.dot1} />
            <p>{t('approved')}</p>
          </div>
          <div className={Style.right}>
            <p>
              {approved}
              {/* <span className={Style.divider}/>44% */}
            </p>
          </div>
        </li>
        <li>
          <div className={Style.left}>
            <span className={Style.dot2} />
            <p>{t('shortlisted')}</p>
          </div>
          <div className={Style.right}>
            <p>
              {shortlisted}
              {/* <span className={Style.divider}/>44% */}
            </p>
          </div>
        </li>
        <li>
          <div className={Style.left}>
            <span className={Style.dot3} />
            <p>{t('rejected')}</p>
          </div>
          <div className={Style.right}>
            <p>
              {rejected}
              {/* <span className={Style.divider}/>44%*/}
            </p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default ChartInfo
