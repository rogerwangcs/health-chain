import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from "blockstack";

class HospitalForm extends Component {
  render() {
    return <div />;
  }
}

export default withRouter(HospitalForm);
