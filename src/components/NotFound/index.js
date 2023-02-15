import './index.css'

const NotFound = () => (
  <div className="not-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-image"
    />
    <h1 className="not-title">Page Not Found</h1>
    <p className="not-description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
