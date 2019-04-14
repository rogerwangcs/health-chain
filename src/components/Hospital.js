import React, { Component } from "react";
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from "blockstack";

export default class Hospital extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statuses: [],
      isLoading: true
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const username = this.props.match.params.username;

    lookupProfile(username)
      .then(profile => {
        this.setState({
          person: new Person(loadUserData().profile),
          username: username
        });
      })
      .catch(error => {
        console.log("could not resolve profile");
      });

    const options = { username: username, decrypt: false };
    getFile("userData.json", options)
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
    return <div>Hospital</div>;
  }
}
