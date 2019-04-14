import React, { Component } from "react";
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from "blockstack";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { FaHome, FaFileMedicalAlt } from "react-icons/fa";

import "../styles/insurance.css";

export default class Insurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientKeys: [
        "rooterbuster.id.blockstack",
        "subraizahmed.id.blockstack",
        "alexkaang.id.blockstack"
      ],
      patients: [],
      formInformation: {}
    };
  }

  componentDidMount() {
    this.state.patientKeys.forEach(patientID => {
      this.getPatientInfo(patientID);
    });
    setInterval(() => this.getFormInformation(), 500);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.formInformation.requestAmount !==
      prevState.formInformation.requestAmount
    ) {
      console.log("update form information!");
      console.log(this.state.formInformation);
    }
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
      return (
        <PatientCard
          key={index}
          patient={patient}
          setApprovalStatus={this.setApprovalStatus}
        />
      );
    });
  }

  setApprovalStatus(username, approvalStatus) {
    const options = { username: username, encrypt: false };
    console.log(username);
    putFile(
      "approvalStatus" + username.replace(/\./g, "_") + ".json",
      JSON.stringify(approvalStatus),
      options
    )
      .then(() => {
        console.log("Set approval status");
      })
      .catch(err => {
        console.log(error);
      });
  }

  getFormInformation() {
    const options = { decrypt: false };
    getFile("sendFormInfo.json", options).then(file => {
      var formInformation = JSON.parse(file || "[]");
      this.setState({
        formInformation: formInformation
      });
    });
  }

  render() {
    return (
      <div className="insuranceContainer">
        <SideNav
          onSelect={selected => {
            // Add your code here
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
              <NavIcon>
                <FaHome size={20} style={{ marginBottom: 0 }} />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem eventKey="charts">
              <NavIcon>
                <FaFileMedicalAlt size={20} style={{ marginBottom: 0 }} />
              </NavIcon>
              <NavText>Transactions</NavText>
              <NavItem eventKey="charts/linechart">
                <NavText>Past Transactions</NavText>
              </NavItem>
              <NavItem eventKey="charts/barchart">
                <NavText>Pending Transactions</NavText>
              </NavItem>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
        {this.mapPatientCards()}
      </div>
    );
  }
}

const PatientCard = props => {
  return (
    <div className="patientCard">
      <p>{props.patient.username}</p>
      <button
        onClick={() => props.setApprovalStatus(props.patient.username, true)}
      >
        Approve
      </button>
      <button
        onClick={() => props.setApprovalStatus(props.patient.username, false)}
      >
        Reject
      </button>
    </div>
  );
};
