import React, { Component } from 'react'
import axios from 'axios'
import cogoToast from 'cogo-toast'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      username: '',
      password: '',
      loginSuccess: false,
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const authUser = {
      username: this.state.username,
      password: this.state.password,
    }

    axios.post('http://localhost:5000/user/login', authUser).then(res => {
      sessionStorage.setItem('jwt-token', res.headers['auth-header'])
      cogoToast
        .success('Logged in', { hideAfter: 3 })
        .then(() => {
          window.location = '/feed'
        })
        .catch(err => {
          cogoToast
            .error('Login failed, please check your credentials and try again.')
            .then(() =>
              this.setState({
                username: '',
                password: '',
              }),
            )
        })
    })
  }

  render() {
    return (
      <div className="container">
        <h3>Login</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
