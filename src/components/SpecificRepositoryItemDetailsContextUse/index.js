import SpecificRepositoryItemDetails from '../SpecificRepositoryItemDetails'
import GithubContext from '../../context/GithubContext'
import Header from '../Header'

const SpecificRepositoryItemDetailsContextUse = props => {
  const {match} = props
  const {params} = match
  return (
    <GithubContext.Consumer>
      {value => {
        const {userName, isDarkMode} = value

        return (
          <>
            <Header />
            <SpecificRepositoryItemDetails
              userName={userName}
              params={params}
              isDarkMode={isDarkMode}
            />
          </>
        )
      }}
    </GithubContext.Consumer>
  )
}
export default SpecificRepositoryItemDetailsContextUse
