import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import Repository from './components/Repository'
import GithubContext from './context/GithubContext'
import SpecificRepositoryItemDetailsContextUse from './components/SpecificRepositoryItemDetailsContextUse'
import AnalasysisContextUse from './components/AnalasysisContextUse'
import NotFound from './components/NotFound'

import './App.css'

const App = () => {
  const [userName, setUserName] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const changeTheme = () => {
    setIsDarkMode(prevValue => !prevValue)
  }
  const changeUserName = value => {
    setUserName(value)
  }
  return (
    <GithubContext.Provider
      value={{userName, changeUserName, isDarkMode, changeTheme}}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/repositories" component={Repository} />
        <Route
          exact
          path="/repositories/:repoName"
          component={SpecificRepositoryItemDetailsContextUse}
        />
        <Route exact path="/analysis" component={AnalasysisContextUse} />
        <Route component={NotFound} />
      </Switch>
    </GithubContext.Provider>
  )
}
export default App
