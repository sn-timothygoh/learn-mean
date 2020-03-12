import React, { Component } from 'react';
import ListFeeds from './listfeed.component';
import AddFeed from './addfeed.component';

export default class Home extends Component {

  constructor(props){
    super(props);
    const sock = new WebSocket('ws://localhost:5000/feed');
    sock.onopen = function() {
        console.log('open');
    };

    const self = this;
    sock.onmessage = function(e) {
          const message = JSON.parse(e.data);
          const dataToSend = JSON.stringify(message);
          self.setState({ feed: dataToSend });
    };

    this.state = {
      actions : sock,
      feed : {},
    }
  }

  render() {
    return (
      <div className="container">
        <br/>
        < AddFeed { ... this.state  }/>
        < ListFeeds { ... this.state }/>
      </div>
    );
  }
}