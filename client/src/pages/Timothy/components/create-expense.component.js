import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateExpense extends Component {
  constructor(props) {
    super(props)

    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangeDesc = this.onChangeDesc.bind(this)
    this.onChangeAmount = this.onChangeAmount.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      username: '',
      desc: '',
      amount: 0.0,
      date: new Date(),
      users: [],
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/user/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username,
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    })
  }

  onChangeDesc(e) {
    this.setState({
      desc: e.target.value,
    })
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const expense = {
      username: this.state.username,
      desc: this.state.desc,
      amount: this.state.amount,
      date: this.state.date,
    }

    axios
      .post('http://localhost:5000/budget/add', expense)
      .then(res => console.log(res.data))

    window.location = '/budget'
  }

  render() {
    return (
      <div className="container">
        <h3>Record New Expense</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function(user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.desc}
              onChange={this.onChangeDesc}
            />
          </div>
          <div className="form-group">
            <label>Amount (RM): </label>
            <input
              type="number"
              className="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Add expense"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    )
  }
}
module.export = Component
