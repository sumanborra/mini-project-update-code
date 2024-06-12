import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const PieChartCustomAnalysis = props => {
  const {languages, languagesRepo, repoCommitCount} = props
  console.log(languagesRepo)

  const data = Object.entries(languages).map(([nameOfLanguage, value]) => ({
    name: nameOfLanguage,
    value,
  }))

  const data1 = Object.entries(languagesRepo).map(
    ([nameOfLanguage, value]) => ({
      name: nameOfLanguage,
      value,
    }),
  )

  const data2 = Object.entries(repoCommitCount).map(
    ([nameOfLanguage, value]) => ({
      name: nameOfLanguage,
      value,
    }),
  )

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
      <div>
        <h1 className="piechar-text-style">Language Per Repos</h1>
        <ResponsiveContainer width={800} height={300}>
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
              {data1.map((entry, index) => (
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
      </div>
      <div>
        <h1 className="piechar-text-style">Commits Per Repo (Top 10)</h1>
        <ResponsiveContainer width={800} height={300}>
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
              {data2.map((entry, index) => (
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
      </div>
    </>
  )
}

export default PieChartCustomAnalysis
