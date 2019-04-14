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
import "../styles/checkloader.css";

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
      this.setState({ load: true });
    }, 2000);
    setTimeout(() => {
      this.authenticate();
    }, 3500);
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
    let patient = await this.getPatientProfile("subraizahmed.id.blockstack");
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
              screenshotFormat="image/png"
            />
          </div>
        </div>
        <div className="loaderContainer">
          <div
            className={
              this.state.load ? "circle-loader load-complete" : "circle-loader"
            }
          >
            <div
              className="checkmark draw"
              style={{ display: this.state.load ? "block" : "none" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HospitalSignIn);
