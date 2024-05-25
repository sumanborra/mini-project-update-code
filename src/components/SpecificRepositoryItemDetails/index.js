import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import PieChartCustom from '../PieChartCustom'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const SpecificRepositoryItemDetails = props => {
  const [apiStausValue, setApiStatusValue] = useState(apiStatus.initial)
  const [repostoryLists, setRepositorLists] = useState({})
  const {userName, params, isDarkMode} = props
  const {repoName} = params
  const backgroundColorItemDetails = isDarkMode === true ? 'dark' : ''
  const backgroundColorAnalysisPiechart =
    isDarkMode === true ? 'darkLightt' : ''
  const repositoryData = async () => {
    setApiStatusValue(apiStatus.loading)
    const response = await fetch(
      `https://apis2.ccbp.in/gpv/specific-repo/${userName}/${repoName}`,
    )
    const datare = await response.json()

    if (response.ok === true) {
      const updateData = {
        contributors: datare.contributors.map(each => ({
          avatarUrl: each.avatar_url,
          id: each.id,
        })),
        name: datare.name,
        languages: datare.lanuages,
        description: datare.description,
        openIssueCount: datare.open_issues_count,
        stargazersCount: datare.stargazers_count,
        forksCount: datare.forks_count,
      }

      setRepositorLists(updateData)
      setApiStatusValue(apiStatus.success)
    } else {
      setApiStatusValue(apiStatus.failure)
    }
  }
  useEffect(() => {
    repositoryData()
  }, [])

  const loadingView = () => (
    <div data-testid="loader" className="repo-item">
      <Loader type="TailSpin" height={50} width={50} color="#2bc5f0" />
    </div>
  )

  const recallApi = () => {
    repositoryData()
  }

  const failureView = () => (
    <div className="no-profile-view">
      <img
        src="https://res.cloudinary.com/dq6jxocbv/image/upload/v1712129835/Group_7522_ym73jg.png"
        alt="failure view"
        className="img-no-profile"
      />
      <p className="something-wrong-text">Something went wrong</p>
      <button type="button" className="try-again-button" onClick={recallApi}>
        Try Again
      </button>
    </div>
  )

  const successView = () => {
    const {contributors} = repostoryLists
    const filterData = contributors.slice(0, 5)
    return (
      <div
        className={`success-view-container-specific-item-details ${backgroundColorAnalysisPiechart}`}
      >
        <h1 className="text-repository-name">{repostoryLists.name}</h1>
        <p className="text-repository-description">
          {repostoryLists.description}
        </p>
        <ul className="list-container-repositor-item-details">
          {repostoryLists.languages.map(each => (
            <li key={each.name} className="specific-item-details-list-item">
              {' '}
              <p> {each.name}</p>
            </li>
          ))}
        </ul>
        <div className="contributors-main-cout-container">
          <p className="count-text">{repostoryLists.forksCount}</p>
          <p className="count-text">{repostoryLists.stargazersCount}</p>
          <div className="contributors-count-container">
            <p className="count-text">Watchers Counts</p>
            <p className="count-text">{repostoryLists.contributors.length}</p>
          </div>
          <div className="contributors-count-container">
            <p className="count-text">Issues Counts</p>
            <p className="count-text">{repostoryLists.openIssueCount}</p>
          </div>
        </div>
        <div className="contributors-avatar-container">
          <h1 className="count-text-title-contributors">Contributors</h1>
          <p className="count-text">
            {repostoryLists.contributors.length} Members
          </p>
          <div className="contributors-avatar-images-and-remaing-main-container">
            <ul className="list-container-repositor-item-details">
              {filterData.map(each => (
                <li
                  key={each.id}
                  className="specific-item-details-avtar-contributors"
                >
                  <img
                    src={each.avatarUrl}
                    alt="contributor profile"
                    className="contributors-images"
                  />
                </li>
              ))}
            </ul>
            <div className="remaing-images-in-contributors">
              <p>+{repostoryLists.contributors.length - 5}</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="languages-text-contributors">Languages</h1>
          <PieChartCustom languages={repostoryLists.languages} />
        </div>
      </div>
    )
  }
  const resultPage = () => {
    switch (apiStausValue) {
      case apiStatus.loading:
        return loadingView()
      case apiStatus.failure:
        return failureView()
      case apiStatus.success:
        return successView()
      default:
        return null
    }
  }

  return (
    <div
      className={`specific-repository-item-details ${backgroundColorItemDetails}`}
    >
      {resultPage()}
    </div>
  )
}
export default SpecificRepositoryItemDetails
