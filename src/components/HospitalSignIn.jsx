import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import posed from "react-pose";
import Webcam from "react-webcam";

import "../styles/hospital.css";
import mountainBG from "../images/mountains.png";

// const Modal = posed.div({
//   enter: {
//     y: 0,
//     opacity: 1,
//     delay: 300,
//     transition: {
//       y: { type: 'spring', stiffness: 1000, damping: 15 },
//       default: { duration: 300 }
//     }
//   },
//   exit: {
//     y: 50,
//     opacity: 0,
//     transition: { duration: 150 }
//   }
// });

// const Shade = posed.div({
//   enter: { opacity: 1 },
//   exit: { opacity: 0 }
// });

class HospitalSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.authenticate();
    }, 5000);
  }

  authenticate() {
    this.props.history.push("/hospital");
  }

  render() {
    return (
      <div className="hospitalSignInContainer">
        <div className="hospitalSignInContent">
          <div className="titleSection">
            <h1>Welcome to Health Chain Hospital</h1>
            <p>Please stand still to get started.</p>
          </div>
          <div className="facialRecognitionSection">
            <Webcam width="100%" height="100%" />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HospitalSignIn);
