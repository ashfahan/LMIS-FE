import React from 'react'
import { Cell, Pie, PieChart } from 'recharts'

export default function ChartOfPie({ data, COLORS }) {
  return (
    <PieChart
      width={100}
      height={100}
      onMouseEnter={() => {}}
      style={{ marginBottom: '20px' }}
    >
      <Pie
        data={data}
        cx={45}
        cy={45}
        innerRadius={30}
        outerRadius={50}
        fill="#8884d8"
        paddingAngle={1}
        dataKey="value"
      >
        {data?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}
