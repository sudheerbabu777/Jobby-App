import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <ul className="header-container">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website logo"
          />
        </li>
        <li>
          <ul className="home-jobs-container">
            <Link to="/">
              <li className="title">Home</li>
            </Link>
            <Link to="/jobs">
              <li className="title">Jobs</li>
            </Link>
          </ul>
        </li>
        <li>
          <button
            className="logout-button"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
