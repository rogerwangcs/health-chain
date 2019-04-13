import React, { Component, Link } from "react";
import { Switch, Route } from "react-router-dom";

import Signin from "./Signin.jsx";
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut
} from "blockstack";

import Profile from "./Profile.jsx";
import Hospital from "./Hospital";
import Insurance from "./Insurance";

export default class App extends Component {
  constructor(props) {
    super(props);
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
          {!isUserSignedIn() ? (
            <Signin handleSignIn={this.handleSignIn} />
          ) : (
            <Switch>
              <Route
                path="/patients/:username?"
                render={routeProps => (
                  <Profile handleSignOut={this.handleSignOut} {...routeProps} />
                )}
              />
              <Route
                path="Hospital"
                render={routeProps => <Hospital {...routeProps} />}
              />
              <Route
                path="Insurance"
                render={routeProps => <Insurance {...routeProps} />}
              />
            </Switch>
          )}
        </div>
      </div>
    );
  }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then(userData => {
        window.location = window.location.origin;
      });
    }
  }
}
