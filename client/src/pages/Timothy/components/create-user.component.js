import React, { Component } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeFName = this.onChangeFName.bind(this);
    this.onChangeLName = this.onChangeLName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      fname: "",
      lname: "",
      username: "",
      password: ""
    };
  }

  onChangeFName(e) {
    this.setState({
      fname: e.target.value
    });
  }

  onChangeLName(e) {
    this.setState({
      lname: e.target.value
    });
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

  onSubmit(e) {
    e.preventDefault();

    const user = {
      fname: this.state.fname,
      lname: this.state.lname,
      username: this.state.username,
      password: bcrypt.hashSync(this.state.password, bcrypt.genSaltSync(10))
    };

    console.log(user);

    axios
      .post("http://localhost:5000/user/add", user)
      .then(res => console.log(res.data))
      .catch(err => {
        !err ? (window.location = "/login") : console.log(err);
      });

    this.setState({
      fname: "",
      lname: "",
      username: "",
      password: ""
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Register Account</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>First name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.fname}
              name="fname"
              onChange={this.onChangeFName}
            />
          </div>
          <div className="form-group">
            <label>Last name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.lname}
              name="lname"
              onChange={this.onChangeLName}
            />
          </div>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              name="username"
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
              name="password"
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

module.export = Component;
