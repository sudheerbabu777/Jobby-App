import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="main-title">
        Find The Job That <br />
        Fits Your Life
      </h1>
      <p className="description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="jobs-button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
