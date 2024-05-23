import {Link} from 'react-router-dom'

import './index.css'

const RepositoryItem = props => {
  const {list, isDarkMode} = props
  const {description, name, languages} = list
  const repositoriesbackground = isDarkMode === true ? 'darkLight' : ''
  return (
    <>
      <Link to={`/repositories/${name}`} className="link-styles">
        <li className={`list-items-repository ${repositoriesbackground}`}>
          <p className="name-repo">{name}</p>
          <p className="descript">{description}</p>

          <ul className="list-container-items-repos">
            {languages.map(each => (
              <li key={each.value} className="languages-items">
                {each.name}
              </li>
            ))}
          </ul>
        </li>
      </Link>
    </>
  )
}
export default RepositoryItem
