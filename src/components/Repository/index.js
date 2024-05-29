import GithubContext from '../../context/GithubContext'

import SpecificRepository from '../SpecificRepository'
import Header from '../Header'

const Repository = (props) => (
  <GithubContext.Consumer>
    {value => {
      const {isDarkMode, userName} = value

      return (
        <>
          <Header />
          <SpecificRepository userName={userName} isDarkMode={isDarkMode} match={props}/>
        </>
      )
    }}
  </GithubContext.Consumer>
)

export default Repository
