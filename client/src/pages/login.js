import React, { Component } from "react";
import axios from "axios";
import LoginService from "./loginService";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
      loginSuccess: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit = async e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    console.log(user);

    const loginRes = await LoginService(user);

    if (loginRes !== 200) {
      this.setState({
        loginSuccess: false
      });
    } else {
      this.setState({
        loginSuccess: true
      });
      window.location = "/budget";
    }

    // await axios.post("http://localhost:5000/login", user).then(res => {
    //   if (res.status(200)) {
    //     this.setState({
    //       username: "",
    //       password: ""
    //     });
    //     window.location = "/budget";
    //   } else {
    //     alert("login failed");
    //     this.setState({
    //       username: "",
    //       password: ""
    //     });
    //   }
    // });

    // window.location = "/budget";
  };

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
    );
  }
}
