import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {similarDetails} = props
  const {
    companyLogoUrl,
    location,
    title,
    rating,
    jobDescription,
    employmentType,
  } = similarDetails

  return (
    <li className="similar-item-container">
      <div className="compony-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-logo"
        />
        <div className="job-title-container">
          <h1 className="jab-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar size="15" color="#fbbf24" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="jab-type-container">
        <div className="location-container">
          <MdLocationOn size="30" color="#ffffff" />
          <p className="jab-location">{location}</p>
        </div>
        <p className="job-type">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobs
