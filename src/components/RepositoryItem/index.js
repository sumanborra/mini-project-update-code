import {Link} from 'react-router-dom'

import './index.css'

const RepositoryItem = props => {
  const {list, isDarkMode} = props
  const {description, name, languages, login, avatarUrl} = list
  const repositoriesbackground = isDarkMode === true ? 'darkLight' : ''
  return (
    <>
      <Link to={`/repositories/${name}`} className="link-styles">
        <li className={`list-items-repository ${repositoriesbackground}`}>
          <div className="profile-repos-image-conatiner">
            <img src={avatarUrl} alt={login} className="image-avatar-repo" />
            <h1 className="text-repository">{login}</h1>
          </div>
          <p className="name-repo">{name}</p>
          <p className="descript">{description}</p>

          <ul className="list-container-items-repos">
            {languages.map(each => (
              <li key={each.value} className="languages-items">
               <p className="name-repo"> {each.name}</p>
              </li>
            ))}
          </ul>
        </li>
      </Link>
    </>
  )
}
export default RepositoryItem
