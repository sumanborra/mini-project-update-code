import AnalasysData from '../AnalasysData'
import GithubContext from '../../context/GithubContext'
import Header from '../Header'

const AnalasysisContextUse = props => (
  <GithubContext.Consumer>
    {value => {
      const {userName, isDarkMode} = value

      return (
        <>
          <Header />
          <AnalasysData
            userName={userName}
            isDarkMode={isDarkMode}
            match={props}
          />
        </>
      )
    }}
  </GithubContext.Consumer>
)

export default AnalasysisContextUse
