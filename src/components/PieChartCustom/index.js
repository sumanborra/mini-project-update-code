import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const PieChartCustom = props => {
  const {languages} = props
  const data = languages.slice(0, 5)
  return (
    <ResponsiveContainer width="100%" height={300}>
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
          <Cell name="JavaScript" fill="#fecba6" />
          <Cell name="Python" fill="#b3d23f" />
          <Cell name="HTML" fill="#a44c9e" />
          <Cell name="C" fill="#e31bbe" />
          <Cell name="C++" fill="#8c467f" />
          <Cell name="Java" fill="#2691b5" />
        </Pie>
        <Legend
          iconType="square"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartCustom
