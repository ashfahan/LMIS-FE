import React, { useEffect, useState } from 'react'
import weekDaysEnum from '../../../shared/weekDaysEnum'
import Style from '../../../styles/dashboard.module.scss'
import ChartOfBars from '../user/chartOfBars'

const EmpDashCharts = (props) => {
  const [graphData, setGraphData] = useState([])
  useEffect(() => {
    let _data = props?.data?.map((item) => {
      let _labelIndex = Object.keys(weekDaysEnum).indexOf(item.name)
      let _labelName = Object.values(weekDaysEnum)[_labelIndex]
      return {
        name: _labelName,
        uv: item.uv,
        pv: item.amt,
        amt: Math.max.apply(
          Math,
          props.data.map(function (o) {
            return o.amt
          }),
        ),
      }
    })
    setGraphData(_data)
  }, [props.data])
  return (
    <div className={Style.empDashChartsMain}>
      <div className={Style.dashJobCategoryTitle}>
        <p className={`${Style.dFlex}`}>
          <span style={{ flex: 1 }}>{props.title}</span>{' '}
          <a onClick={() => props.handleLinkClick()}>{props.linkText}</a>
        </p>
      </div>
      <div className={`${Style.dFlex}`}>
        <h3 style={{ flex: 1 }}>{props?.totalRecords} </h3>
        {/* <span className={Style.red}>+1.2%</span> */}
      </div>
      <ChartOfBars data={graphData} />
    </div>
  )
}

export default EmpDashCharts
