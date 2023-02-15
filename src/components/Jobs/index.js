import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobsItem from '../JobsItem'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusJobsItem = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE,',
}

const apiStatusProfile = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE,',
}

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

class Jobs extends Component {
  state = {
    profileData: [],
    jobsData: [],
    searchInput: '',
    radio: '',
    checkBoxList: [],
    apiStatusJob: apiStatusJobsItem.initial,
    apiStatus: apiStatusProfile.initial,
  }

  componentDidMount = () => {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusProfile.InProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updateProfileData = data.profile_details

      const update = {
        name: updateProfileData.name,
        profileImageUrl: updateProfileData.profile_image_url,
        shortBio: updateProfileData.short_bio,
      }

      this.setState({
        profileData: update,
        response: true,
        apiStatus: apiStatusProfile.success,
      })
    } else {
      this.setState({apiStatus: apiStatusProfile.failure})
    }
  }

  onClickButton = () => {
    this.renderProfile()
  }

  renderFailureProfile = () => (
    <div>
      <button
        className="logout-button"
        type="button"
        onClick={this.onClickButton}
      >
        Retry
      </button>
    </div>
  )

  getJobsDetails = async () => {
    this.setState({apiStatusJob: apiStatusJobsItem.inProgress})
    const {searchInput, radio, checkBoxList} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${checkBoxList}&minimum_package=${radio}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const update = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        id: each.id,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsData: update,
        apiStatusJob: apiStatusJobsItem.success,
      })
    } else {
      this.setState({apiStatusJob: apiStatusJobsItem.failure})
    }
  }

  renderJobItem = () => {
    const {jobsData} = this.state

    const jobs = jobsData.length === 0

    console.log(jobsData)
    return jobs ? (
      <div>
        <img
          className="no-jobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No jobs found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    ) : (
      <ul>
        {jobsData.map(each => (
          <JobsItem key={each} jobsDetails={each} />
        ))}
      </ul>
    )
  }

  renderProfile = () => {
    const {profileData, response} = this.state

    const {name, profileImageUrl, shortBio} = profileData

    return response ? (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>

        <p className="short-bio">{shortBio}</p>
      </div>
    ) : null
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsDetails()
    }
  }

  onSubmitButton = () => {
    this.getJobsDetails()
  }

  renderSuccessFulView = () => {
    const {searchInput} = this.state
    return (
      <div className="profile-type-employees">
        <ul className="profile-salary-container">
          {this.renderAplProfile()}
          <hr className="line" />
          <li>{this.renderEmploymentTypesList()}</li>

          <hr />
          <li>{this.renderSalaryRangesList()}</li>
        </ul>
        <div className="job-search-container">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              className="search-bar"
              onChange={this.onChangeSearch}
              value={searchInput}
              onKeyDown={this.enterSearchInput}
            />
            <button
              className="search-button"
              type="button"
              onClick={this.onSubmitButton}
              data-testid="searchButton"
            >
              <AiOutlineSearch
                size="32"
                color="#ffffff"
                className="search-icon"
              />
            </button>
          </div>
          {this.renderApiCall()}
        </div>
      </div>
    )
  }

  onChangeCheckBox = event => {
    const {checkBoxList} = this.state

    const inputCheckFilter = checkBoxList.filter(
      each => each === event.target.id,
    )
    if (inputCheckFilter.length === 0) {
      this.setState(prevState => ({
        checkBoxList: [...prevState.checkBoxList, event.target.id],
      }))
    } else {
      const filterCheck = checkBoxList.filter(each => each !== event.target.id)
      this.setState({checkBoxList: filterCheck}, this.getJobsDetails)
    }
  }

  renderEmploymentTypesList = () => (
    <>
      <ul className="list">
        <h1 className="employment">Type of Employment</h1>

        {employmentTypesList.map(each => (
          <li className="label-container" key={each.employmentTypeId}>
            <input
              type="checkBox"
              id={each.employmentTypeId}
              onChange={this.onChangeCheckBox}
            />
            <label className="label-title" htmlFor={each.employmentTypeId}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  onChangeRadio = event => {
    this.setState({radio: event.target.id}, this.getJobsDetails)
  }

  renderSalaryRangesList = () => (
    <ul className="list">
      <h1 className="salary">Salary Ranges</h1>
      {salaryRangesList.map(each => (
        <li className="label-container" key={each.salaryRangeId}>
          <input
            type="radio"
            name="option"
            id={each.salaryRangeId}
            onChange={this.onChangeRadio}
          />
          <label className="label-title" htmlFor={each.salaryRangeId}>
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )

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
        retry
      </button>
    </div>
  )

  onCLickButtonJob = () => {
    this.getJobsDetails()
  }

  renderAplProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusProfile.inProgress:
        return this.renderLoader()
      case apiStatusProfile.success:
        return this.renderProfile()
      case apiStatusProfile.failure:
        return this.renderFailureProfile()
      default:
        return null
    }
  }

  renderApiCall = () => {
    const {apiStatusJob} = this.state

    switch (apiStatusJob) {
      case apiStatusJobsItem.inProgress:
        return this.renderLoader()
      case apiStatusJobsItem.success:
        return this.renderJobItem()
      case apiStatusJobsItem.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderSuccessFulView()}</div>
      </>
    )
  }
}

export default Jobs
