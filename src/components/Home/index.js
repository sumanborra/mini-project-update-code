import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import {IoMdLink} from 'react-icons/io'
import {IoLocationOutline} from 'react-icons/io5'
import {RiBuildingLine} from 'react-icons/ri'
import GithubContext from '../../context/GithubContext'
import Header from '../Header'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    userName: '',
    errorMesg: '',
    userDetails: {},
    isDetails: false,
    apiStatusValue: apiStatus.initial,
  }

  changeUserName = event => {
    this.setState({userName: event.target.value})
  }

  clickButton = async () => {
    this.setState({apiStatusValue: apiStatus.loading, isDetails: true})
    const {userName} = this.state

    const url = `https://apis2.ccbp.in/gpv/profile-details/${userName}?api_key=`
    const response = await fetch(url)

    const data = await response.json()

    if (response.ok === true) {
      const updateData = {
        avatarUrl: data.avatar_url,
        bio: data.bio,
        company: data.company,
        createdAt: data.created_at,
        followers: data.followers,
        following: data.following,
        location: data.location,
        name: data.name,
        publicRepos: data.public_repos,
        organizationUrl: data.organizations_url,
        login: data.login,
        blog: data.blog,
      }

      this.setState({
        errorMesg: '',
        userDetails: updateData,
        apiStatusValue: apiStatus.success,
      })
    } else {
      this.setState({
        errorMesg: data.error_msg,
        userDetails: {},
        apiStatusValue: apiStatus.failure,
        userName: '',
      })
    }
  }

  recallApi = () => {
    this.clickButton()
  }

  loadingView = () => (
    <div testid="loader" className="repo-item">
      <Loader type="TailSpin" height={50} width={50} color="#2bc5f0" />
    </div>
  )

  successView = () => {
    const {userDetails} = this.state
    const {
      avatarUrl,
      name,
      bio,
      followers,
      following,
      publicRepos,
      company,
      organizationUrl,
      location,
      login,
      blog,
    } = userDetails
    return (
      <div className="git-details-container">
        <img src={avatarUrl} alt={name} className="image-avatar" />
        <h1 className="user-name">{name}</h1>
        <p className="user-name bio-text">{login}</p>
        <p className="user-name">BIO</p>
        <p className="user-name bio-text">{bio}</p>
        <div className="follower-container">
          <div className="sub-container">
            <div className="line-text-container">
              <p className="followers-text">FOLLOWERS</p>
              <p className="text-follosers-result">{followers}</p>
            </div>
            <hr />
          </div>
          <div className="sub-container">
            <div className="line-text-container">
              <p className="followers-text">FOLLOWING</p>
              <p className="text-follosers-result">{following}</p>
            </div>
            <hr />
          </div>
          <div className="sub-container">
            <div className="line-text-container">
              <p className="followers-text">PUBLIC REPOS</p>
              <p className="text-follosers-result">{publicRepos}</p>
            </div>
            <hr />
          </div>
        </div>
        <div className="follower-container bottom-container">
          <div className="sub-container">
            <div className="line-text-container">
              <p className="followers-text bottom-text">Company</p>
              <div className="icon-text-home-page-for-react-icons">
                <RiBuildingLine color="#a51ac4" />
                <p className="text-follosers-result bottom-result-text">
                  {company}
                </p>
              </div>
            </div>
          </div>
          <div className="sub-container">
            <div className="line-text-container">
              <p className="followers-text bottom-text">Blog</p>
              <div className="icon-text-home-page-for-react-icons">
                <IoMdLink color="#a51ac4" />
                <p className="text-follosers-result bottom-result-text">
                  {blog}
                </p>
              </div>
            </div>
          </div>
          <div className="sub-container">
            <div className="line-text-container">
              <p className="followers-text bottom-text">Location</p>
              <div className="icon-text-home-page-for-react-icons">
                <IoLocationOutline color="#a51ac4" />
                <p className="text-follosers-result bottom-result-text">
                  {location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  failureView = () => (
    <div className="no-profile-view">
      <p className="something-wrong-text-home-github">
        Github Profile visualizer
      </p>
      <img
        src="https://res.cloudinary.com/dq6jxocbv/image/upload/v1712129835/Group_7522_ym73jg.png"
        alt="failure view"
        className="img-no-profile"
      />
      <p className="something-wrong-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.recallApi}
      >
        Try Again
      </button>
    </div>
  )

  resultPage = () => {
    const {apiStatusValue} = this.state
    switch (apiStatusValue) {
      case apiStatus.loading:
        return this.loadingView()
      case apiStatus.success:
        return this.successView()
      case apiStatus.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {userName, errorMesg, isDetails} = this.state

    return (
      <GithubContext.Consumer>
        {value => {
          const {isDarkMode, changeUserName} = value
          changeUserName(userName)
          const backgrounHomePage = isDarkMode === true ? 'dark' : ''
          return (
            <>
              <Header />
              <div className={`Home-main-container ${backgrounHomePage}`}>
                <div className="search-container">
                  <input
                    type="search"
                    className="input-element"
                    onChange={this.changeUserName}
                    value={userName}
                    placeholder="Enter github username"
                  />
                  <button
                    testid="searchButton"
                    type="button"
                    className="button-search-icon"
                    onClick={this.clickButton}
                  >
                    {' '}
                    <HiOutlineSearch size={30} color="#ffffff" />
                  </button>
                </div>
                {errorMesg !== '' && <p className="error-mesg">*{errorMesg}</p>}
                {isDetails === false && (
                  <div className="no-profile-view">
                    <p className="something-wrong-text">
                      Github profile visualizer
                    </p>
                    <img
                      src="https://res.cloudinary.com/dq6jxocbv/image/upload/v1716187341/Group_2_err5xy.png"
                      alt="gitHub profile visualizer home page"
                      className="img-no-profile"
                    />
                  </div>
                )}
                {this.resultPage()}
              </div>
            </>
          )
        }}
      </GithubContext.Consumer>
    )
  }
}
export default Home
