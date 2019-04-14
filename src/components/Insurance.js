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

import PatientCard from "./PatientCard.jsx";

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
      patientForms: [],
      patientProfiles: [],
      newForm: {},
      newForms: []
    };
  }

  async componentDidMount() {
    await this.state.patientKeys.forEach(async patientID => {
      this.getPatientProfile(patientID);
    });
    await setInterval(async () => {
      await this.getNewForm();
      await this.setState({ patientForms: [] });
      await this.state.patientKeys.forEach(async patientID => {
        this.getPatientForms(patientID);
      }, 500);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.newForm.id !== prevState.newForm.id) {
      console.log(this.state.newForm);
      let forms = this.state.newForms.unshift(this.state.newForm);
      this.setState({ newForms: forms });
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

  getPatientForms(patientID) {
    let patientForms = this.state.patientForms;
    const options = { username: patientID, decrypt: false };
    getFile("patientForms.json", options)
      .then(file => {
        var patientForms = JSON.parse(file || "[]");
        this.setState(prevState => ({
          patientForms: [...prevState.patientForms, patientForms]
        }));
      })
      .catch(error => {
        // console.log(error);
      });
  }

  getNewForm() {
    let newForm = this.state.newForm;
    const options = { decrypt: false };
    getFile("newForm.json", options)
      .then(file => {
        var newForm = JSON.parse(file || "[]");
        this.setState(prevState => ({
          newForm: newForm
        }));
      })
      .catch(error => {
        // console.log(error);
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
    let options = { username: username, decrypt: false };
    getFile("patientForms.json", options).then(file => {
      let patientForms = JSON.parse(file || "[]");

      patientForms[0].status = approvalStatus;

      options = { username: username, encrypt: false };
      putFile("patientForms.json", JSON.stringify(patientForms), options)
        .then(() => {
          console.log("Sent Form Info");
        })
        .catch(err => {
          console.log("asd");
        });
    });
  }

  // getFormInformation() {
  //   let options = { username: 'rooterbuster.id.blockstack', decrypt: false };
  //   getFile("patientForms.json", options).then(file => {
  //     let patientForms = JSON.parse(file || "[]");
  //     console.log(patientForms);
  //   });
  // }

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
