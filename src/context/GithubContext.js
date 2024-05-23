import React from 'react'

const GithubContext = React.createContext({
  userName: '',
  isDarkMode: false,
  changeTheme: () => {},
  changeUserName: () => {},
})
export default GithubContext
