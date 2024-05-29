import {Link} from 'react-router-dom'

import './index.css'

const RepositoryItem = props => {
  const {list, isDarkMode} = props
  const {description, name, languages, stargazersCount, forksCount} = list
  const repositoriesbackground = isDarkMode === true ? 'darkLight' : ''
  return (
    <>
      <Link to={`/repositories/${name}`} className="link-styles">
        <li className={`list-items-repository ${repositoriesbackground}`}>
          <h1 className="name-repo">{name}</h1>
          <p className="descript">{description}</p>

          <ul className="list-container-items-repos">
            {languages.map(each => (
              <li key={each.value} className="languages-items">
                <p className="name-repo"> {each.name}</p>
              </li>
            ))}
          </ul>
          <p className="name-repo">{stargazersCount}</p>
          <p className="name-repo">{forksCount}</p>
        </li>
      </Link>
    </>
  )
}
export default RepositoryItem
