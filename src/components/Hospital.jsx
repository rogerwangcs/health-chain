import React, { Component } from "react";
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from "blockstack";

import "../styles/hospital.css";

export default class Hospital extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name() {
          return "Anonymous";
        },
        avatarUrl() {
          return avatarFallbackImage;
        }
      },
      username: "",
      newStatus: "",
      statuses: [],
      statusIndex: 0,
      isLoading: false
    };
  }

  componentWillMount() {
    this.fetchData();
    this.setState({
      person: new Person(loadUserData().profile),
      username: loadUserData().username
    });
  }

  fetchData() {
    const options = { decrypt: true };
    getFile("statuses.json", options)
      .then(file => {
        var statuses = JSON.parse(file || "[]");
        this.setState({
          statusIndex: statuses.length,
          statuses: statuses
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    console.log(this.state.statuses);
    return (
      <div className="hospitalContainer">
        <div className="sidebar">
          <img src={this.state.person.avatarUrl()} />
          <div>
            <p styles={{display: "inline"}}>{this.state.person.name()}</p>
          </div>
        </div>
        <div className="hospitalContent">asf</div>
      </div>
    );
  }
}
