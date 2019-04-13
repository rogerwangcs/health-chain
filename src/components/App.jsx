import React, { Component, Link } from "react";
import { Switch, Route, withRouter} from "react-router-dom";

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

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then(userData => {
        window.location = window.location.origin + "/patients";
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
    signUserOut(window.location.origin + "/patients");
  }

  render() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <Switch>
            <Route
              path="/patients/:username?"
              render={routeProps =>
                !isUserSignedIn() ? (
                  <Signin handleSignIn={this.handleSignIn} />
                ) : (
                  <Profile handleSignOut={this.handleSignOut} {...routeProps} />
                )
              }
            />
            <Route
              exact
              path="/hospital"
              render={routeProps => <Hospital {...routeProps} />}
            />
            <Route
              exact
              path="/insurance"
              render={routeProps => <Insurance {...routeProps} />}
            />
            <Route path="/" render={routeProps => <div>homepage</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
