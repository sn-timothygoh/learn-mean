import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Routes from "./routes/routes";
import TopBar from "./components/topBar";

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      apiResponse: null
    }
  }

  callApi(){
    fetch("http://localhost:5000/testApi")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: res}));
  }

  componentWillMount(){
    this.callApi();
  }

  render () {
    return (
      <div className="App">
        <TopBar/>
        <Routes/>
        <header className="App-header">
        </header>
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}
