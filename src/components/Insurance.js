import React, { Component } from "react";
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from "blockstack";

import SideNav from "./SideNav.jsx";

import "../styles/insurance.css";

export default class Insurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientKeys: [
        "rooterbuster.id.blockstack",
        "subraizahmed.id.blockstack",
        "subraizahmed.id.blockstack",
        "subraizahmed.id.blockstack",
        "subraizahmed.id.blockstack",
        "subraizahmed.id.blockstack",
        "subraizahmed.id.blockstack"
      ],
      patients: []
    };
  }

  componentDidMount() {
    this.state.patientKeys.forEach(patientID => {
      this.getPatientInfo(patientID);
    });
  }

  getPatientProfile(patientID) {
    console.log(patientID);
    lookupProfile("rooterbuster.id.blockstack")
      .then(profile => {
        var joined = this.state.patients.concat({
          profile: profile,
          username: patientID
        });
        this.setState({ patients: joined });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getPatientInfo(patientID) {
    const options = { username: patientID, decrypt: false };
    getFile("userData.json", options)
      .then(file => {
        var userData = JSON.parse(file || "[]");
        var joined = this.state.patients.concat({
          userData: userData,
          username: patientID
        });
        this.setState({ patients: joined });
      })
      .catch(error => {
        console.log("could not fetch userData");
      });
  }

  mapPatientCards() {
    return this.state.patients.map((patient, index) => {
      return <PatientCard key={index} patient={patient} />;
    });
  }

  render() {
    return (
      <div className="insuranceContainer">
        <SideNav />
        {this.mapPatientCards()}
      </div>
    );
  }
}

const PatientCard = props => {
  return (
    <div className="patientCard">
      <p>{props.patient.username}</p>
    </div>
  );
};
