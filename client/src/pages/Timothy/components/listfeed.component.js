import React, { Component } from "react";
import cogoToast from "cogo-toast";
import moment from "moment";
import axios from "axios";
import Clock from "../../logos/clock.png";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.upvotes = React.createRef();
    this.downvotes = React.createRef();
    this.handleUpvoteDownvote = this.handleUpvoteDownvote.bind(this);
    this.state = {
      upvoted: false,
      downvoted: false,
      publisher: ""
    };
  }
  componentDidMount() {
    //query redis to determine user feeds upvote downvote status to set state - could be optimized
    const jwt = sessionStorage.getItem("jwt-token");
    if (jwt === null) {
      console.log("not logged in");
    } else {
      const headers = {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "auth-header": jwt
        }
      };
      axios
        .post(
          "http://localhost:5000/cache/updownstate",
          { "feedid": this.props.feed._id },
          headers
        )
        .then(resp => {
          this.setState(resp.data);
        })
        .catch(err => console.log(err));
    }
  }

  handleUpvoteDownvote(e) {
    console.log(e.target.name);
    console.log(this.props);
    const json = { type: e.target.name };
    json.data = this.props;
    console.log(json);
    const jwt = sessionStorage.getItem("jwt-token");
    if (jwt === null) {
      const { hide } = cogoToast.warn("Click to login & upvote/downvote.", {
        onClick: () => {
          hide();
          window.location = "/login";
        }
      });
    } else {
      console.log(this.state.publisher);

      if (this.state.publisher == json.data.feed.user._id) {
        cogoToast.error(`You cant ${e.target.name} your own feed!`, {
          hideAfter: 5
        });
      } else {
        if (e.target.name === "upvote") {
          if (this.state.downvoted) {
            json.data.feed.downvotes--;
            this.setState({ downvoted: false });
          }
          json.data.feed.upvotes++;
          this.setState({ upvoted: true });
        } else {
          if (this.state.upvoted) {
            json.data.feed.upvotes--;
            this.setState({ upvoted: false });
          }
          json.data.feed.downvotes++;
          this.setState({ downvoted: true });
        }
        this.props.socket.send(JSON.stringify(json));
        const headers = {
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "auth-header": jwt
          }
        };
        // sync with mongo
        axios
          .put("http://localhost:5000/feed/update", json.data.feed, headers)
          .then(res => {
            console.log(res);
            //sync wtih redis
            axios
              .put(
                "http://localhost:5000/cache/updownstate",
                {
                  "feedid": json.data.feed._id,
                  upvoted: this.state.upvoted ? 1 : 0
                },
                headers
              )
              .then(resp => this.setState(resp.data))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    }
  }

  render() {

    let likeimgurl = this.state.upvoted ? '/liked.png' : '/like.png';
      let dislikeimgurl = this.state.downvoted ? './disliked.png' : './dislike.png';

    return (
      <div className="card">
        <div className="row">
          <div className="col-md-10 px-3">
            <div className="card-block px-3">
              <h5
                className="card-title text-dark"
                style={{ marginTop: 10, fontWeight: 400 }}
              >
                {this.props.feed.user.fname} {this.props.feed.user.lname}
              </h5>
              <p className="card-text" style={{ fontSize: 16 }}>
                {this.props.feed.content}
              </p>
              <p className="text-muted" style={{ fontSize: 13 }}>
                <img src={Clock} style={{ width: 13, height: 13 }} />
                &nbsp;&nbsp;
                {moment(Date.parse(this.props.feed.createdAt)).fromNow()}
              </p>
            </div>
          </div>
          <div className="col-md-2 px-3">
            <div>
              <br />
              <div>
                {" "}
                <input
                  type="image"
                  disabled={this.state.upvoted}
                  onClick={this.handleUpvoteDownvote}
                  name="upvote"
                  src={likeimgurl}
                  alt="upvote"
                  width="30"
                  height="30"
                />
                <span
                  ref={this.upvotes}
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    verticalAlign: "6px"
                  }}
                >
                  &nbsp;&nbsp;&nbsp;{this.props.feed.upvotes}
                </span>{" "}
              </div>
              <div>
                {" "}
                <input
                  type="image"
                  disabled={this.state.downvoted}
                  onClick={this.handleUpvoteDownvote}
                  name="downvote"
                  src={dislikeimgurl}
                  alt="downvote"
                  width="30"
                  height="30"
                />
                <span
                  ref={this.downvotes}
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    verticalAlign: "6px"
                  }}
                >
                  &nbsp;&nbsp;&nbsp;{this.props.feed.downvotes}
                </span>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default class ListFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { feeds: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/feed")
      .then(resp => this.setState({ feeds: resp.data }))
      .catch(err => console.log(err));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const data = JSON.parse(nextProps.feed);
    console.log(data.data);
    if (data.type === "upvote" || data.type === "downvote") {
      let cloneFeeds = [...this.state.feeds];
      const foundIndex = cloneFeeds.findIndex(x => x._id == data.data.feed._id);
      console.log(foundIndex);
      cloneFeeds[foundIndex] = data.data.feed;

      this.setState({ feeds: cloneFeeds });
    } else if (data.type === "feed") {
      this.setState({ feeds: [data.data, ...this.state.feeds] });
    }
  }

  feedList() {
    return this.state.feeds.map(currentfeed => {
      return (
        <Feed
          feed={currentfeed}
          socket={this.props.actions}
          key={currentfeed._id}
        />
      );
    });
  }
  render() {
    return (
      <div className="d-flex flex-column">
        <h3>News Feed</h3>
        {this.feedList()}
      </div>
    );
  }
}
