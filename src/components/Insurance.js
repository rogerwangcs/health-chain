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

const cornerImage = "https://i.imgur.com/GLShQNf.png";

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
      patientProfiles: [],
      formInformation: {}
    };
  }

  async componentWillMount() {
    await this.state.patientKeys.forEach(async patientID => {
      await this.getPatientProfile(patientID);
      this.getPatientInfo(patientID);
    });
    console.log(this.state.patientProfiles);
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
    let patientProfiles = this.state.patientProfiles;
    lookupProfile(patientID)
      .then(profile => {
        profile.userId = patientID;
        patientProfiles.push(profile);
        this.setState({ patientProfiles });
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
        console.log(patientID);
        console.log(error);
      });
  }

  mapPatientCards() {
    return this.state.patientProfiles.map((patient, index) => {
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
                <NavText style={{ textAlign: "left" }}>
                  Past Transactions
                </NavText>
              </NavItem>
              <NavItem eventKey="charts/barchart">
                <NavText style={{ textAlign: "left" }}>
                  Pending Transactions
                </NavText>
              </NavItem>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
        <div
          style={{
            width: "93%",
            display: "flex",
            flexWrap: "wrap",
            padding: 0
          }}
        >
          {this.mapPatientCards()}
        </div>
      </div>
    );
  }
}

const PatientCard = props => {
  return (
    <div className="patientCard">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "flex-start"
        }}
      >
        <p
          style={{
            fontFamily: "Avenir",
            fontWeight: "700",
            fontSize: 33,
            marginBottom: 2
          }}
        >
          {props.patient.name}
        </p>
        <p
          style={{
            fontFamily: "Avenir",
            fontWeight: "200",
            fontSize: 15,
            marginBottom: 2
          }}
        >
          {props.patient.userId}
        </p>
      </div>
      <button
        onClick={() =>
          props.setApprovalStatus(props.patient.username, {
            id: "4344",
            value: true
          })
        }
      >
        Approve
      </button>
      <button
        onClick={() => props.setApprovalStatus(props.patient.username, false)}
      >
        Reject
      </button>
      <img
        src={"https://i.imgur.com/GLShQNf.png"}
        style={{
          width: "40%",
          height: "auto",
          alignSelf: "flex-end",
          marginLeft: "70%",
          opacity: 0.75
        }}
      />
    </div>
  );
};
