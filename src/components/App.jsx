import React, { Component, Link } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Signin from "./Signin.jsx";
import HospitalSignIn from "./HospitalSignIn.jsx";
import HospitalForm from "./HospitalForm.jsx";
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut
} from "blockstack";

import Patient from "./Patient.jsx";
import Hospital from "./Hospital.jsx";
import Insurance from "./Insurance.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patientInformation: [],
      patient: {}
    };
  }

  setPatientInformation(patientInformation) {
    console.log(patientInformation);
    this.setState({ patientInformation });
  }

  setPatient(patient) {
    console.log(patient);
    this.setState({ patient });
  }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then(userData => {
        window.location = window.location.origin;
      });
    }
  }

  handleSignIn(e) {
    e.preventDefault();
    const origin = window.location.origin;
    redirectToSignIn(origin, origin + "/manifest.json", [
      "store_write",
      "publish_data"
    ]);
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <Switch>
            <Route
              exact
              path="/hospital"
              render={routeProps => (
                <Hospital
                  {...routeProps}
                  patient={this.state.patient}
                  patientInformation={this.state.patientInformation}
                />
              )}
            />
            <Route
              exact
              path="/hospitalSignIn"
              render={routeProps => (
                <HospitalSignIn
                  {...routeProps}
                  setPatientInformation={this.setPatientInformation.bind(this)}
                  setPatient={this.setPatient.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/hospitalform"
              render={routeProps => (
                <HospitalForm
                  {...routeProps}
                  patient={this.state.patient}
                  patientInformation={this.state.patientInformation}
                />
              )}
            />
            <Route
              exact
              path="/insurance"
              render={routeProps => <Insurance {...routeProps} />}
            />
            {/* <Route path="/" render={routeProps => <div>homepage</div>} /> */}
            <Route
              exact
              path="/:username?"
              render={routeProps =>
                !isUserSignedIn() ? (
                  <Signin handleSignIn={this.handleSignIn} />
                ) : (
                  <Patient handleSignOut={this.handleSignOut} {...routeProps} />
                )
              }
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
