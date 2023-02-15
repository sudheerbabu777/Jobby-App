import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobsItem = props => {
  const {jobsDetails} = props
  const {
    id,
    companyLogoUrl,
    location,
    title,
    rating,
    packagePerAnnum,
    jobDescription,
    employmentType,
  } = jobsDetails

  return (
    <Link to={`jobs/${id}`}>
      <li className="item-container">
        <div className="compony-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="jobs-image-company"
          />
          <div className="job-title-container">
            <h1 className="jab-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar size="22" color="#fbbf24" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="package-container">
          <div className="jab-type-container">
            <div className="location-container">
              <MdLocationOn size="30" color="#ffffff" />
              <p className="jab-location">{location}</p>
            </div>

            <p className="job-type">{employmentType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsItem
