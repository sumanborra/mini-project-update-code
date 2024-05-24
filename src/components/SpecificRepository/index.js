import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inValid: 'INVALID',
}

const SpecificRepository = props => {
  const [apiStausValue, setApiStatusValue] = useState(apiStatus.initial)

  const [repostoryLists, setRepositorLists] = useState([])
  const {userName, isDarkMode} = props

  const backgroundRepositoriesColor = isDarkMode === true ? 'dark' : ''

  const repositoryData = async () => {
    setApiStatusValue(apiStatus.loading)
    const response = await fetch(
      `https://apis2.ccbp.in/gpv/repos/${userName}`,
    )
    const datare = await response.json()

    if (response.ok === true) {
      const updateList = datare.map(each => ({
        description: each.description,
        id: each.id,
        name: each.name,
        languages: each.languages,
      }))

      setRepositorLists(updateList)
      setApiStatusValue(apiStatus.success)
    } else if (datare.error_msg === 'Invalid username') {
      setApiStatusValue(apiStatus.inValid)
    } else {
      setApiStatusValue(apiStatus.failure)
    }
  }

  useEffect(() => {
    repositoryData()
  }, [])
  const loadingView = () => (
    <div data-testid="loader" className="repo-item">
      <Loader type="TailSpin" height={50} width={50} color="#f218d9" />
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
      <p className="something-wrong-text">
        Something went wrong. Please try again
      </p>
      <button type="button" className="try-again-button" onClick={recallApi}>
        Try Again
      </button>
    </div>
  )
  const inValidUser = () => (
    <div className="no-data-found-main-container">
      <img
        src="https://res.cloudinary.com/dq6jxocbv/image/upload/v1716187323/Empty_Box_Illustration_1_rgufro.png"
        alt="empty repositories"
        className="no-data-found-image"
      />
      <h1 className="text-no-data-found">No Data Found</h1>
      <p className="text-no-data-found-para">
        GitHub username is empty, please provide a valid username for
        Repositories
      </p>
      <Link to="/">
        <button type="button" className="button-no-data-found">
          Go to Home
        </button>
      </Link>
    </div>
  )
  const successView = () => (
    <>
      {repostoryLists.length === 0 && (
        <div className="no-analysis-found-main-container">
          <img
            src="https://res.cloudinary.com/dq6jxocbv/image/upload/v1716187331/Layer_3_udr2er.png"
            alt="no repositories"
            className="no-analysis-found-image"
          />
          <h1 className="text-no-analysis">No Repositories Found</h1>
        </div>
      )}

      {repostoryLists.length !== 0 && (
        <div className="success-view-container">
          <h1 className="text-repository">Repositories</h1>
          <ul className="list-container-repositor">
            {repostoryLists.map(each => (
              <RepositoryItem
                list={each}
                key={each.id}
                isDarkMode={isDarkMode}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  )
  const resultPage = () => {
    switch (apiStausValue) {
      case apiStatus.loading:
        return loadingView()
      case apiStatus.failure:
        return failureView()
      case apiStatus.success:
        return successView()
      case apiStatus.inValid:
        return inValidUser()
      default:
        return null
    }
  }

  return (
    <div
      className={`specific-repository-main-container ${backgroundRepositoriesColor}`}
    >
      {resultPage()}
    </div>
  )
}
export default SpecificRepository
