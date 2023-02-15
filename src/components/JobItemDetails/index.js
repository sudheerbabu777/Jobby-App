import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusJobsItem = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE,',
}

class JobItemDetails extends Component {
  state = {
    jobsDetails: [],
    similarDetails: [],
    apiStatus: apiStatusJobsItem.initial,
  }

  componentDidMount() {
    this.getJobsItemsDetails()
  }

  getJobsItemsDetails = async () => {
    this.setState({apiStatus: apiStatusJobsItem.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedJobData = await response.json()
      const updatedJobDetailsData = [fetchedJobData.job_details].map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          companyWebsiteUrl: eachItem.company_website_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          lifeAtCompany: {
            description: eachItem.life_at_company.description,
            imageUrl: eachItem.life_at_company.image_url,
          },
          location: eachItem.location,
          packagePerAnnum: eachItem.package_per_annum,
          rating: eachItem.rating,
          skills: eachItem.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          title: eachItem.title,
        }),
      )

      const updatedSimilarJobDetails = fetchedJobData.similar_jobs.map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          employmentType: eachItem.employment_type,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        }),
      )
      this.setState({
        jobsDetails: updatedJobDetailsData,
        similarDetails: updatedSimilarJobDetails,
        apiStatus: apiStatusJobsItem.success,
      })
    } else {
      this.setState({apiStatus: apiStatusJobsItem.failure})
    }
  }

  renderJobsItemDetails = () => {
    const {jobsDetails} = this.state
    if (jobsDetails.length >= 1) {
      const {
        lifeAtCompany,
        companyLogoUrl,
        location,
        title,
        rating,
        packagePerAnnum,
        jobDescription,
        employmentType,
        companyWebsiteUrl,
        skills,
      } = jobsDetails[0]
      console.log(jobsDetails[0].skills)
      return (
        <>
          <div className="compony-logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="visit-container">
            <h1 className="heading extra-heading">Description</h1>
            <a className="visit-button" href={companyWebsiteUrl}>
              Visit
              <BiLinkExternal size="20" />
            </a>
          </div>
          <p className="job-description extra">{jobDescription}</p>
          <h1 className="skill-title">Skills</h1>
          <ul className="skill-list-container">
            {skills.map(each => (
              <li key={each.name} className="skill-item-container">
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skill-image"
                />
                <p className="skill">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="company-title">Life at Company</h1>
          <div className="company-details-container">
            <p className="job-description company-extra">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="Life at Company"
              className="company-image"
            />
          </div>
        </>
      )
    }
    return null
  }

  renderSimilarJobs = () => {
    const {similarDetails} = this.state

    return (
      <>
        <h1 className="similar-title">Similar Jobs</h1>
        <ul className="list-similar-container">
          {similarDetails.map(each => (
            <SimilarJobs similarDetails={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure">Oops! Something went wrong</h1>
      <p className="failure-title">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="logout-button"
        type="button"
        onClick={this.onCLickButtonJob}
      >
        Retry
      </button>
    </div>
  )

  renderTwo = () => (
    <>
      {this.renderJobsDetails()}
      {this.renderSimilarJobs()}
    </>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusJobsItem.inProgress:
        return this.renderLoader()
      case apiStatusJobsItem.success:
        return this.renderTwo()
      case apiStatusJobsItem.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  renderJobsDetails = () => (
    <div className="jobs-details-container">{this.renderJobsItemDetails()}</div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">{this.renderApiStatus()}</div>
      </>
    )
  }
}

export default JobItemDetails
