import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const PieChartCustom = props => {
  const {languages} = props

  const data = languages.slice(0, 5)

  const COLORS = ['#54CA76', '#31A4E6', '#9261F3', '#F2637F', '#F5C452']

  return (
    <>
      <ResponsiveContainer width={800} height={300}>
        <PieChart>
          <Pie
            cx="70%"
            cy="40%"
            data={data}
            startAngle={0}
            endAngle={360}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key="name" fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            iconType="square"
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}
export default PieChartCustom
