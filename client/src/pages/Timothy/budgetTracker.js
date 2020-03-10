import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BasePage from "../basePage/basePage";
// import styled from "styled-components";
import Navbar from "./components/navbar.component";
import List from "./components/list-expense.component";

export default class BudgetTracker extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { apiResponse: "" };
  // }

  // callServer() {
  //   fetch("http://localhost:5000/budget")
  //     .then(res => res.text())
  //     .then(res => this.setState({ apiResponse: res }));
  // }

  // componentWillMount() {
  //   this.callServer();
  // }

  render() {
    // const Div = styled.div`
    //   background-color: '#fff',
    //   margin-top: 25,
    //   padding: 20,
    // `;
    return (
      <BasePage>
        <Navbar />
        <div className="bg-info">
          <div className="row">
            <div
              className="col-md-6 offset-md-3"
              style={
                ({ background: "#fff" }, { marginTop: 25 }, { padding: 20 })
              }
            >
              <h3>Add my expenses</h3>
              <form action="/budget" method="POST" autocomplete="off">
                <input type="hidden" name="_id" />
                <div class="form-group">
                  <label for="desc">Description: </label>
                  <input type="text" class="form-control" name="desc" />
                </div>
                <div class="form-group">
                  <label for="amount">Amount (RM): </label>
                  <input
                    type="number"
                    class="form-control"
                    name="amount"
                    step="0.10"
                  />
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-info">
                    <i class="fa fa-database"></i> Save
                  </button>
                </div>
              </form>
              {/* <p>{this.state.apiResponse}</p> */}
            </div>
          </div>
        </div>
        <List />
      </BasePage>
    );
  }
}
