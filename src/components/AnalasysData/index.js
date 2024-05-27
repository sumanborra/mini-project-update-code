import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import PieChartCustomAnalysis from '../PieChartCustomAnalysis'
import LinearChartData from '../LinearChartData'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inValid: 'INVALID',
}

const AnalasysData = props => {
  const [apiStausValue, setApiStatusValue] = useState(apiStatus.initial)
  const [repostoryLists, setRepositorLists] = useState({})
  const {userName, isDarkMode} = props
  const backgroundColorAnalysis = isDarkMode === true ? 'dark' : ''
  const backgroundColorAnalysisPiechart =
    isDarkMode === true ? 'darkLightt' : ''
  const repositoryData = async () => {
    setApiStatusValue(apiStatus.loading)
    const response = await fetch(
      `https://apis2.ccbp.in/gpv/profile-summary/${userName}?api_key=`,
    )
    const datare = await response.json()

    if (response.ok === true) {
      const updateData = {
        languagePerCommit: datare.langCommitCount,
        languagePerRepos: datare.langRepoCount,
        repoCommitCount: datare.repoCommitCount,
        quarterCommitCount: datare.quarterCommitCount,
        avatarUrl: datare.user.avatarUrl,
        login: datare.user.login,
      }
      console.log(updateData)
      setRepositorLists(updateData)
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
    <div data-testid='loader' className='repo-item'>
      <Loader type='TailSpin' height={50} width={50} color='#2bc5f0' />
    </div>
  )

  const recallApi = () => {
    repositoryData()
  }

  const failureView = () => (
    <div className='no-profile-view'>
      <img
        src='https://res.cloudinary.com/dq6jxocbv/image/upload/v1712129835/Group_7522_ym73jg.png'
        alt='failure view'
        className='img-no-profile'
      />
      <p className='something-wrong-text'>
        Something went wrong. Please try again
      </p>
      <button type='button' className='try-again-button' onClick={recallApi}>
        Try Again
      </button>
    </div>
  )
  const inValidUser = () => (
    <div className='no-data-found-main-container'>
      <img
        src='https://res.cloudinary.com/dq6jxocbv/image/upload/v1716187323/Empty_Box_Illustration_1_rgufro.png'
        alt='empty analysis'
        className='no-data-found-image'
      />
      <h1 className='text-no-data-found'>No Data Found</h1>
      <p className='text-no-data-found-para'>
        GitHub username is empty, please provide a valid username for Analysis
      </p>
      <Link to='/'>
        <button type='button' className='button-no-data-found'>
          Go to Home
        </button>
      </Link>
    </div>
  )

  const successView = () => {
    const {
      languagePerCommit,
      languagePerRepos,
      repoCommitCount,
      quarterCommitCount,
      avatarUrl,
      login,
    } = repostoryLists

    return (
      <>
        {Object.keys(languagePerRepos).length === 0 && (
          <div className='no-analysis-found-main-container'>
            <img
              src='https://res.cloudinary.com/dq6jxocbv/image/upload/v1716187331/Layer_3_udr2er.png'
              alt='no analysis'
              className='no-analysis-found-image'
            />
            <p className='text-no-analysis'>No Analysis Found!</p>
          </div>
        )}

        {Object.keys(languagePerRepos).length !== 0 && (
          <div
            className={`success-view-container-specific-item-details ${backgroundColorAnalysisPiechart}`}
          >
            <div>
              <h1 className='languages-text-contributors'>Analysis</h1>
              <div className='analysis-avatar-image-container'>
                <img
                  src={avatarUrl}
                  alt={login}
                  className='analysis-avtar-image'
                />
                <h1 className='languages-text-contributors'>{login}</h1>
              </div>
              <LinearChartData quarterCommitCount={quarterCommitCount} />
            </div>
            <div>
              <h1 className='languages-text-contributors'>
                Language Per Commits
              </h1>
              <PieChartCustomAnalysis
                languages={languagePerCommit}
                languagesRepo={languagePerRepos}
                repoCommitCount={repoCommitCount}
                quarterCommitCount={quarterCommitCount}
              />
            </div>
          </div>
        )}
      </>
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
      case apiStatus.inValid:
        return inValidUser()
      default:
        return null
    }
  }

  return (
    <div className={`specific-repository ${backgroundColorAnalysis}`}>
      {resultPage()}
    </div>
  )
}
export default AnalasysData
