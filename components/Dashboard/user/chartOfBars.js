import React from 'react'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const chartOfBars = ({ data }) => {
  return (
    <div style={{ height: '120px', fontSize: '12px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={100}
          height={100}
          data={data}
          margin={{
            top: 10,
            right: 0,
            bottom: 5,
            left: -25,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis dataKey="amt" />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="uv" barSize={12} fill="#413ea0" />
          <Line type="monotone" dataKey="pv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default chartOfBars
