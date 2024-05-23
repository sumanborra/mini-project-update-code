import {useState} from 'react'
import {Link} from 'react-router-dom'

import {GiHamburgerMenu} from 'react-icons/gi'

import GithubContext from '../../context/GithubContext'

import './index.css'

const Header = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const clickedButtonMenu = () => {
    setIsButtonClicked(prevIsButtonClicked => !prevIsButtonClicked)
  }

  return (
    <GithubContext.Consumer>
      {value => {
        const {isDarkMode, changeTheme} = value
        const backgroundStyle = isDarkMode === true ? 'dark' : ''
        const backgroundStyleSmallDevice = isDarkMode === true ? 'dark' : ''
        const themeText = isDarkMode === true ? 'Light Mode' : 'Dark Mode'
        const changeThemebackground = () => {
          changeTheme()
        }
        return (
          <>
            <nav className={`nav-container ${backgroundStyle}`}>
              <Link to="/" className="link-style">
                {' '}
                <h1 className="title-nav-section">GitHub Profile Visualizer</h1>
              </Link>

              <ul className="links-container">
                <li className="para-link" onClick={changeThemebackground}>
                  <button type="button" className="them-button">
                    {themeText}
                  </button>
                </li>
                <Link to="/" className="link-style">
                  {' '}
                  <li className="para-link">Home</li>
                </Link>
                <Link to="/repository" className="link-style">
                  <li className="para-link">Repositories</li>
                </Link>
                <Link to="/analysis" className="link-style">
                  <li className="para-link">Analysis</li>
                </Link>
              </ul>
            </nav>
            <nav className={`nav-main-container ${backgroundStyleSmallDevice}`}>
              <div className="nav-container-small-devices">
                <Link to="/" className="link-style">
                  <h1 className="title-nav-section">
                    Github Profile Visualizer
                  </h1>
                </Link>
                <button
                  type="button"
                  className="them-button"
                  onClick={changeThemebackground}
                >
                  {themeText}
                </button>
                <button
                  type="button"
                  aria-label="menu"
                  className="menu-button"
                  onClick={clickedButtonMenu}
                >
                  <GiHamburgerMenu className="menu-icon" />
                </button>
              </div>
              {isButtonClicked === true && (
                <ul className="options-container">
                  <Link to="/" className="link-style">
                    <li className="para-link text-in-small-devices">Home</li>
                  </Link>
                  <Link to="/repository" className="link-style">
                    <li className="para-link text-in-small-devices">
                      Repositories
                    </li>
                  </Link>
                  <Link to="/analysis" className="link-style">
                    <li className="para-link text-in-small-devices">
                      Analysis
                    </li>
                  </Link>
                </ul>
              )}
            </nav>
          </>
        )
      }}
    </GithubContext.Consumer>
  )
}
export default Header
