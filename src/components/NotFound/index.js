import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="Not-found-page-main-container">
    <img
      src="https://res.cloudinary.com/dq6jxocbv/image/upload/v1716182855/Group_7519_afzdvj.png"
      alt="page not found"
      className="not-found-image"
    />
    <h1 className="text-page-not-found">PAGE NOT FOUND</h1>
    <p className="text-page-not-found-para">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>

    <Link to="/">
      <button type="button" className="bo-to-home-button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
