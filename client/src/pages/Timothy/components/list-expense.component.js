import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Budget = props => (
  <tr>
    <td>{props.budgets.username}</td>
    <td>{props.budgets.desc}</td>
    <td>{new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "MYR"
    }).format(props.budgets.amount)}</td>
    <td>{props.budgets.date}</td>
    <td>
      <Link to={"/budget/edit/" + props.budgets._id}>
      <i className="fa fa-pencil fa-lg" aria-hidden="true"></i>
      Edit
      </Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteExpense(props.budgets._id);
        }}
      >
        <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
        Delete
      </a>
    </td>
  </tr>
);

export default class BudgetTracker extends Component {
  constructor(props) {
    super(props);

    this.deleteExpense = this.deleteExpense.bind(this);

    this.state = { budgets: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/budget/")
      // .then(response => console.log(response.data))
      .then(response => this.setState({ budgets : response.data}))
      .catch(error => {
        console.log(error);
      });
  }

  deleteExpense(id) {
    axios.delete("http://localhost:5000/budget/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      budgets: this.state.budgets.filter(element => element._id !== id)
    });
  }

  expenseList() {
    return this.state.budgets.map(currentexpense => {
      return (
        <Budget
          budgets={currentexpense}
          deleteExpense={this.deleteExpense}
          key={currentexpense._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
      <br/>
      <div className="container">
        <h3>Logged Expenses</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.expenseList()}</tbody>
        </table>
      </div>
      </div>
    );
  }
}