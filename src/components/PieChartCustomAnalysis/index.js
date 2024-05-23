import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const PieChartCustomAnalysis = props => {
  const {languages, languagesRepo, repoCommitCount} = props

  const data = []
  Object.entries(languages).map((key, value) => data.push({name: key, value}))
  const data1 = []
  Object.entries(languagesRepo).map((key, value) =>
    data1.push({name: key, value}),
  )
  const data2 = []
  Object.entries(repoCommitCount).map((key, value) =>
    data2.push({name: key, value}),
  )

  return (
    <>
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
      <div>
        <h1 className="piechar-text-style">Language Per Repos</h1>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              cx="70%"
              cy="40%"
              data={data1}
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
      </div>
      <div>
        <h1 className="piechar-text-style">Commits Per Repo</h1>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              cx="70%"
              cy="40%"
              data={data2}
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
      </div>
    </>
  )
}

export default PieChartCustomAnalysis
