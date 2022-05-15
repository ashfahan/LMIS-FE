import React from 'react'
import Style from '../../../styles/dashboard.module.scss'
import ChartInfo from '../user/chartInfo'
import ChartOfPie from '../user/chartOfPie'

const COLORS = ['#06D6A0', '#EF476F', '#FFAD3D']
const EmpDashCharts = ({
  title,
  linkText,
  approvedApplicationsCount,
  rejectedApplicationsCount,
  shortListedApplicationsCount,
  allJobApplicationsCount,
  handleLinkClick,
}) => {
  const data = [
    { name: 'Approved', value: approvedApplicationsCount },
    { name: 'Rejected', value: rejectedApplicationsCount },
    { name: 'Shortlisted', value: shortListedApplicationsCount },
  ]

  return (
    <div className={Style.empDashChartsMain}>
      <div className={Style.dashJobCategoryTitle}>
        <p className={`${Style.dFlex}`}>
          <span style={{ flex: 1 }}>{title}</span>{' '}
          <a onClick={() => handleLinkClick()}>{linkText}</a>
        </p>
      </div>
      <div className={`${Style.dFlex}`}>
        <h3 style={{ flex: 1 }}>{allJobApplicationsCount} </h3>
        {/* <span className={Style.red}>+1.2%</span> */}
      </div>
      <div className={`${Style.dFlex} ${Style.alignItemCenter}`}>
        <ChartOfPie data={data} COLORS={COLORS} />
        <div style={{ marginLeft: '5px' }}>
          <ChartInfo
            approved={approvedApplicationsCount}
            rejected={rejectedApplicationsCount}
            shortlisted={shortListedApplicationsCount}
          />
        </div>
      </div>
    </div>
  )
}

export default EmpDashCharts
