import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'

import './index.css'

const LinearChartData = props => {
  const {quarterCommitCount} = props

  const data = []
  Object.entries(quarterCommitCount).map(array =>
    data.push({name: array[0], value: array[1]}),
  )

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        activeDot={{r: 8}}
      />
    </LineChart>
  )
}
export default LinearChartData
