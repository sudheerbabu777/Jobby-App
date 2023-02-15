import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isStatement: false,
    errorMsg: '',
  }

  onChangeText = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onResponseSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onResponseFailure = errorMsg => {
    this.setState({isStatement: true, errorMsg})
  }

  onSubmitButton = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(response.ok)
    if (response.ok === true) {
      this.onResponseSuccess(data.jwt_token)
    } else {
      this.onResponseFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isStatement, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="log-container">
        <form className="form" onSubmit={this.onSubmitButton}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-image"
          />
          <label className="label" htmlFor="inputName">
            USERNAME
          </label>
          <input
            placeholder="Username"
            type="text"
            id="inputName"
            className="input-bar"
            onChange={this.onChangeText}
            value={username}
          />
          <label className="label" htmlFor="Password">
            PASSWORD
          </label>
          <input
            placeholder="Password"
            type="password"
            id="Password"
            className="input-bar"
            onChange={this.onChangePassword}
            value={password}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {isStatement && <p className="error">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
