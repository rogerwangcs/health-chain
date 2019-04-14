import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import posed from "react-pose";
import Webcam from "react-webcam";
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from "blockstack";

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
      loggedIn: false,
      username: "",
      load: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.authenticate();
    }, 200);
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value
    });
  }


  async authenticate() {
    let patientInformation = [
      { key: "Insurance Plan ID", value: "W267123-DF43" },
      { key: "GRP#", value: "894213-06TH" },
      { key: "PCP", value: "Kang, Alex" },
      { key: "IPA", value: "Mass General Hospital" },
      { key: "Date of Birth", value: "Nov. 3rd, 1997" }
    ];
    this.props.setPatientInformation(patientInformation);
    let patient = await this.getPatientProfile("rooterbuster.id.blockstack");
  }

  getPatientProfile(patientID) {
    lookupProfile(patientID)
      .then(profile => {
        profile.patientID = patientID;
        console.log("profile incoming: ");
        console.log(profile);
        this.props.setPatient(profile);
        this.props.history.push("/hospital");
        return profile;
      })
      .catch(error => {
        console.log(error);
      });
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
            <Webcam
              width="100%"
              height="100%"
              audio={false}
              ref={webcam => this.setRef(webcam)}
              screenshotFormat="image/png"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HospitalSignIn);
