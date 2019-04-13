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
    const options = { decrypt: false };
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
    return <div>Hospital</div>;
  }
}
